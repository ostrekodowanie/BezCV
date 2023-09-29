import axios from "axios";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { bcvToken } from "../assets/general";
import Loader from "../components/Loader";
import CircleChart from "../components/candidate/CircleChart";
import { useAppSelector } from "../main";
import { purchase } from "../providers/login";
import {
  Details,
  DidFilledSurvey,
  initialDetailsState,
  roleToTextMap,
} from "../constants/candidate";
import {
  initialColorScheme,
  professionColorMap,
  ProfessionColorScheme,
} from "../constants/professionColorMap";
import {
  AvailabilityIcon,
  EmailIcon,
  JobPositionIcon,
  PhoneIcon,
  ProfessionIcon,
} from "../assets/candidate/icons/icons";
import HasJob from "../components/offers/HasJob";
import FollowButton from "../components/candidate/FollowButton";
import SuggestedCandidates from "../components/candidate/SuggestedCandidates";
import { Loading } from "../types/candidate";
import SideBar from "../components/candidate/SideBar";
import AbilitiesList from "../components/candidate/AbilitiesList";
import ShareButton from "../components/candidate/ShareButton";
import useDocumentTitle from "../hooks/useDocumentTitle";
import BadgeList from "../components/candidate/BadgeList";
import LocationIcon from "../assets/candidate/icons/LocationIcon";

export const ColorSchemeContext = createContext<ProfessionColorScheme>(null!);

