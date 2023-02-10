import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import Loader from "../../components/Loader";
import { QuestionProps } from "../../constants/findWork";
import { radioInputStyles, roles, RoleType } from "../../constants/workForm";
import ProgressBar from "./ProgressBar";
import { SurveyContext } from "./Survey";

export default function RoleController() {
    const { candidateAnswers, roleAnswers, setRoleAnswers } = useContext(SurveyContext)
    const { email } = candidateAnswers
    const [role, setRole] = useState<RoleType | null>(null)
    const [questions, setQuestions] = useState<QuestionProps[]>([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const timer = useRef<any>(null)
    const [secondsLeft, setSecondsLeft] = useState(15)
    const { question, type, answers, name } = questions[activeQuestionIndex]

    useEffect(() => {
        timer.current = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer.current)
    }, [secondsLeft])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(activeQuestionIndex >= questions.length - 2) {
            axios.post('/api/survey/candidate', JSON.stringify(roleAnswers), {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        setActiveQuestionIndex(prev => prev + 1)
    }

    useEffect(() => {
        if(!role) return
        axios.get(`/api/survey?c=${role}&e=${email}`)
            .then(res => res.data)
            .then(data => setQuestions(data))
            .finally(() => setLoading(false))
    }, [role])

    if(!role) return <ChooseRole setRole={setRole} />
    if(loading || !questions[activeQuestionIndex]) return <Loader />

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questions.length} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questions.length}</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">{question}</h2>
            </div>
            <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-6 mt-8">
                    {answers?.map(ans => 
                        <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                            <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setRoleAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
                            {ans}
                        </label>
                    )}
                </div>
                <div className="flex justify-between items-center gap-4 flex-wrap self-end">
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-lg">Pozostały czas</h4>
                        <h3 className="text-secondary text-xl font-bold">{secondsLeft} sekund</h3>
                    </div>
                    <button className="rounded-full text-[.8rem] text-white font-bold py-4 px-8 bg-secondary self-end flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" /></button>
                </div>
            </form>
        </>
    )
}

const ChooseRole = ({ setRole }: { setRole: Dispatch<SetStateAction<RoleType | null>>}) => {
    const [chosen, setChosen] = useState<RoleType | null>(null)
    return (
        <>
            <ProgressBar progress={-1} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold opacity-0">0 / <span className="text-[#D3C5BB]">0</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">Wybierz zawód</h2>
            </div>
            <form className="flex flex-wrap flex-1 items-center justify-between gap-8 w-full" onSubmit={() => setRole(chosen)}>
                <div className="flex justify-between w-full gap-8 mt-8">
                    {roles.map(role => 
                        <label className='p-6 flex flex-col gap-8 relative bg-white rounded-3xl shadow-secondaryBig items-center' htmlFor={role.name} key={'label:' + role.name}>
                            <input className="absolute left-4 top-4" value={role.name} type='radio' key={role.name} id={role.name} onChange={e => e.target.checked && setChosen(role.name)} name='role' />
                            <img className="max-w-[1in] max-h-[.7in]" src={role.image} alt="" />
                            {role.title}
                        </label>
                    )}
                </div>
                <button type='submit' className="rounded-full text-[.8rem] text-white ml-auto self-end font-bold py-4 px-8 bg-secondary flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" /></button>
            </form>
        </>
    )
}