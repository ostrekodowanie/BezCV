import { Link, Route, Routes } from "react-router-dom";
import Form from "./signup/Form";
import Verify from "./signup/Verify";

//xl:grid grid-cols-[5fr_4fr] bez justify

export default function SignUp() {
    return (
        <div className="flex flex-col items-center xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Link to='/' className="text-lg absolute top-8 left-36">Powrót</Link>
                <Routes>
                    <Route path='/' element={<Form />} />
                    <Route path='/verify/*' element={<Verify />} />
                </Routes>
            </section>
            {/* <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={main} alt="" />
            </div> */}
        </div>
    )
}