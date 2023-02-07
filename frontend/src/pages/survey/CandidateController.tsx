import { createContext, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import { defaultQuestions } from "../../constants/findWork";
import { AnswerType, ControllerContextType } from "../../constants/workForm";
import Question from "./Question";

export const CandidateControllerContext = createContext<ControllerContextType>(null!)

export default function CandidateController() {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<AnswerType>(defaultQuestions.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {}))

    const contextValue = useMemo(() => ({
        activeQuestionIndex,
        setActiveQuestionIndex,
        answers,
        setAnswers,
        questionsLength: defaultQuestions.length
    }), [activeQuestionIndex, setActiveQuestionIndex, answers, setAnswers])

    if(!defaultQuestions[activeQuestionIndex]) return <Loader />

    return (
        <CandidateControllerContext.Provider value={contextValue}>
            <Question {...defaultQuestions[activeQuestionIndex]} />
        </CandidateControllerContext.Provider>
    )
}