import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react";
import { arrowRight } from "../../assets/general";
import { textInputStyles } from "../../constants/workForm";
import { SurveyContext } from "../../pages/survey/Survey";
import Loader from "../Loader";

type EmailCodePopupProps = {
    setActiveQuestionIndex: Dispatch<SetStateAction<number>>
    setEmailCodePopupActive: Dispatch<SetStateAction<boolean>>
}

export default function EmailCodePopup({ setActiveQuestionIndex, setEmailCodePopupActive }: EmailCodePopupProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [code, setCode] = useState('')
    const { setStep, setIsSurveyFilled, candidateAnswers } = useContext(SurveyContext)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        axios.post('/api/survey/email/verify', JSON.stringify({ 
            email: candidateAnswers.email,
            code
         }), { headers: { 'Content-Type': 'application/json' } })
         .then(res => {
            switch(res.status) {
                case 204:
                    setEmailCodePopupActive(false)
                    return setActiveQuestionIndex(prev => prev + 1)
                case 200:
                    setEmailCodePopupActive(false)
                    setIsSurveyFilled(res.data)
                    return setStep('role')
            }
        }).catch(() => setError('Błędny kod!'))
        .finally(() => setLoading(false))
    }

    return (
        <form className='absolute sm:left-[50%] sm:translate-x-[-50%] top-[40%] max-w-[6in] bg-white shadow-secondaryBig rounded-3xl p-6 flex flex-col gap-4 animate-opacity' onSubmit={handleSubmit}>
            <p>Przesłaliśmy kod weryfikacyjny na podany przez Ciebie email.</p>
            <input className={textInputStyles} onChange={e => setCode(e.target.value)} required autoComplete="off" type="number" name='email_code' id="email_code" placeholder="Tutaj wpisz swój kod" />
            <div className="flex items-center justify-end gap-4">
                {loading && <Loader />}
                {error && <p className="text-red-400">{error}</p>}
                <button className="bg-secondary transition-colors font-medium border-primary text-white rounded-full flex items-center text-[.8rem] py-3 px-8 max-w-max">Prześlij<img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></button>
            </div>
        </form>
    )
}