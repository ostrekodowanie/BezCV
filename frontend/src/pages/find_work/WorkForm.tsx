import { Link } from "react-router-dom"
import RoleController from "./RoleController"
import CandidateController from "./CandidateController"
import { createContext, useMemo, useState } from "react"
import { StepContextType } from "../../constants/workForm"

export const StepContext = createContext<StepContextType>(null!)

export default function WorkForm() {
    const [step, setStep] = useState<'role' | 'candidate'>('candidate')

    const contextValue = useMemo(() => ({
        step,
        setStep
    }), [step])

    return (
        <section className="padding flex justify-center pt-[.6in] pb-[1.4in] min-h-screen relative">
            <Link className="absolute left-16 top-8" to='/praca'>Powrót</Link>
            <div className="flex flex-col items-center gap-6 w-full mt-16 sm:mt-0">
                <StepContext.Provider value={contextValue}>
                    {step === 'role' ? <RoleController /> : <CandidateController />}
                </StepContext.Provider>
            </div>
        </section>
    )
}