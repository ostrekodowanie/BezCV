import { Link } from "react-router-dom";
import RoleController from "./RoleController";
import CandidateController from "./CandidateController";
import { createContext, useMemo, useState } from "react";
import { surveyMan } from "../../assets/survey/survey";
import {
  CandidateAnswerType,
  initialFilledState,
  IsFilled,
  RoleAnswerType,
  RoleType,
  SurveyContextType,
} from "../../constants/workForm";
import { defaultQuestions } from "../../constants/findWork";
import SurveyManQuote from "../../components/survey/SurveyManQuote";

export const SurveyContext = createContext<SurveyContextType>(null!);

export default function Survey() {
  const [role, setRole] = useState<RoleType | null>("sales");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [step, setStep] = useState<"role" | "candidate">("role");
  const [isSurveyFilled, setIsSurveyFilled] =
    useState<IsFilled>(initialFilledState);
  const [roleAnswers, setRoleAnswers] = useState<RoleAnswerType[]>([]);
  const [candidateAnswers, setCandidateAnswers] = useState<CandidateAnswerType>(
    defaultQuestions.reduce((acc, { name, type, customInputs }) => {
      if (name === "preferred_professions") return { ...acc, [name]: [] };
      if (type === "custom") {
        let newObj = customInputs?.reduce(
          (acc, { name }) => ({ ...acc, [name]: "" }),
          {}
        );
        return { ...acc, ...newObj };
      }
      if (type === "date") {
        return { ...acc, [name]: new Date().toISOString().substring(0, 10) };
      }
      return { ...acc, [name]: "" };
    }, {} as CandidateAnswerType)
  );

  const contextValue = useMemo<SurveyContextType>(
    () => ({
      step,
      setStep,
      role,
      setRole,
      roleAnswers,
      setRoleAnswers,
      candidateAnswers,
      setCandidateAnswers,
      activeQuestionIndex,
      setActiveQuestionIndex,
      isSurveyFilled,
      setIsSurveyFilled,
    }),
    [
      step,
      setStep,
      role,
      setRole,
      roleAnswers,
      setRoleAnswers,
      candidateAnswers,
      setCandidateAnswers,
      activeQuestionIndex,
      setActiveQuestionIndex,
      isSurveyFilled,
      setIsSurveyFilled,
    ]
  );

  return (
    <section className="padding flex flex-col gap-12 justify-center pt-[.3in] sm:pt-[.6in] pb-[1.4in] min-h-screen relative xl:grid grid-cols-[2fr_1fr]">
      <Link className="absolute left-[8vw] sm:left-16 top-8" to="/praca">
        Powrót
      </Link>
      <SurveyContext.Provider value={contextValue}>
        <div className="flex flex-col items-center gap-6 w-full mt-16 sm:mt-0">
          {step === "role" && <RoleController />}
          {step === "candidate" && <CandidateController />}
        </div>
        <div className="hidden xl:flex flex-col self-center gap-16 justify-self-end justify-center items-center relative xl:absolute xl:w-[30vw] right-0 top-0 bottom-0 bg-secondary">
          <img className="max-w-[90%]" src={surveyMan} alt="" />
          <SurveyManQuote />
        </div>
      </SurveyContext.Provider>
    </section>
  );
}