export default function Candidate() {
  useDocumentTitle("Znajdź pracownika | bezCV - innowacyjny portal pracy");
  const auth = useAppSelector((state) => state.login);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { points } = auth.data;
  const user_id = auth.data.id;
  const { refresh } = auth.tokens;
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState<Loading>({
    page: true,
    purchase: false,
  });
  const [candidateDetails, setCandidateDetails] =
    useState<Details>(initialDetailsState);
  const colorScheme = candidateDetails.profession
    ? professionColorMap[candidateDetails.profession]
    : initialColorScheme;
  const { gradient } = colorScheme;
  const didFilledSurvey: DidFilledSurvey = {
    sales:
      candidateDetails.abilities?.sales.filter((item) => item.percentage)
        .length === candidateDetails.abilities?.sales.length,
    office_administration:
      candidateDetails.abilities?.office_administration.filter(
        (item) => item.percentage
      ).length === candidateDetails.abilities?.office_administration.length,
    customer_service:
      candidateDetails.abilities?.customer_service.filter(
        (item) => item.percentage
      ).length === candidateDetails.abilities?.customer_service.length,
  };
  const didFilledAllSurveys =
    candidateDetails.abilities &&
    didFilledSurvey.customer_service &&
    didFilledSurvey.office_administration &&
    didFilledSurvey.sales;

  const handlePurchase = async () => {
    if (didFilledAllSurveys ? points < 2 : points < 1)
      return navigate("/punkty");
    setLoading((prev) => ({ ...prev, purchase: true }));
    let data = {
      candidate: id,
      employer: user_id,
      refresh,
      points: didFilledAllSurveys ? 2 : 1,
    };
    const resp = await axios.post("/api/oferty/purchase", data);
    if (resp.status === 201) {
      dispatch(purchase(didFilledAllSurveys ? 2 : 1));
      setConfetti(true);
    }
    return setLoading((prev) => ({ ...prev, purchase: false }));
  };

  useEffect(() => {
    setLoading((prev) => ({ ...prev, page: true }));
    axios
      .get(`/api/oferty/${id}`)
      .then((res) => res.data)
      .then((data) => setCandidateDetails(data))
      .finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, [points, id]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <section
        className="sm:px-[8vw] md:px-[12vw] 2xl:px-[16vw] print:sm:px-0 print:md:px-0 print:2xl:px-0 print:py-16 print:md:py-16 print:2xl:py-16 py-[1in] md:py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen flex flex-col print:gap-4 gap-8"
        id="candidate-profile"
      >
        <div className="bg-white sm:rounded-3xl relative shadow-primaryBig px-[8vw] print:py-6 print:sm:py-6 py-10 sm:p-10">
          {candidateDetails.has_job && <HasJob />}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 md:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] print:sm:flex-nowrap print:md:flex print:flex print:gap-4 xl:flex xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center font-semibold">
                <span
                  style={{
                    backgroundImage: gradient,
                    color: candidateDetails.profession
                      ? "transparent"
                      : colorScheme.color,
                  }}
                  className="bg-clip-text text-transparent print:text-font print:bg-clip-padding print-bg-transparent"
                >
                  {candidateDetails.first_name.charAt(0) +
                    candidateDetails.last_name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Kandydat</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.first_name} {candidateDetails.last_name}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <ProfessionIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Szuka pracy w</h4>
                    <h3
                      style={{
                        backgroundImage: gradient,
                        color: candidateDetails.profession
                          ? "transparent"
                          : colorScheme.color,
                      }}
                      className="font-semibold print-bg-transparent text-sm bg-clip-text text-transparent print:text-font print:bg-clip-padding print:bg-transparent"
                    >
                      {candidateDetails.profession
                        ? roleToTextMap[candidateDetails.profession].profession
                        : "Nie wypełniono ankiety"}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <JobPositionIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Poprzednie stanowisko</h4>
                    <h3 className="font-semibold text-sm max-w-[2in]">
                      {candidateDetails.job_position}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <AvailabilityIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Dyspozycyjność</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.availability}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <LocationIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Chce pracować w</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.location?.postal_code
                        ? `${candidateDetails.location.postal_code}${
                            candidateDetails.location.city
                              ? ", " + candidateDetails.location.city
                              : ""
                          }`
                        : candidateDetails.province || "Nie podano"}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {((candidateDetails.industries &&
          candidateDetails.industries.length > 0) ||
          loading.page) && (
          <BadgeList
            isLoading={loading.page}
            profession={candidateDetails.profession}
            industries={candidateDetails.industries}
          />
        )}
        <div className="flex flex-col xl:grid grid-cols-[2fr_5fr] xl:grid-rows-[max-content_1fr_max-content] print:grid print:gap-4 gap-8">
          {loading.page ? (
            <div className="ml-[8vw] sm:ml-0">
              <Loader />
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-[8vw] sm:ml-0 print:hidden">
              <button
                onClick={handlePurchase}
                disabled={candidateDetails.is_purchased}
                style={{
                  backgroundImage: candidateDetails.profession
                    ? gradient
                    : professionColorMap.office_administration.gradient,
                }}
                className={`rounded-full max-w-max justify-center ${
                  !candidateDetails.is_purchased
                    ? "hover:scale-[1.02] transition-transform"
                    : ""
                } xl:max-w-none w-full text-white text-[.8rem] font-semibold flex items-center py-4 px-10`}
              >
                {candidateDetails.is_purchased
                  ? `Wykupiono za ${
                      didFilledAllSurveys ? "2 tokeny" : "1 token "
                    }`
                  : `Wykup za ${didFilledAllSurveys ? "2 tokeny" : "1 token "}`}
                <img className="max-h-[1.4em] ml-2" src={bcvToken} alt="bCV" />
              </button>
              {loading.purchase && <Loader />}
            </div>
          )}
          <SideBar id={id || ""} {...candidateDetails} {...loading} />
          <div className="bg-white sm:rounded-3xl shadow-primaryBig px-[8vw] print:py-6 print:sm:py-6 py-10 sm:p-10 flex flex-col sm:flex-row sm:justify-evenly col-[2/3] gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <EmailIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Email</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.email}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <PhoneIcon {...colorScheme} />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Numer telefonu</h4>
                    <h3 className="font-semibold text-sm">
                      +48{" "}
                      {candidateDetails.phone?.replace(/(\d{3})(?=\d)/g, "$1 ")}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white sm:rounded-3xl col-[2/3] shadow-primaryBig py-10 print:py-6 print:sm:py-6 sm:p-10 row-[1/3] flex flex-col">
            <div className="mb-6 flex items-center gap-4 justify-between">
              <h2 className="font-bold mx-[8vw] sm:mx-0">Opis kandydata</h2>
              <div className="hidden md:block print:hidden print:md:hidden">
                <FollowButton
                  id={id ? parseInt(id) : -1}
                  is_followed={candidateDetails.is_followed}
                />
              </div>
            </div>
            <div className="px-[8vw] py-6 print:bg-white print:p-0 print:sm:px-0 print:px-0 print:py-0 sm:px-8 rounded-xl bg-[#F8F9FB] flex-1">
              <p className="font-medium text-[.8rem] leading-loose">
                {candidateDetails.desc
                  ? candidateDetails.desc
                  : !loading.page &&
                    "Kandydat jeszcze nie wypełnił ankiety. Gdy to zrobi, jego opis zostanie uzupełniony."}
              </p>
            </div>
          </div>
        </div>
        {confetti && (
          <ConfettiExplosion className="absolute top-[40vh] right-[50%] translate-x-[-50%]" />
        )}
        {candidateDetails.ability_charts && (
          <div className="bg-white sm:rounded-3xl overflow-hidden sm:overflow-auto print:py-8 print:sm:px-2 py-10 sm:px-6 shadow-primaryBig print:gap-2 print:xl:gap-2 print:md:flex-nowrap gap-8 xl:gap-4 flex flex-col sm:flex-row print:flex-nowrap flex-wrap justify-between items-center">
            <CircleChart
              profession="sales"
              isFirst={candidateDetails.profession === "sales"}
              percentage={
                didFilledSurvey.sales
                  ? parseInt(candidateDetails.ability_charts.sales.toString())
                  : null
              }
            />
            <CircleChart
              profession="office_administration"
              isFirst={candidateDetails.profession === "office_administration"}
              percentage={
                didFilledSurvey.office_administration
                  ? parseInt(
                      candidateDetails.ability_charts.office_administration.toString()
                    )
                  : null
              }
            />
            <CircleChart
              profession="customer_service"
              isFirst={candidateDetails.profession === "customer_service"}
              percentage={
                didFilledSurvey.customer_service
                  ? parseInt(
                      candidateDetails.ability_charts.customer_service.toString()
                    )
                  : null
              }
            />
          </div>
        )}
        {candidateDetails.profession && (
          <AbilitiesList
            {...candidateDetails}
            {...didFilledSurvey}
            loading={loading}
          />
        )}
        {loading.page ? (
          <div className="ml-[8vw] sm:ml-0">
            <Loader />
          </div>
        ) : (
          <ShareButton profession={candidateDetails.profession} />
        )}
        <SuggestedCandidates
          candidates={candidateDetails.similar_candidates}
          isLoading={loading.page}
        />
      </section>
    </ColorSchemeContext.Provider>
  );
}
