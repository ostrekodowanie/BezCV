import { Link } from "react-router-dom"
import RoleController from "./RoleController"
import CandidateController from "./CandidateController"
import { createContext, useMemo, useState } from "react"
import { surveyMan, triangle } from "../../assets/survey/survey"
import { CandidateAnswerType, RoleAnswerType, SurveyContextType } from "../../constants/workForm"
import { defaultQuestions } from "../../constants/findWork"

export const SurveyContext = createContext<SurveyContextType>(null!)

export default function Survey() {
    const [step, setStep] = useState<'role' | 'candidate'>('candidate')
    const [roleAnswers, setRoleAnswers] = useState<RoleAnswerType[]>([])
    const [candidateAnswers, setCandidateAnswers] = useState<CandidateAnswerType>(defaultQuestions.reduce((acc, { name, type, customInputs }) => {
        if(name === 'preferred_professions') return { ...acc, [name]: [] }
        if(type === 'custom') {
            let newObj = customInputs?.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {})
            return { ...acc, ...newObj }
        }
        return { ...acc, [name]: '' }
    }, {} as CandidateAnswerType))

    const contextValue = useMemo<SurveyContextType>(() => ({
        step,
        setStep,
        roleAnswers,
        setRoleAnswers,
        candidateAnswers,
        setCandidateAnswers
    }), [step, setStep, roleAnswers, setRoleAnswers, candidateAnswers, setCandidateAnswers])

    return (
        <section className="padding flex flex-col gap-12 justify-center pt-[.6in] pb-[1.4in] min-h-screen relative xl:grid grid-cols-[2fr_1fr]">
            <Link className="absolute left-16 top-8" to='/praca'>Powrót</Link>
            <div className="flex flex-col items-center gap-6 w-full mt-16 sm:mt-0">
                <SurveyContext.Provider value={contextValue}>
                    {step === 'role' && <RoleController />}
                    {step === 'candidate' && <CandidateController />}
                </SurveyContext.Provider>
            </div>
            <div className="hidden xl:flex self-center justify-self-end items-center relative xl:absolute xl:w-[30vw] right-0 top-0 bottom-0 bg-secondary">
                <img className="max-w-full" src={surveyMan} alt="" />
                <div className="absolute top-[15%] right-[85%]">
                    <div className="bg-white flex items-center justify-center rounded-full gap-2 w-[1.4in] h-[1in] shadow-[0px_41px_120px_rgba(47,102,244,0.22)] z-10">
                        <div className="bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] rounded-full h-5 w-5" />
                        <div className="bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] rounded-full h-5 w-5" />
                        <div className="bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] rounded-full h-5 w-5" />
                    </div>
                    <img className="absolute top-[70%] left-[70%]" src={triangle} alt="" />
                </div>
            </div>
        </section>
    )
}