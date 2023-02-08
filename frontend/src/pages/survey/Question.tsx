import axios from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { buttonArrow } from "../../assets/account/account";
import { prevArrow } from "../../assets/candidate/candidate";
import { QuestionProps } from "../../constants/findWork";
import { RangeNumberKey, rangeNumberKeys, textInputStyles, radioInputStyles } from "../../constants/workForm";
import { CandidateControllerContext } from "./CandidateController";
import ProgressBar from "./ProgressBar";
import { RoleControllerContext } from "./RoleController";
import { StepContext } from "./Survey";

export default function Question(props: QuestionProps) {
    const { step } = useContext(StepContext)

    if(step === 'candidate') return <CandidateForm {...props} />
    if(step === 'role') return <RoleForm {...props} />
    return <></>
}

const CandidateForm = (props: QuestionProps) => {
    const { question } = props
    const { setStep } = useContext(StepContext)
    const { activeQuestionIndex, setActiveQuestionIndex, questionsLength, answers } = useContext(CandidateControllerContext)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(activeQuestionIndex === questionsLength - 1) {
            axios.post('/api/survey/candidate', JSON.stringify(answers), {
                headers: { 'Content-Type': 'application/json' }
            }).then(() => setStep('role'))
        }
        setActiveQuestionIndex(prev => prev + 1)
    }

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questionsLength} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questionsLength}</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">{question}</h2>
            </div>
            <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-6 mt-8">
                    <CandidateInput {...props} />
                </div>
                <div className="flex justify-between items-center gap-4 flex-wrap self-end">
                    {activeQuestionIndex > 0 && <button type='button' onClick={() => setActiveQuestionIndex(prev => prev - 1)} className="rounded-full text-[.8rem] text-secondary scale shadow-[0px_6px_30px_rgba(193,120,16,0.17)] font-bold py-4 px-8 bg-[#FEF4E4] self-end flex items-center"><img className="mr-2 max-h-[.9em]" src={prevArrow} alt="<-" /> Poprzednie pytanie</button>}
                    <button className="rounded-full text-[.8rem] text-white font-bold py-4 px-8 bg-secondary self-end flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" /></button>
                </div>
            </form>
        </>
    )
}

const RoleForm = ({ question, name, type, answers }: QuestionProps) => {
    const { setAnswers, activeQuestionIndex, setActiveQuestionIndex, questionsLength } = useContext(RoleControllerContext)
    const timer = useRef<any>(null)
    const [secondsLeft, setSecondsLeft] = useState(15)

    useEffect(() => {
        timer.current = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer.current)
    }, [secondsLeft])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setActiveQuestionIndex(prev => prev + 1)
    }

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questionsLength} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questionsLength}</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">{question}</h2>
            </div>
            <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-6 mt-8">
                    {answers?.map(ans => 
                        <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                            <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
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

const CandidateInput = ({ question, type, placeholder, customInputs, name, ...rest }: QuestionProps) => {
    const { answers, setAnswers } = useContext(CandidateControllerContext)
    const questionAnswers = rest.answers

    switch(type) {
        case 'text':
        case 'email':
        case 'tel':
            return <input className={textInputStyles} autoComplete="off" required={true} value={answers[name]} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} id={question} placeholder={placeholder} type={type} />
        case 'range':
            return (
                <>
                    <input type='range' min={1} max={6} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
                    <div className="flex justify-center gap-4 flex-wrap max-w-max">
                        {rangeNumberKeys.map(k => <RangeKey {...k} key={k.key} /> )}
                    </div>
                </>
            )
        case 'radio':
            return <>
                {questionAnswers?.map(ans => 
                    <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                        <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setAnswers(prev => ({ ...prev, [name]: [...prev[name], e.target.value] }))} />
                        {ans}
                    </label>
                )}
            </>
        case 'checkbox':
            return <>
                {questionAnswers?.map(ans => 
                    <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                        <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
                        {ans}
                    </label>
                )}
            </>
        case 'custom':
            return <>
                {customInputs?.map(input => 
                    <div className="flex items-center gap-4">
                        <label htmlFor={input.label}>{input.label}</label>
                        <input className={textInputStyles} type={input.type} id={input.label} onChange={e => setAnswers(prev => ({ ...prev, [input.name]: e.target.value }))} />
                    </div>    
                )}
            </>
        default:
            return <Navigate to='/' />
    }
}

const RangeKey = ({ number, key }: RangeNumberKey) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-full h-24 w-24 flex items-center justify-center">
                <span className="text-xl">{number}</span>
            </div>
            <div className="text-center">
                <h5 className="font-medium text-sm">{number} oznacza</h5>
                <h4 className="font-bold text-sm">{key}</h4>
            </div>
        </div>
    )
}