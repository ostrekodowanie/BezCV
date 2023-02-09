import { createContext, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import { defaultQuestions } from "../../constants/findWork";
import { AnswerType, CandidateControllerContextType } from "../../constants/workForm";
import Question from "./Question";

export const CandidateControllerContext = createContext<CandidateControllerContextType>(null!)

export default function CandidateController() {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<AnswerType>(defaultQuestions.reduce((acc, { name, type, customInputs }) => {
        if(name === 'preferred_professions') return { ...acc, [name]: [] }
        if(type === 'custom') {
            let newObj = customInputs?.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {})
            return { ...acc, ...newObj }
        }
        return { ...acc, [name]: '' }
    }, {} as AnswerType))

    const contextValue = useMemo(() => ({
        activeQuestionIndex,
        setActiveQuestionIndex,
        answers,
        setAnswers,
        questionsLength: defaultQuestions.length
    }), [activeQuestionIndex, setActiveQuestionIndex, answers, setAnswers, defaultQuestions.length])

    if(!defaultQuestions[activeQuestionIndex]) return <Loader />

    return (
        <CandidateControllerContext.Provider value={contextValue}>
            <Question {...defaultQuestions[activeQuestionIndex]} />
        </CandidateControllerContext.Provider>
    )
}