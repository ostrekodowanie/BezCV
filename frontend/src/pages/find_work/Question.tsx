import { FormEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { prevArrow } from "../../assets/candidate/candidate";
import { defaultQuestionsLength, QuestionProps } from "../../constants/findWork";
import { RangeNumberKey, rangeNumberKeys, textInputStyles, radioInputStyles } from "../../constants/workForm";
import { CandidateControllerContext } from "./CandidateController";
import ProgressBar from "./ProgressBar";
import { RoleControllerContext } from "./RoleController";
import { StepContext } from "./WorkForm";

export default function Question({ question, type, placeholder, name, ...rest }: QuestionProps) {
    const timer = useRef<any>(null)
    const questionAnswers = rest.answers
    const [secondsLeft, setSecondsLeft] = useState(15)
    const { step, setStep } = useContext(StepContext)
    const { activeQuestionIndex, setActiveQuestionIndex, questionsLength, answers, setAnswers } = useContext(step === 'candidate' ? CandidateControllerContext : RoleControllerContext)

    useEffect(() => {
        if(step === 'candidate') return
        timer.current = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer.current)
    }, [secondsLeft])

    useLayoutEffect(() => {
        if(!answers[name]) setAnswers(prev => ({ ...prev, [name]: '' }))
    }, [question])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(activeQuestionIndex === defaultQuestionsLength) return setStep('role')
        setActiveQuestionIndex(prev => prev + 1)
    }

    return (
        <>
            <ProgressBar progress={activeQuestionIndex / questionsLength} />
            <div className="flex flex-col items-center text-center gap-2">
                <small className="text-base font-semibold">{activeQuestionIndex + 1} / <span className="text-[#D3C5BB]">{questionsLength}</span></small>
                <h2 className="text-3xl font-bold text-center w-full max-w-[8in]">{question}</h2>
            </div>
            <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full md:w-[7in]" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-6 mt-8">
                    {(type === 'checkbox' || type === 'radio') && questionAnswers?.map(ans => 
                        <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                            <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
                            {ans}
                        </label>
                    )}
                    {type === 'range' && <>
                        <input type='range' min={1} max={6} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} />
                        <div className="flex justify-center gap-4 flex-wrap max-w-max">
                            {rangeNumberKeys.map(k => <RangeKey {...k} key={k.key} /> )}
                        </div>
                    </>}
                    {(type === 'text' || type === 'email' || type === 'tel') && <input className={textInputStyles} autoComplete="off" required={step === 'candidate'} value={answers[name]} onChange={e => setAnswers(prev => ({ ...prev, [name]: e.target.value }))} id={question} placeholder={placeholder} type={type} />}
                </div>
                <div className="flex justify-between items-center gap-4 flex-wrap self-end">
                    {step === 'role' && <div className="flex flex-col gap-2">
                        <h4 className="font-semibold text-lg">Pozostały czas</h4>
                        <h3 className="text-secondary text-xl font-bold">{secondsLeft} sekund</h3>
                    </div>}
                    {(step === 'candidate' && activeQuestionIndex > 0) && <button type='button' onClick={() => setActiveQuestionIndex(prev => prev - 1)} className="rounded-full text-[.8rem] text-secondary scale shadow-[0px_6px_30px_rgba(193,120,16,0.17)] font-bold py-4 px-8 bg-[#FEF4E4] self-end flex items-center"><img className="mr-2 max-h-[.9em]" src={prevArrow} alt="<-" /> Poprzednie pytanie</button>}
                    <button className="rounded-full text-[.8rem] text-white font-bold py-4 px-8 bg-secondary self-end flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" /></button>
                </div>
            </form>
        </>
    )
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