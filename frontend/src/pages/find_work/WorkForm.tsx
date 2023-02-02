import { Link } from "react-router-dom"
import { defaultQuestions } from "../../constants/findWork"
import RoleController from "./RoleController"
import CandidateController from "./CandidateController"
import { useState } from "react"

export default function WorkForm() {
    const [step, setStep] = useState<'role' | 'candidate'>('candidate')
    return (
        <section className="padding flex justify-center pt-[.6in] pb-[1.4in] min-h-screen relative">
            <Link className="absolute left-16 top-8" to='/praca'>Powrót</Link>
            <div className="flex flex-col items-center gap-6 max-w-[8in] self-stretch">
                {step === 'role' ? <RoleController /> : <CandidateController setStep={setStep} />}
            </div>
        </section>
    )
}

