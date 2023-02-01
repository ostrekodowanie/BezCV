import axios from "axios"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { defaultQuestions, QuestionProps } from "../../constants/findWork"
import { RoleType } from "../../constants/workForm"
import { inputStyles } from "../Contact"
import ChooseRole from "./ChooseRole"
import ProgressBar from "./ProgressBar"
import Question from "./Question"

export default function WorkForm() {
    const [role, setRole] = useState<RoleType>()
    const [questions, setQuestions] = useState<QuestionProps[]>(defaultQuestions)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [basicAnswers, setBasicAnswers] = useState([])
    const [roleAnswers, setRoleAnswers] = useState([])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const resp = await axios.post('/api/candidate/add', JSON.stringify(basicAnswers), {
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.status === 200) return
    }

    if(role && activeQuestionIndex > defaultQuestions.length) return <></>

    return (
        <section className="padding flex flex-col items-center py-[.6in] justify-between min-h-screen">
            <div className="flex flex-col items-center gap-6 max-w-[8in] h-full">
                {activeQuestionIndex === defaultQuestions.length ? <ChooseRole setQuestion={setActiveQuestionIndex} /> : <>
                    <ProgressBar progress={activeQuestionIndex / questions.length} />
                    <div className="flex flex-col items-center text-center gap-2">
                        <small className="text-base">{activeQuestionIndex} / <span className="text-[#D3C5BB]">{questions.length}</span></small>
                        <h2 className="text-3xl font-bold">{questions[activeQuestionIndex].question}</h2>
                    </div>
                    <Question setQuestion={setActiveQuestionIndex} {...questions[activeQuestionIndex]} />
                </>}
            </div>
        </section>
    )
}

