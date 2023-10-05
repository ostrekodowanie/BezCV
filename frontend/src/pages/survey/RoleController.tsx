import axios from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { timeLeft } from "../../assets/survey/survey";
import Loader from "../../components/Loader";
import RangeKey from "../../components/survey/RangeKey";
import RoleChoosePage from "./RoleChoosePage";
import { rangeNumberKeys } from "../../constants/workForm";
import Finished from "./Finished";
import ProgressBar from "../../components/survey/ProgressBar";
import { SurveyContext } from "../Survey";
import Summary from "./Summary";
import ReactGA from "react-ga";
import { roleToTextMap } from "../../constants/candidate";
import { loaderFacts } from "../../constants/findWork";
import LoaderFact from "./LoaderFact";
import SurveyError from "../../components/survey/SurveyError";
import IndustryList from "./IndustriesList";
import { Industry } from "../../types/candidate";

interface RoleQuestion {
  id: number;
  text: string;
}

export default function RoleController() {
  const {
    role,
    setRole,
    candidateAnswers,
    roleAnswers,
    setRoleAnswers,
    activeQuestionIndex,
    setActiveQuestionIndex,
    filledSurveys,
    setFilledSurveys,
  } = useContext(SurveyContext);
  const { phone } = candidateAnswers;
  const [industriesChosen, setIndustriesChosen] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [numericalAnswer, setNumericalAnswer] = useState<number | null>(null);
  const [questions, setQuestions] = useState<RoleQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<any>(null);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finishFirstName, setFinishFirstName] = useState("");
  const [error, setError] = useState("");
  const [isEverySurveyFilled, setIsEverySurveyFilled] = useState(
    filledSurveys.length === 3
  );

  useEffect(() => {
    setIsEverySurveyFilled(filledSurveys.length === 3);
  }, [filledSurveys]);

  useEffect(() => {
    if (!questions[activeQuestionIndex]) return;
    timer.current = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer.current);
  }, [secondsLeft, questions]);

  const handleLeave = () => {
    ReactGA.event({
      category: "Survey",
      action: "Leave",
      label: `${
        role ? roleToTextMap[role].profession : "Role"
      } question ${activeQuestionIndex}`,
    });
  };

  useEffect(() => {
    setSecondsLeft(20);
    setNumericalAnswer(null);
    window.addEventListener("beforeunload", handleLeave);
    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [activeQuestionIndex]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!numericalAnswer) return;
    setRoleAnswers((prev) => [
      ...prev,
      [questions[activeQuestionIndex].id, numericalAnswer],
    ]);
    setActiveQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (activeQuestionIndex >= questions.length && questions.length !== 0) {
      setIsFinishing(true);
      axios
        .post(
          "/api/survey/answers",
          JSON.stringify({
            candidate: phone,
            answers: roleAnswers,
            profession: role,
            ...(industries.length > 0 && {
              industries: industries.map((item) => item.id),
            }),
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setIsFinished(true);
          setFinishFirstName(res.data.first_name);
          role && setFilledSurveys((prev) => [...prev, role]);
        })
        .catch((err) =>
          setError(
            typeof err.response.data.detail === "string"
              ? err.response.data.detail
              : "Wystąpił błąd!"
          )
        )
        .finally(() => setIsFinishing(false));
    }
  }, [roleAnswers]);

  useEffect(() => {
    if (!role) return;
    axios
      .get(`/api/survey?c=${role}&phone=${phone}`)
      .then((res) => res.data)
      .then((data) => setQuestions(data))
      .finally(() => setLoading(false));
  }, [role]);

  if (isEverySurveyFilled) return <Summary firstName={finishFirstName} />;
  if (isFinished)
    return (
      <Finished
        setIsEverySurveyFilled={setIsEverySurveyFilled}
        setIsFinished={setIsFinished}
        setIsFinishing={setIsFinishing}
      />
    );
  if (isFinishing) return <LoaderFact {...loaderFacts[role || "sales"]} />;
  if (!role) return <RoleChoosePage setRole={setRole} />;
  if (!industriesChosen && filledSurveys.length === 0)
    return (
      <IndustryList
        profession={role}
        industries={industries}
        changeIndustry={(industry) =>
          setIndustries((prev) =>
            prev.findIndex((item) => item.id === industry.id) === -1
              ? [...prev, industry]
              : [...prev].filter((item) => item.id !== industry.id)
          )
        }
        submit={() => setIndustriesChosen(true)}
      />
    );
  if (error) return <SurveyError />;
  if (loading || !questions[activeQuestionIndex]) return <Loader />;
  const { text } = questions[activeQuestionIndex];
  return (
    <>
      <ProgressBar progress={activeQuestionIndex / questions.length} />
      <div className="flex flex-col items-center text-center gap-2">
        <small className="text-base font-semibold">
          {activeQuestionIndex + 1} /{" "}
          <span className="text-[#D3C5BB]">{questions.length}</span>
        </small>
        <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
          {text}
        </h2>
      </div>
      <form
        id="role-form"
        className="flex flex-col flex-1 items-center justify-between gap-8 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full gap-6 mt-8">
          <div className="hidden sm:block relative mb-8 xl:mb-16">
            <input
              className="bg-secondary focus:cursor-grabbing"
              type="range"
              required
              defaultValue={1}
              value={numericalAnswer || ""}
              min={1}
              max={5}
              onChange={(e) => setNumericalAnswer(parseInt(e.target.value))}
            />
            <p className="absolute top-full right-[50%] translate-x-[-50%] font-bold text-xl">
              {numericalAnswer}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-8 sm:flex-wrap max-w-max">
            {rangeNumberKeys.map((k) => (
              <RangeKey
                {...k}
                numericalAnswer={numericalAnswer}
                setNumericalAnswer={setNumericalAnswer}
                key={k.number}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:justify-between sm:items-center fixed sm:static right-0 left-0 bottom-0 self-stretch sm:gap-4">
          <div className="flex flex-col sm:gap-2 justify-self-center sm:justify-self-auto bg-white sm:bg-transparent">
            <h4 className="font-semibold flex text-sm sm:text-base items-center">
              <img
                className="max-h-[1.1em] mr-2 animate-spin"
                src={timeLeft}
                alt=""
              />{" "}
              Pozostały czas
            </h4>
            {secondsLeft > 0 ? (
              <h3 className="text-secondary text-base sm:text-xl font-bold">
                {secondsLeft} sekund
              </h3>
            ) : (
              <h3 className="text-red-400 text-base sm:text-xl font-bold">
                Koniec czasu!
              </h3>
            )}
          </div>
          <button
            type="submit"
            disabled={!numericalAnswer}
            form="role-form"
            className="sm:rounded-full text-[.75rem] justify-center sm:w-max sm:text-[.8rem] text-white font-semibold py-4 px-8 bg-secondary sm:self-end flex items-center disabled:opacity-40"
          >
            {activeQuestionIndex >= questions.length - 1
              ? "Koniec ankiety"
              : "Następne pytanie"}
            <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" />
          </button>
        </div>
      </form>
    </>
  );
}
