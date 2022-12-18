import { Route, Routes } from "react-router"
import Form from "./login/Form"
import Recovery from "./login/Recovery"

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    type: string
}

export default function Login() {
    return (
        <section className="md:px-[12vw] xl:px-0 xl:flex justify-center md:pt-[1.5in] min-h-screen bg-[#F8F9F9] md:pb-16">
            <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/odzyskiwanie' element={<Recovery />} />
            </Routes>
        </section>
    )
}