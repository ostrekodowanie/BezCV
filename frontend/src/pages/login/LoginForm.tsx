import axios from "axios"
import jwtDecode from "jwt-decode"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FilledButton from "../../components/FilledButton"
import { inputStyles } from "../../components/home/Contact"
import Loader from "../../components/Loader"
import { useAppDispatch } from "../../main"
import { login } from "../../reducers/login"
import { User } from "../Login"

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus({
            ok: false,
            message: 'loading'
        })
        try {
            axios.post('/api/logowanie', JSON.stringify(credentials), {headers: {'Content-Type': 'application/json'}})
            .then(res => res.data)
            .then(data => {
                let user: User = jwtDecode(data.access)
                localStorage.setItem('login', JSON.stringify(data))
                dispatch(login({
                    data: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        type: user.type
                    },
                    tokens: { ...data }
                }))
            })
            .then(() => navigate('/profil'))
        }
        catch(err) {
           setStatus({
            ok: false,
            message: 'Wystąpił błąd'
           })
        }
    }

    return (
        <div className='flex flex-col text-center items-center xl:items-start xl:w-max'>
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-6 w-full xl:text-5xl">Zaloguj się</h2>
            <p className="text-[#74788D] font-medium mb-16 w-full xl:text-lg">Uzupełnij formularz, aby zalogować się do swojego konta</p>
            <form className='flex flex-col gap-4 w-full font-medium relative' onSubmit={handleSubmit}>
                <div className='flex flex-col items-center max-w-full gap-6'>
                    <div className='relative max-w-max w-full'>
                        <input className={inputStyles.input} required autoCorrect="off" type='text' name='email' id='email' onChange={e => setCredentials(prev => { return { ...prev, email: e.target.value }})} />
                        <span className={`${credentials.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                    </div>                    
                    <div className='relative max-w-max w-full'>
                        <input className={inputStyles.input} required autoComplete="off" type='password' name='password' id='password' onChange={e => setCredentials(prev => { return { ...prev, password: e.target.value }})} />
                        <span className={`${credentials.password ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Password</span>
                    </div>
                </div>
                {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                <span className="mt-6 mb-4">Nie posiadasz konta? <Link className="text-primary font-semibold" to='/rejestracja'>Zarejestruj się</Link></span>
                <FilledButton className='mx-auto' type='submit'>Zaloguj</FilledButton>
            </form>
        </div>
    )
}