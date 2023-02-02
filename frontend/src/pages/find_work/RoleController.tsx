import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { buttonArrow } from "../../assets/account/account";
import Loader from "../../components/Loader";
import { QuestionProps } from "../../constants/findWork";
import { RoleType } from "../../constants/workForm";
import ProgressBar from "./ProgressBar";
import Question from "./Question";

interface RoleProps {
    name: RoleType,
    title: string,
    image: string
}

const roles: RoleProps[] = [
    {
        name: 'office_administration',
        title: 'Administracja biurowa',
        image: ''
    },
    {
        name: 'customer_service',
        title: 'Obsługa klienta',
        image: ''
    },
    {
        name: 'selling',
        title: 'Sprzedaż',
        image: ''
    },
]

export default function RoleController() {
    const [role, setRole] = useState<RoleType | null>(null)
    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!role) return
        axios.get('/api/questions?r=' + role)
            .then(res => res.data)
            .then(data => setQuestions(data))
            .finally(() => setLoading(false))
    }, [role])

    if(!role) return <ChooseRole setRole={setRole} />
    if(loading) return <Loader />

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questions.length} />
            <div className="flex flex-col items-center text-center gap-2 max-w-full">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questions.length}</span></small>
                <h2 className="text-3xl font-bold">{questions[activeQuestionIndex].question}</h2>
            </div>
            <Question setQuestion={setActiveQuestionIndex} {...questions[activeQuestionIndex]} />
        </>
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