import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { defaultQuestions, } from "../../constants/findWork";
import ProgressBar from "./ProgressBar";
import Question from "./Question";

export default function CandidateController({ setStep }: { setStep: Dispatch<SetStateAction<'role' | 'candidate'>>}) {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})

    useEffect(() => {
        if(activeQuestionIndex >= defaultQuestions.length - 1) return setStep('role')
    }, [activeQuestionIndex])

    if(!defaultQuestions[activeQuestionIndex]) return <Loader />

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / defaultQuestions.length} />
            <div className="flex flex-col items-center text-center gap-2 max-w-full">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{defaultQuestions.length}</span></small>
                <h2 className="text-3xl font-bold">{defaultQuestions[activeQuestionIndex].question}</h2>
            </div>
            <Question setQuestion={setActiveQuestionIndex} {...defaultQuestions[activeQuestionIndex]} />
        </>
    )
}