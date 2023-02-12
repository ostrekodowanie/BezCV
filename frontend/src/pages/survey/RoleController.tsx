import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { timeLeft } from "../../assets/survey/survey";
import Loader from "../../components/Loader";
import { RangeNumberKey, rangeNumberKeys, roles, RoleType } from "../../constants/workForm";
import Finished from "./Finished";
import ProgressBar from "./ProgressBar";
import { SurveyContext } from "./Survey";

interface RoleQuestion {
    id: number,
    text: string
}

export default function RoleController() {
    const { candidateAnswers, roleAnswers, setRoleAnswers } = useContext(SurveyContext)
    const { email } = candidateAnswers
    const [numericalAnswer, setNumericalAnswer] = useState<number>(1)
    const [role, setRole] = useState<RoleType | null>(null)
    const [questions, setQuestions] = useState<RoleQuestion[]>([])
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const timer = useRef<any>(null)
    const [secondsLeft, setSecondsLeft] = useState(15)
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        if(!questions[activeQuestionIndex]) return
        if(secondsLeft === 0) return setActiveQuestionIndex(prev => prev + 1)
        timer.current = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer.current)
    }, [secondsLeft, questions])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(!numericalAnswer) return
        setRoleAnswers(prev => [...prev, [questions[activeQuestionIndex].id, numericalAnswer ]])
        setActiveQuestionIndex(prev => prev + 1)
        setNumericalAnswer(1)
        setSecondsLeft(15)
    }

    useEffect(() => {
        if(activeQuestionIndex < questions.length) return
        axios.post('/api/survey/answers', JSON.stringify(roleAnswers), {
            headers: { 'Content-Type': 'application/json' }
        }).then(() => setIsFinished(true))
    }, [roleAnswers])

    useEffect(() => {
        if(!role) return
        axios.get(`/api/survey?c=${role}&e=${email}`)
            .then(res => res.data)
            .then(data => setQuestions(data))
            .finally(() => setLoading(false))
    }, [role])

    if(!role) return <ChooseRole setRole={setRole} />
    if(loading ||!questions[activeQuestionIndex]) return <Loader />

    const { text } = questions[activeQuestionIndex]

    if(isFinished) return <Finished />

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questions.length} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questions.length}</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">{text}</h2>
            </div>
            <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-6 mt-8">
                    <div className="relative mb-8 xl:mb-16">
                        <input className="bg-secondary" type='range' defaultValue={1} value={numericalAnswer} min={1} max={5} onChange={e => setNumericalAnswer(parseInt(e.target.value))} />
                        <p className="absolute top-full right-[50%] translate-x-[-50%] font-bold text-xl">{numericalAnswer}</p>
                    </div>
                    <div className="flex justify-center gap-8 flex-wrap max-w-max">
                        {rangeNumberKeys.map(k => <RangeKey {...k} numericalAnswer={numericalAnswer} key={k.number} /> )}
                    </div>
                </div>
                <div className="flex justify-between items-center self-stretch gap-4 flex-wrap mt-8 xl:mt-0">
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold flex items-center"><img className="max-h-[1.1em] mr-2" src={timeLeft} alt="" /> Pozostały czas</h4>
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
            <h2 className="text-3xl font-bold text-center w-full max-w-[8in] mx-auto">Wybierz zawód</h2>
            <form className="flex flex-wrap flex-1 items-center justify-between gap-8 w-full" onSubmit={() => setRole(chosen)}>
                <div className="flex flex-col w-full gap-4 sm:grid grid-cols-3">
                    {roles.map(role => 
                        <label className={`p-12 w-full flex flex-col cursor-pointer font-semibold gap-8 max-w-[4in] mx-auto relative bg-white rounded-3xl shadow-secondaryBig items-center ${chosen === role.name && 'outline-[2px] outline-[#F98D3D] text-secondary'}`} htmlFor={role.name} key={'label:' + role.name}>
                            <input className="absolute left-8 top-8" value={role.name} type='radio' key={role.name} id={role.name} onChange={e => e.target.checked && setChosen(role.name)} name='role' />
                            <img className="max-w-[1.6in] max-h-[1.2in]" src={role.image} alt="" />
                            {role.title}
                        </label>
                    )}
                </div>
                <button type='submit' className="rounded-full text-[.8rem] text-white ml-auto self-end font-bold py-4 px-8 bg-secondary flex items-center mt-8 xl:mt-0">Rozpocznij ankietę <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" /></button>
            </form>
        </>
    )
}

const RangeKey = ({ number, text, numericalAnswer }: RangeNumberKey & { numericalAnswer: number }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full h-16 w-16 transition-colors flex items-center justify-center shadow-[0px_7px_37px_-2px_rgba(215,105,23,0.13)] ${number === numericalAnswer ? 'bg-[#F9AE3D] text-white' : 'bg-white text-font'}`}>
                <span className="text-xl font-semibold">{number}</span>
            </div>
            <div className="text-center">
                <h5 className="font-medium text-sm">{number} oznacza</h5>
                <h4 className="font-bold text-sm">“{text}”</h4>
            </div>
        </div>
    )
}