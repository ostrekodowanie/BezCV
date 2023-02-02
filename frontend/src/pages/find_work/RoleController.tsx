import axios from "axios";
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import Loader from "../../components/Loader";
import { QuestionProps } from "../../constants/findWork";
import { ControllerContextType, roles, RoleType } from "../../constants/workForm";
import Question from "./Question";

export const RoleControllerContext = createContext<ControllerContextType>(null!)

export default function RoleController() {
    const [role, setRole] = useState<RoleType | null>(null)
    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!role) return
        axios.get('/api/questions?r=' + role)
            .then(res => res.data)
            .then(data => setQuestions(data))
            .finally(() => setLoading(false))
    }, [role])

    const contextValue = useMemo(() => ({
        activeQuestionIndex,
        setActiveQuestionIndex,
        answers,
        setAnswers,
        questionsLength: questions.length
    }), [activeQuestionIndex, setActiveQuestionIndex, answers, setAnswers, questions])

    if(!role) return <ChooseRole setRole={setRole} />
    if(loading || !questions[activeQuestionIndex]) return <Loader />

    return (
        <RoleControllerContext.Provider value={contextValue}>
            <Question {...questions[activeQuestionIndex]} />
        </RoleControllerContext.Provider>
    )
}

const ChooseRole = ({ setRole }: { setRole: Dispatch<SetStateAction<RoleType | null>>}) => {
    const [chosen, setChosen] = useState<RoleType | null>(null)
    return (
        <>
            <h2 className="text-3xl font-bold">Wybierz zawód</h2>
            <div className="flex flex-col items-stretch w-full gap-6 mt-8">
                {roles.map(role => 
                    <label className='' htmlFor={role.name} key={'label:' + role.name}>
                        <input value={role.name} type='radio' key={role.name} id={role.name} onChange={e => setChosen(role.name)} name='role' />
                        {role.title}
                    </label>
                )}
            </div>
            <button onClick={() => setRole(chosen)} className="rounded-full text-[.8rem] text-white ml-auto self-end font-bold py-4 px-8 bg-secondary flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" /></button>
        </>
    )
}