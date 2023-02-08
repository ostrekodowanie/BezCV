import { Link } from "react-router-dom"
import RoleController from "./RoleController"
import CandidateController from "./CandidateController"
import { createContext, useMemo, useState } from "react"
import { StepContextType } from "../../constants/workForm"
import { surveyMan, triangle } from "../../assets/survey/survey"

export const StepContext = createContext<StepContextType>(null!)

export default function Survey() {
    const [step, setStep] = useState<'role' | 'candidate'>('candidate')

    const contextValue = useMemo(() => ({
        step,
        setStep
    }), [step])

    return (
        <section className="padding flex flex-col gap-12 justify-center pt-[.6in] pb-[1.4in] min-h-screen relative xl:grid grid-cols-[1fr_1fr]">
            <Link className="absolute left-16 top-8" to='/praca'>Powrót</Link>
            <div className="flex flex-col items-center gap-6 w-full mt-16 sm:mt-0">
                <StepContext.Provider value={contextValue}>
                    {step === 'role' && <RoleController />}
                    {step === 'candidate' && <CandidateController />}
                </StepContext.Provider>
            </div>
            <div className="self-center justify-self-end relative">
                <img src={surveyMan} alt="" />
                <div className="absolute top-6 right-[85%]">
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