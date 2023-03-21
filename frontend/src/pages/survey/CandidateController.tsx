import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { prevArrow } from "../../assets/candidate/candidate";
import Loader from "../../components/Loader";
import EmailCodePopup from "../../components/survey/PhoneCodePopup";
import { defaultQuestions, QuestionProps } from "../../constants/findWork";
import { radioInputStyles, textInputStyles } from "../../constants/workForm";
import ProgressBar from "./ProgressBar";
import { SurveyContext } from "./Survey";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "email") {
      setCredentialsLoading(true);
      return axios
        .post(
          "/api/survey/email",
          JSON.stringify({ email: candidateAnswers.email }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(() => setActiveQuestionIndex((prev) => prev + 1))
        .catch(() =>
          setCredentialsError("Email jest już używany przez inny profil")
        )
        .finally(() => setCredentialsLoading(false));
    }

    if (type === "tel") {
      if (candidateAnswers.phone.length < 11)
        return setError("Nieprawidłowy numer telefonu!");
      setCredentialsLoading(true);
      return axios
        .post(
          "/api/survey/phone",
          JSON.stringify({
            phone:
              typeof candidateAnswers.phone === "string"
                ? candidateAnswers.phone.split(" ").join("")
                : candidateAnswers.phone,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => setPhoneCodePopupActive(true))
        .catch(() => {
          setPhoneCodePopupActive(true);
          setError("Nieprawidłowy numer telefonu!");
        })
        .finally(() => setCredentialsLoading(false));
    }

    if (activeQuestionIndex >= defaultQuestions.length - 1) {
      setLoading(true);
      return axios
        .post("/api/survey/candidate", JSON.stringify(candidateAnswers), {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          setActiveQuestionIndex(0);
          setStep("role");
        })
        .catch((err) =>
          setError(
            typeof err.response.data.detail === "string"
              ? err.response.data.detail
              : "Wystąpił błąd!"
          )
        )
        .finally(() => setLoading(false));
    }
    setActiveQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    setError("");
  }, [activeQuestionIndex]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-400 mt-16">{error}</p>;

  return (
    <>
      <ProgressBar progress={activeQuestionIndex / defaultQuestions.length} />
      <div className="flex flex-col items-center text-center gap-2">
        <small className="text-base font-semibold">
          {activeQuestionIndex + 1} /{" "}
          <span className="text-[#D3C5BB]">{defaultQuestions.length}</span>
        </small>
        <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">
          {question}
        </h2>
      </div>
      <form
        className="flex flex-col flex-1 items-center justify-between gap-8 w-full relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full gap-6 mt-8">
          {type === "tel" ? (
            <PhoneInput />
          ) : (
            <CandidateInput {...defaultQuestions[activeQuestionIndex]} />
          )}
        </div>
        <div className="flex justify-between items-center gap-4 flex-wrap self-end mt-8 xl:mt-0">
          {credentialsLoading && <Loader />}
          {!credentialsLoading && credentialsError && (
            <p className="text-red-400 max-w-full">{credentialsError}</p>
          )}
          <div className="flex flex-col self-end sm:flex-row sm:self-center gap-6 flex-1">
            {activeQuestionIndex > 0 && (
              <button
                type="button"
                onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                className="rounded-full text-[.8rem] text-secondary scale shadow-[0px_6px_30px_rgba(193,120,16,0.17)] font-bold py-4 px-8 bg-[#FEF4E4] self-end flex items-center"
              >
                <img className="mr-2 max-h-[.9em]" src={prevArrow} alt="<-" />{" "}
                Poprzednie pytanie
              </button>
            )}
            <button
              type="submit"
              className="rounded-full text-[.8rem] text-white font-bold py-4 px-8 bg-secondary self-end flex items-center"
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
    </>
  );
}

const CandidateInput = ({
  question,
  type,
  placeholder,
  customInputs,
  name,
  ...rest
}: QuestionProps) => {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  const questionAnswers = rest.answers;

  switch (type) {
    case "text":
    case "email":
    case "tel":
    default:
      return (
        <input
          className={textInputStyles}
          autoComplete="off"
          required={true}
          value={candidateAnswers[name]}
          onChange={(e) =>
            setCandidateAnswers((prev) => ({ ...prev, [name]: e.target.value }))
          }
          id={question}
          placeholder={placeholder}
          type={type}
        />
      );
    case "radio":
      return (
        <>
          {questionAnswers?.map((ans) => (
            <label
              className={radioInputStyles}
              htmlFor={ans}
              key={"label:" + ans}
            >
              <input
                value={ans}
                type={type}
                key={ans}
                id={ans}
                name={question}
                onChange={(e) =>
                  setCandidateAnswers((prev) => ({
                    ...prev,
                    [name]: e.target.value,
                  }))
                }
              />
              {ans}
            </label>
          ))}
        </>
      );
    case "checkbox":
      return (
        <>
          {questionAnswers?.map((ans) => (
            <label
              className={radioInputStyles}
              htmlFor={ans}
              key={"label:" + ans}
            >
              <input
                value={ans}
                type={type}
                key={ans}
                id={ans}
                checked={candidateAnswers[name].includes(ans)}
                name={question}
                onChange={(e) => {
                  if (e.target.checked)
                    return setCandidateAnswers((prev) => ({
                      ...prev,
                      [name]: [...prev[name], e.target.value],
                    }));
                  return setCandidateAnswers((prev) => {
                    let old = prev[name];
                    if (typeof old === "string") return prev;
                    let newArr = old.filter((item) => item != e.target.value);
                    return { ...prev, [name]: newArr };
                  });
                }}
              />
              {ans}
            </label>
          ))}
        </>
      );
    case "custom":
      return (
        <>
          {customInputs?.map((input) => {
            if (input.type === "checkbox")
              return (
                <label
                  className="flex items-center gap-4 ml-4 text-sm self-stretch w-max"
                  htmlFor={"checkbox:" + input.name}
                >
                  <input
                    className="font-medium"
                    checked={candidateAnswers[input.name] === input.placeholder}
                    type={input.type}
                    value={input.placeholder}
                    id={"checkbox:" + input.name}
                    onChange={(e) =>
                      e.target.checked
                        ? setCandidateAnswers((prev) => ({
                            ...prev,
                            [input.name]: e.target.value,
                          }))
                        : setCandidateAnswers((prev) => ({
                            ...prev,
                            [input.name]: "",
                          }))
                    }
                  />
                  {input.placeholder}
                </label>
              );
            return (
              <div className="flex flex-col gap-4 self-stretch">
                {input.label && (
                  <label className="text-sm font-medium" htmlFor={input.name}>
                    {input.label}:
                  </label>
                )}
                <input
                  className={textInputStyles}
                  required
                  type={input.type}
                  autoComplete="off"
                  value={candidateAnswers[input.name]}
                  placeholder={input.placeholder}
                  id={input.name}
                  onChange={(e) =>
                    setCandidateAnswers((prev) => ({
                      ...prev,
                      [input.name]: e.target.value,
                    }))
                  }
                />
              </div>
            );
          })}
        </>
      );
  }
};

const PhoneInput = () => {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
    value = value.slice(0, 11);
    setCandidateAnswers((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  return (
    <input
      className={textInputStyles}
      autoComplete="off"
      required={true}
      value={candidateAnswers["phone"]}
      onChange={handleChange}
      id={"Pod jakim numerem pracodawca będzie mógł się z Tobą skontaktować?"}
      placeholder={"Tutaj wpisz swój numer telefonu"}
      type={"tel"}
    />
  );
};
