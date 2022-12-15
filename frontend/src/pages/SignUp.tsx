import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ChooseAccount from "./signup/ChooseAccount";
import ClientForm from "./signup/ClientForm";
import EmployerForm from "./signup/EmployerForm";
import Verify from "./signup/Verify";

//xl:grid grid-cols-[5fr_4fr] bez justify

export default function SignUp() {
    return (
        <div className="flex flex-col items-center xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Link to='/' className="text-lg absolute top-8 left-36">Powrót</Link>
                <Routes>
                    <Route path='/' element={<StepRoute />} />
                    <Route path='/verify/*' element={<Verify />} />
                </Routes>
            </section>
            {/* <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={main} alt="" />
            </div> */}
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
                return <EmployerForm />
            default:
                return <ChooseAccount setStep={setStep} />
        }
    }

    return (
        <div className="flex flex-col justify-between gap-8">
            <RenderStep />
        </div>
    )
}