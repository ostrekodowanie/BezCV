import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import { QuestionProps } from "../../constants/findWork";
import { RangeNumberKey, rangeNumberKeys, textInputStyles, radioInputStyles } from "../../constants/workForm";

export default function Question({ question, type, answers, isBasic, placeholder, setQuestion }: QuestionProps & { setQuestion: Dispatch<SetStateAction<number>> }) {
    const timer = useRef<any>(null)
    const [secondsLeft, setSecondsLeft] = useState(15)
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        if(isBasic) return
        timer.current = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
        return () => clearTimeout(timer.current)
    }, [secondsLeft])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(!answer) return
        setAnswer('')
        setQuestion(prev => prev + 1)
    }

    return (
        <form className="flex flex-col flex-1 items-center justify-between gap-8 w-full sm:w-[6in]" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full gap-6 mt-8">
                {(type === 'checkbox' || type === 'radio') && answers?.map(ans => 
                    <label className={radioInputStyles} htmlFor={ans} key={'label:' + ans}>
                        <input value={ans} type={type} key={ans} id={ans} name={question} onChange={e => setAnswer(e.target.value)} />
                        {ans}
                    </label>
                )}
                {type === 'range' && <>
                    <input type='range' min={1} max={6} onChange={e => setAnswer(e.target.value)} />
                    <div className="flex justify-center gap-4 flex-wrap max-w-max">
                        {rangeNumberKeys.map(k => <RangeKey {...k} key={k.key} /> )}
                    </div>
                </>}
                {(type === 'text' || type === 'email' || type === 'tel') && <input className={textInputStyles} required={isBasic} value={answer} onChange={e => setAnswer(e.target.value)} id={question} placeholder={placeholder} type={type} />}
            </div>
            <div className="flex justify-between items-center gap-4 flex-wrap self-end">
                {!isBasic && <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-lg">Pozostały czas</h4>
                    <h3 className="text-secondary text-xl font-bold">{secondsLeft} sekund</h3>
                </div>}
                <button className="rounded-full text-[.8rem] text-white font-bold py-4 px-8 bg-secondary self-end flex items-center">Następne pytanie <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" /></button>
            </div>
        </form>
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