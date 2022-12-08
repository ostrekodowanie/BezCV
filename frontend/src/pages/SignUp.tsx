import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { main } from "../assets/signup";
import ChooseAccount from "./signup/ChooseAccount";
import ClientForm from "./signup/ClientForm";
import StationForm from "./signup/StationForm";
import Verify from "./signup/Verify";

export default function SignUp() {
    return (
        <div className="flex flex-col xl:grid grid-cols-[5fr_4fr] xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Routes>
                    <Route path='/' element={<StepRoute />} />
                    <Route path='/verify/*' element={<Verify />} />
                </Routes>
            </section>
            <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={main} alt="" />
            </div>
        </div>
    )
}


const steps = [
    'Wybierz typ konta',
    'Wypełnij formularz'
]

const StepRoute = () => {
    const [step, setStep] = useState<number>(0)

    const RenderStep = () => {
        switch(step) {
            case 1:
                return <ClientForm />
            case 2:
                return <StationForm />
            default:
                return <ChooseAccount setStep={setStep} />
        }
    }

    return (
        <div className="flex flex-col justify-between gap-8">
            <RenderStep />
            <div className="grid grid-cols-2 bg-[#F6F5F5] w-full max-w-[5in] h-[4px] mx-auto">
                <div onClick={() => setStep(0)} className={`relative cursor-pointer flex h-full px-5 transition-colors rounded-xl justify-center ${step === 0 ? 'text-primary bg-primary' : 'text-[#74788D]'}`}>
                    <h4 className="font-medium w-max absolute -top-8">{steps[0]}</h4>
                </div>
                <div className={`relative flex h-full px-5 transition-colors rounded-xl justify-center ${step > 0 ? 'text-primary bg-primary' : 'text-[#74788D]'}`}>
                    <h4 className="font-medium w-max absolute -top-8">{steps[1]}</h4>
                </div>
            </div>
        </div>
    )
}