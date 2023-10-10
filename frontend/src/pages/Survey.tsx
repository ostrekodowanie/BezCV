import RoleController from "./survey/RoleController";
import CandidateController from "./survey/CandidateController";
import { createContext, useLayoutEffect, useMemo, useState } from "react";
import { surveyMan } from "../assets/survey/survey";
import {
  CandidateAnswerType,
  RoleAnswerType,
  RoleType,
  SurveyContextType,
  SurveyScreenProps,
} from "../constants/workForm";
import { initialCandidateAnswers } from "../constants/findWork";
import SurveyManQuote from "../components/survey/SurveyManQuote";
import Introduction from "./survey/Introduction";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const SurveyContext = createContext<SurveyContextType>(null!);

export default function Survey({ setIsHeaderVisible }: SurveyScreenProps) {
  useDocumentTitle("Ankieta | bezCV - innowacyjny portal pracy");
  const [role, setRole] = useState<RoleType | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [step, setStep] = useState<"role" | "candidate">("role");
  const [isIntroduced, setIsIntroduced] = useState(false);
  const [filledSurveys, setFilledSurveys] = useState<RoleType[]>([]);
  const [roleAnswers, setRoleAnswers] = useState<RoleAnswerType[]>([]);
  const [candidateAnswers, setCandidateAnswers] = useState<CandidateAnswerType>(
    initialCandidateAnswers
  );

  useLayoutEffect(() => {
    isIntroduced ? setIsHeaderVisible(false) : setIsHeaderVisible(true);
    return () => {
      setIsHeaderVisible(true);
    };
  }, [isIntroduced]);

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
      filledSurveys,
      setFilledSurveys,
      isIntroduced,
      setIsIntroduced,
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
      filledSurveys,
      setFilledSurveys,
      isIntroduced,
      setIsIntroduced,
    ]
  );

  if (!isIntroduced)
    return (
      <SurveyContext.Provider value={contextValue}>
        <Introduction />
      </SurveyContext.Provider>
    );

  return (
    <section className="padding flex flex-col gap-12 justify-center pt-[.3in] sm:pt-[.6in] pb-[1.4in] min-h-screen relative xl:grid grid-cols-[2fr_1fr]">
      <button
        type="button"
        onClick={() => setIsIntroduced(false)}
        className="absolute left-[8vw] sm:left-16 top-8"
      >
        Wyjdź
      </button>
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
