import axios from "axios";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { buttonArrow } from "../../assets/account/account";
import { prevArrow } from "../../assets/candidate/candidate";
import Loader from "../../components/Loader";
import EmailCodePopup from "../../components/survey/PhoneCodePopup";
import { defaultQuestions, QuestionProps } from "../../constants/findWork";
import { radioInputStyles, textInputStyles } from "../../constants/workForm";
import ProgressBar from "../../components/survey/ProgressBar";
import { SurveyContext } from "../Survey";
import ReactGA from "react-ga";
import PolicyAccept from "../../components/survey/PolicyAccept";

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
  const [hasReturned, setHasReturned] = useState(false);
  const [error, setError] = useState("");
  const [policyWindowActive, setPolicyWindowActive] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // if (type === "email") {
    //   setCredentialsLoading(true);
    //   return axios
    //     .post(
    //       "/api/survey/email",
    //       JSON.stringify({ email: candidateAnswers.email })
    //     )
    //     .then((res) => {
    //       switch (res.status) {
    //         case 204:
    //           setActiveQuestionIndex((prev) => prev + 1);
    //           break;
    //         case 200:
    //           setCredentialsError("Email jest już używany przez inny profil!");
    //       }
    //     })
    //     .catch(() => setCredentialsError("Wystąpił błąd!"))
    //     .finally(() => setCredentialsLoading(false));
    // }

    // if (type === "tel") {
    //   setCredentialsLoading(true);
    //   if (candidateAnswers.phone.length < 9) {
    //     setCredentialsLoading(false);
    //     return setCredentialsError("Nieprawidłowy numer telefonu!");
    //   }
    //   return axios
    //     .post(
    //       "/api/survey/phone",
    //       JSON.stringify({
    //         phone:
    //           typeof candidateAnswers.phone === "string"
    //             ? candidateAnswers.phone.split(" ").join("")
    //             : candidateAnswers.phone,
    //       })
    //     )
    //     .then(() => setPhoneCodePopupActive(true))
    //     .catch((err) => {
    //       setCredentialsError(
    //         typeof err.response.data.detail === "string"
    //           ? err.response.data.detail
    //           : "Wystąpił błąd!"
    //       );
    //     })
    //     .finally(() => setCredentialsLoading(false));
    // }

    if (activeQuestionIndex >= defaultQuestions.length - 1) {
      return setPolicyWindowActive(true);
    }
    setHasReturned(false);
    setActiveQuestionIndex((prev) => prev + 1);
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

  const handleReturn = () => {
    setHasReturned(true);
    setActiveQuestionIndex((prev) => prev - 1);
  };

  const onPolicyAccept = async () => {
    setLoading(true);
    return axios
      .post("/api/survey/candidate", JSON.stringify(candidateAnswers))
      .then(() => {
        setActiveQuestionIndex(0);
        setStep("role");
      })
      .catch((err) =>
        setCredentialsError(
          typeof err.response.data.detail === "string"
            ? err.response.data.detail
            : "Wystąpił błąd!"
        )
      )
      .finally(() => setLoading(false));
  };

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
        <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
          {question}
        </h2>
      </div>
      <form
        className="flex flex-col flex-1 items-center justify-between gap-8 w-full sm:relative"
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
            <p className="text-red-400 max-w-full text-sm sm:text-base">
              {credentialsError}
            </p>
          )}
          <div className="flex sm:self-center sm:gap-6 flex-1 fixed sm:relative right-0 left-0 sm:inset-auto self-stretch max-w-full bottom-0">
            {activeQuestionIndex > 0 && !hasReturned && (
              <button
                type="button"
                onClick={handleReturn}
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
      {policyWindowActive && <PolicyAccept onAccept={onPolicyAccept} />}
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
    case "date":
      // const handleBirthdateChange = (
      //   event: React.ChangeEvent<HTMLInputElement>
      // ) => {
      //   const selectedDate = new Date(event.target.value);
      //   const currentDate = new Date();
      //   const eighteenYearsAgo = new Date(
      //     currentDate.getFullYear() - 18,
      //     currentDate.getMonth(),
      //     currentDate.getDate()
      //   );
      //   if (selectedDate > eighteenYearsAgo) {
      //     setCandidateAnswers((prev) => ({
      //       ...prev,
      //       [name]: eighteenYearsAgo.toISOString().split("T")[0],
      //     }));
      //   } else {
      //     setCandidateAnswers((prev) => ({
      //       ...prev,
      //       [name]: event.target.value,
      //     }));
      //   }
      // };
      return (
        <input
          className={textInputStyles}
          autoComplete="off"
          required={true}
          type="date"
          value={candidateAnswers[name]}
          onChange={(e) =>
            setCandidateAnswers((prev) => ({
              ...prev,
              [name]: e.target.value,
            }))
          }
          id={question}
          placeholder={placeholder}
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
                required
                checked={candidateAnswers[name] === ans}
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
            if (input.type === "number")
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
                    type={"text"}
                    autoComplete="off"
                    value={candidateAnswers[input.name]}
                    placeholder={input.placeholder}
                    id={input.name}
                    onChange={(e) => {
                      let value = e.target.value;
                      setCandidateAnswers((prev) => ({
                        ...prev,
                        [input.name]: value.replace(/\D/g, ""),
                      }));
                    }}
                  />
                </div>
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
                  onChange={(e) => {
                    setCandidateAnswers((prev) => ({
                      ...prev,
                      [input.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
          })}
        </>
      );
    case "select":
      return (
        <Select
          className="self-stretch bg-white text-sm shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] font-semibold placeholder:font-medium"
          placeholder="Wybierz województwo"
          value={
            candidateAnswers[name]
              ? {
                  label: candidateAnswers[name],
                  value: candidateAnswers[name],
                }
              : ""
          }
          options={questionAnswers?.map((ans) => ({ label: ans, value: ans }))}
          onChange={(e) =>
            setCandidateAnswers((prev) => ({
              ...prev,
              [name]: typeof e === "string" ? e : e?.value,
            }))
          }
        />
      );
  }
};

const PhoneInput = () => {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  const [input, setInput] = useState(
    String(candidateAnswers.phone).replace(/(\d{3})(?=\d)/g, "$1 ")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
    value = value.slice(0, 11);
    setInput(value);
  };

  useEffect(() => {
    setCandidateAnswers((prev) => ({
      ...prev,
      phone: input.split(" ").join(""),
    }));
  }, [input]);

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4 self-stretch items-center">
      <span className="font-semibold text-sm">+48</span>
      <input
        className={textInputStyles}
        autoComplete="off"
        required={true}
        value={input}
        onChange={handleChange}
        id={"Pod jakim numerem pracodawca będzie mógł się z Tobą skontaktować?"}
        placeholder={"Tutaj wpisz swój numer telefonu"}
        type={"tel"}
      />
    </div>
  );
};
