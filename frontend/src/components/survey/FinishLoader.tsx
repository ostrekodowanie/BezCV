import { useEffect, useRef, useState } from "react"
import Loader from "../Loader"

const finishTexts = ['Trwa tworzenie twojego profilu', 'Przesyłamy twoje informacje do bazy']

export default function FinishLoader() {
    const timer = useRef<any>(null)
    const [activeTextIndex, setActiveTextIndex] = useState<0 | 1>(0)

    useEffect(() => {
        timer.current = setTimeout(() => setActiveTextIndex(prev => prev === 0 ? 1 : 0))
        return () => {
            clearTimeout(timer.current)
        }
    }, [activeTextIndex])

    return (
        <div className="self-center flex flex-col items-center gap-4">
            <Loader />
            <div className="relative">
                {finishTexts.map(text => <p className={`font-medium transition-opacity delay-200 duration-200 ${finishTexts[activeTextIndex] === text ? 'opacity-100' : 'opacity-0'}`}>{text}</p>)}
            </div>
        </div>
    )
}