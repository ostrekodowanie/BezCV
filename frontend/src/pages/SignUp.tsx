import { Route, Routes } from "react-router-dom";
import Form from "./signup/Form";
import Verify from "./signup/Verify";

export default function SignUp() {
    return (
        <section className="md:px-[12vw] xl:px-0 xl:flex justify-center md:pt-[1.5in] min-h-[120vh] bg-[#FCFCFC] md:pb-16">
            <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/verify/*' element={<Verify />} />
            </Routes>
        </section>
    )
}