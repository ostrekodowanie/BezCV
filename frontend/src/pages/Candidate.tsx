import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  cashIcon,
  emailIcon,
  pdf,
  phoneIcon,
  role,
} from "../assets/candidate/candidate";
import { bcvToken } from "../assets/general";
import AbilityRange from "../components/candidate/AbilityRange";
import Loader from "../components/Loader";
import CircleChart from "../components/candidate/CircleChart";
import { useAppSelector } from "../main";
import { purchase } from "../reducers/login";
import {
  CandidateProps,
  Details,
  initialDetailsState,
} from "../constants/candidate";
import {
  professionColorMap,
  ProfessionColorScheme,
} from "../constants/professionColorMap";

export const ColorSchemeContext = createContext<ProfessionColorScheme>(null!);

export default function Candidate() {
  const auth = useAppSelector((state) => state.login);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { points } = auth.data;
  const user_id = auth.data.id;
  const { access, refresh } = auth.tokens;
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState({
    page: true,
    purchase: false,
  });
  const [candidateDetails, setCandidateDetails] =
    useState<Details>(initialDetailsState);
  const colorScheme = candidateDetails.profession
    ? professionColorMap[candidateDetails.profession]
    : {
        color: "",
        gradient: "",
        startColor: {
          value: "",
          position: 0,
        },
        stopColor: {
          value: "",
          position: 1,
        },
      };
  const { gradient } = colorScheme;

  const handlePurchase = async () => {
    if (points < 1) return navigate("/punkty");
    setLoading((prev) => ({ ...prev, purchase: true }));
    let data = { candidate: id, employer: user_id, refresh };
    const resp = await axios.post("/api/oferty/purchase", data);
    if (resp.status === 201) {
      dispatch(purchase());
      setConfetti(true);
    }
    return setLoading((prev) => ({ ...prev, purchase: false }));
  };

  useEffect(() => {
    setLoading((prev) => ({ ...prev, page: true }));
    axios
      .get(`/api/oferty/${id}`, {
        headers: { Authorization: "Bearer " + access },
      })
      .then((res) => res.data)
      .then((data) => setCandidateDetails(data))
      .finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, [points, id]);

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] py-[1in] md:py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen flex flex-col gap-8">
        <div className="bg-white sm:rounded-3xl shadow-primaryBig px-[8vw] py-10 sm:p-10">
          <div className="flex flex-wrap gap-6 md:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center font-semibold">
                <span
                  style={{ backgroundImage: gradient }}
                  className="bg-clip-text text-transparent"
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
                <img src={role} alt="" />
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
                      style={{ backgroundImage: gradient }}
                      className="font-semibold text-sm bg-clip-text text-transparent"
                    >
                      {candidateDetails.profession}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img src={cashIcon} alt="" />
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
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.job_position}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:grid grid-cols-[1fr_2fr] xl:grid-rows-[max-content_1fr_max-content] gap-8">
          {loading.page ? (
            <div className="ml-[8vw] sm:ml-0">
              <Loader />
            </div>
          ) : (
            !candidateDetails.is_purchased && (
              <div className="flex items-center gap-4 ml-[8vw] sm:ml-0">
                <button
                  onClick={handlePurchase}
                  style={{ backgroundImage: gradient }}
                  className="rounded-full max-w-max justify-center xl:max-w-none w-full text-white text-[.8rem] font-semibold flex items-center py-4 px-10"
                >
                  Wykup kontakt za 1 token{" "}
                  <img
                    className="max-h-[1.4em] ml-2"
                    src={bcvToken}
                    alt="bCV"
                  />
                </button>
                {loading.purchase && <Loader />}
              </div>
            )
          )}
          <div className="bg-white sm:rounded-3xl col-[2/3] shadow-primaryBig py-10 sm:p-10 row-span-2 flex flex-col">
            <h2 className="mb-6 font-bold mx-[8vw] sm:mx-0">
              Opis kandydata na podstawie AI
            </h2>
            <div className="px-[8vw] py-6 sm:px-8 rounded-xl bg-[#F8F9FB] flex-1">
              <p className="font-medium text-[.8rem] leading-loose">
                {candidateDetails.desc}
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col gap-8 ${
              candidateDetails.is_purchased ? "row-[1/4]" : "row-[2/4]"
            } col-[1/2] bg-white sm:rounded-3xl shadow-primaryBig px-[8vw] py-10 sm:p-10`}
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img
                  className="max-w-[60%] max-h-[60%]"
                  src={phoneIcon}
                  alt=""
                />
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
                <img
                  className="max-w-[60%] max-h-[60%]"
                  src={phoneIcon}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Wiek</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.availability}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img
                  className="max-w-[60%] max-h-[60%]"
                  src={emailIcon}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Wykształcenie</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.education?.split("(")[0]}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img src={cashIcon} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Oczekiwania finansowe</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.salary_expectation}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img src={role} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                {loading.page ? (
                  <>
                    <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                  </>
                ) : (
                  <>
                    <h4 className="text-sm">Prawo jazdy kat. B</h4>
                    <h3 className="font-semibold text-sm">
                      {candidateDetails.drivers_license ? "Tak" : "Nie"}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white sm:rounded-3xl shadow-primaryBig py-10 sm:p-10 flex justify-evenly flex-wrap col-[2/3] xl:flex-nowrap gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                <img
                  className="max-w-[60%] max-h-[60%]"
                  src={emailIcon}
                  alt=""
                />
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
                <img
                  className="max-w-[60%] max-h-[60%]"
                  src={phoneIcon}
                  alt=""
                />
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
                      +48 {candidateDetails.phone}
                    </h3>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {confetti && (
          <ConfettiExplosion className="absolute top-[40vh] right-[50%] translate-x-[-50%]" />
        )}
        <div className="bg-white sm:rounded-3xl overflow-hidden sm:overflow-auto py-10 sm:px-6 shadow-primaryBig gap-8 xl:gap-4 flex flex-col sm:flex-row flex-wrap justify-between items-center">
          <CircleChart
            profession="sales"
            percentage={candidateDetails.ability_charts.sales}
          />
          <CircleChart
            profession="office_administration"
            percentage={candidateDetails.ability_charts.office_administration}
          />
          <CircleChart
            profession="customer_service"
            percentage={candidateDetails.ability_charts.customer_service}
          />
        </div>
        <div className="bg-white sm:rounded-3xl px-[8vw] py-10 sm:p-10 shadow-primaryBig gap-12 flex flex-col">
          <div className="flex flex-col w-full">
            <h2 className="font-bold text-lg mb-8">
              Umiejętności kandydata do pracy na każdym stanowisku
            </h2>
            <div className="flex flex-col gap-8 sm:grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg">Sprzedaż</h3>
                {!loading.page ? (
                  candidateDetails.abilities?.sales.map((ab) => (
                    <AbilityRange
                      {...ab}
                      color={professionColorMap.sales.gradient}
                      key={ab.name}
                    />
                  ))
                ) : (
                  <>
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  </>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg">Administracja</h3>
                {!loading.page ? (
                  candidateDetails.abilities?.office_administration.map(
                    (ab) => (
                      <AbilityRange
                        {...ab}
                        color={
                          professionColorMap.office_administration.gradient
                        }
                        key={ab.name}
                      />
                    )
                  )
                ) : (
                  <>
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  </>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="font-bold text-lg">Obsługa klienta</h3>
                {!loading.page ? (
                  candidateDetails.abilities?.customer_service.map((ab) => (
                    <AbilityRange
                      {...ab}
                      color={professionColorMap.customer_service.gradient}
                      key={ab.name}
                    />
                  ))
                ) : (
                  <>
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                    <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold text-lg mb-6">
              Na co zwrócić uwagę przy kontakcie z kandydatem
            </h2>
            <div className="flex flex-col gap-8 sm:grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {!loading.page ? (
                candidateDetails.worst_abilities.map((ab) => (
                  <AbilityRange
                    {...ab}
                    color="linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)"
                    key={ab.name}
                  />
                ))
              ) : (
                <>
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                  <div className="h-[1.6em] rounded-full bg-[#f8f8f8]" />
                </>
              )}
            </div>
          </div>
        </div>
        {loading.page ? (
          <div className="ml-[8vw] sm:ml-0">
            <Loader />
          </div>
        ) : (
          <div className="flex items-center gap-4 ml-[8vw] sm:ml-0">
            <button
              type="button"
              style={{
                backgroundImage: candidateDetails.is_purchased
                  ? gradient
                  : "linear-gradient(180deg, #7C9D8E 0%, #91B49F 100%)",
              }}
              disabled={!candidateDetails.is_purchased}
              className="rounded-full w-max justify-center text-white text-[.8rem] font-semibold flex items-center py-4 px-10"
            >
              Pobierz profil w formacie PDF{" "}
              <img className="max-h-[1.4em] ml-2" src={pdf} alt="" />
            </button>
          </div>
        )}
        <div className="bg-white sm:rounded-3xl px-[8vw] py-10 sm:p-10 flex flex-wrap shadow-primaryBig gap-8">
          <div className="flex flex-col w-full">
            <h2 className="font-bold text-xl mb-6">
              Ci kandydaci mogą Cię zainteresować
            </h2>
            <div className="flex flex-col gap-6 w-full">
              {!loading.page ? (
                candidateDetails.similar_candidates?.map((cand) => (
                  <SuggestedCandidate {...cand} key={cand.id} />
                ))
              ) : (
                <>
                  <SuggestedCandidateLoader />
                  <SuggestedCandidateLoader />
                  <SuggestedCandidateLoader />
                  <SuggestedCandidateLoader />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </ColorSchemeContext.Provider>
  );
}

const SuggestedCandidate = ({
  id,
  first_name,
  last_name,
  profession,
}: CandidateProps) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        <div className="h-14 w-14 bg-[#F8F8F8] rounded-full flex items-center justify-center">
          <h4 className="text-primary">{first_name.charAt(0)}</h4>
        </div>
        <div className="flex flex-col mr-8 gap-1 w-max">
          <h4 className="text-sm w-max font-semibold">
            {first_name} {last_name}
          </h4>
          <h4 className="text-[.8rem] w-max">
            <span className="hidden sm:inline">Szuka pracy w:</span>{" "}
            <span className="font-semibold text-primary">{profession}</span>
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {/* {offersCategoryPercantageBox.map(box => <CategoryPercantageBox {...box} percentage={percentage_by_category[box.name]} />)} */}
        </div>
      </div>
      <Link
        className="border-primary rounded-full w-max min-w-max text-[.8rem] border-[1px] hover:text-[#2F66F4] transition-colors font-semibold"
        to={`/oferty/${id}`}
      >
        Pokaż profil
      </Link>
    </div>
  );
};

const SuggestedCandidateLoader = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-[.8in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            <div className="w-[1.2in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
          </div>
          <div className="w-[.6in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
        </div>
      </div>
      <div className="w-[1in] h-[2em] rounded-full bg-[#f8f8f8]" />
    </div>
  );
};
