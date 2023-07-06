import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { prevArrow } from "../../assets/candidate/candidate";
import Loader from "../../components/Loader";
import EmailCodePopup from "../../components/survey/PhoneCodePopup";
import { defaultQuestions, QuestionProps } from "../../constants/findWork";
import ProgressBar from "../../components/survey/ProgressBar";
import { SurveyContext } from "../Survey";
import ReactGA from "react-ga";
import PolicyAccept from "../../components/survey/PolicyAccept";
import BirthdateInput from "../../components/survey/inputs/BirthdateInput";
import DefaultInput from "../../components/survey/inputs/DefaultInput";
import SelectInput from "../../components/survey/inputs/SelectInput";
import PhoneInput from "../../components/survey/inputs/PhoneInput";
import RadioInput from "../../components/survey/inputs/RadioInput";
import CheckboxInput from "../../components/survey/inputs/CheckboxInput";
import CustomInput from "../../components/survey/inputs/CustomInput";
import SurveyError from "../../components/survey/SurveyError";
import CandidateLoader from "./CandidateLoader";

export default function CandidateController() {
  const {
    candidateAnswers,
    setStep,
    activeQuestionIndex,
    setActiveQuestionIndex,
  } = useContext(SurveyContext);
  const { question, type } = defaultQuestions[activeQuestionIndex];
  const [loading, setLoading] = useState(false);
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [phoneCodePopupActive, setPhoneCodePopupActive] = useState(false);
  const [credentialsError, setCredentialsError] = useState("");
  const [error, setError] = useState("");
  const [policyWindowActive, setPolicyWindowActive] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "email") {
      setCredentialsLoading(true);
      return axios
        .post(
          "/api/survey/email",
          JSON.stringify({ email: candidateAnswers.email })
        )
        .then((res) => {
          switch (res.status) {
            case 204:
              setActiveQuestionIndex((prev) => prev + 1);
              break;
            case 200:
              setCredentialsError("Email jest już używany przez inny profil!");
          }
        })
        .catch(() => setCredentialsError("Wystąpił błąd!"))
        .finally(() => setCredentialsLoading(false));
    }

    if (type === "tel") {
      setCredentialsLoading(true);
      if (candidateAnswers.phone.length < 9) {
        setCredentialsLoading(false);
        return setCredentialsError("Nieprawidłowy numer telefonu!");
      }
      return axios
        .post(
          "/api/survey/phone",
          JSON.stringify({
            phone:
              typeof candidateAnswers.phone === "string"
                ? candidateAnswers.phone.split(" ").join("")
                : candidateAnswers.phone,
          })
        )
        .then(() => setPhoneCodePopupActive(true))
        .catch((err) => {
          setCredentialsError(
            typeof err.response.data.detail === "string"
              ? err.response.data.detail
              : "Wystąpił błąd!"
          );
        })
        .finally(() => setCredentialsLoading(false));
    }

    if (activeQuestionIndex >= defaultQuestions.length - 1)
      return setPolicyWindowActive(true);
    return setActiveQuestionIndex((prev) => prev + 1);
  };

  const handleLeave = () => {
    ReactGA.event({
      category: "Survey",
      action: "Leave",
      label: `Basic question ${activeQuestionIndex}`,
    });
  };

  useEffect(() => {
    setCredentialsError("");
    setError("");
    window.addEventListener("beforeunload", handleLeave);
    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [activeQuestionIndex]);

  const onPolicyAccept = async () => {
    setLoading(true);
    return axios
      .post(
        "/api/survey/candidate",
        JSON.stringify({
          ...candidateAnswers,
          driving_license:
            candidateAnswers.drivers_license === "Tak" ? true : false,
        })
      )
      .then(() => setPoliciesAccepted(true))
      .catch((err) =>
        setCredentialsError(
          typeof err.response.data.detail === "string"
            ? err.response.data.detail
            : "Wystąpił błąd!"
        )
      )
      .finally(() => setLoading(false));
  };

  if (activeQuestionIndex >= defaultQuestions.length - 1 && policiesAccepted)
    return <CandidateLoader isLoading={loading} />;
  if (error) return <SurveyError />;

  return (
    <>
      <ProgressBar progress={activeQuestionIndex / defaultQuestions.length} />
      <div className="flex flex-col items-center text-center gap-2">
        <small className="text-base font-semibold">
          {activeQuestionIndex + 1} /{" "}
          <span className="text-[#D3C5BB]">{defaultQuestions.length}</span>
        </small>
        <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
          {question}
        </h2>
      </div>
      <form
        className="flex flex-col flex-1 items-center justify-between gap-8 w-full sm:relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full gap-6 mt-8">
          <CandidateInput {...defaultQuestions[activeQuestionIndex]} />
        </div>
        <div className="flex justify-between items-center gap-4 flex-wrap self-end mt-8 xl:mt-0">
          {credentialsLoading && <Loader />}
          {!credentialsLoading && credentialsError && (
            <p className="text-red-400 max-w-full text-sm sm:text-base">
              {credentialsError}
            </p>
          )}
          <div className="flex sm:self-center sm:gap-6 flex-1 fixed sm:relative right-0 left-0 sm:inset-auto self-stretch max-w-full bottom-0">
            {activeQuestionIndex > 0 && (
              <button
                type="button"
                onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                className="sm:rounded-full sm:text-[.8rem] w-full sm:w-max justify-center text-[#F98D3D] text-[.75rem] scale shadow-[0px_6px_30px_rgba(193,120,16,0.17)] font-semibold py-[14px] px-8 bg-white self-end flex items-center"
              >
                <img className="mr-2 max-h-[.9em]" src={prevArrow} alt="<-" />{" "}
                Poprzednie pytanie
              </button>
            )}
            <button
              type="submit"
              className="justify-center text-[.75rem] w-full sm:w-max sm:rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] px-8 bg-secondary sm:self-end flex items-center"
            >
              Następne pytanie{" "}
              <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" />
            </button>
          </div>
        </div>
      </form>
      {phoneCodePopupActive && (
        <EmailCodePopup
          setActiveQuestionIndex={setActiveQuestionIndex}
          setPhoneCodePopupActive={setPhoneCodePopupActive}
        />
      )}
      {policyWindowActive && (
        <PolicyAccept
          hide={() => setPolicyWindowActive(false)}
          onAccept={onPolicyAccept}
        />
      )}
    </>
  );
}

const CandidateInput = (props: QuestionProps) => {
  const { type } = props;
  switch (type) {
    case "text":
    case "email":
    default:
      return <DefaultInput {...props} />;
    case "tel":
      return <PhoneInput />;
    case "date":
      return <BirthdateInput {...props} />;
    case "radio":
      return <RadioInput {...props} />;
    case "checkbox":
      return <CheckboxInput {...props} />;
    case "custom":
      return <CustomInput {...props} />;
    case "select":
      return <SelectInput {...props} />;
  }
};
