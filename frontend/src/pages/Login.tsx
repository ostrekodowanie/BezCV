import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import LoginForm from './login/LoginForm'

export interface User {
    first_name: string,
    last_name: string,
    email: string,
    type: string
}

export default function Login() {
    return (
        <div className="flex flex-col items-center xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Link to='/' className="text-xl absolute top-8 left-36">Powrót</Link>
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                </Routes>
            </section>
            {/* <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={loginMain} alt="" />
            </div> */}
        </div>
    )
}