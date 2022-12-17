import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import FilledButton from '../components/FilledButton'
import { inputStyles } from './Contact'
import Loader from '../components/Loader'
import { useAppDispatch } from '../main'
import { login, logout } from '../reducers/login'
import getUserInfo from '../utils/getUserInfo'

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    type: string
}

export default function Login() {
    return (
        <div className="flex flex-col items-center xl:min-h-screen">
            <section className="px-[8vw] md:px-[12vw] xl:px-0 xl:flex justify-center pt-[1.4in] xl:pt-[2in] pb-16">
                <Link to='/' className="text-lg absolute top-8 left-36">Powrót</Link>
                <Form />
            </section>
            {/* <div className="min-w-full xl:flex items-center py-12 bg-[linear-gradient(134.13deg,rgba(239,242,254,0.55)_-25.82%,rgba(105,_127,_243,_0.473)_176.38%)]">
                <img className="max-w-[80%] mx-auto" src={loginMain} alt="" />
            </div> */}
        </div>
    )
}

const Form = () => {
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
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus({
            ok: false,
            message: 'loading'
        })
        try {
            const response = await axios.post('/api/login', JSON.stringify(credentials), {headers: {'Content-Type': 'application/json'}})
            if(response.status === 200) {
                let tokens = response.data
                let user: User = jwtDecode(tokens.access)
                localStorage.setItem('user', JSON.stringify(tokens))
                const userInfo = await getUserInfo(user.id, tokens.access)
                if(userInfo) {
                    dispatch(login({
                        data: { ...userInfo, id: user.id },
                        tokens
                    }))
                    return navigate('/profil')
                }
            }
            localStorage.removeItem('user')
            return dispatch(logout())
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
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-8 w-full xl:text-5xl">Zaloguj się</h2>
            <form className='flex flex-col gap-4 w-full font-medium relative' onSubmit={handleSubmit}>
                <div className='flex flex-col items-center max-w-full gap-6'>
                    <div className='relative max-w-max w-full'>
                        <input className={inputStyles.input} required autoCorrect="off" type='text' name='email' id='email' onChange={e => setCredentials(prev => { return { ...prev, email: e.target.value }})} />
                        <span className={`${credentials.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                    </div>                    
                    <div className='relative max-w-max w-full'>
                        <input className={inputStyles.input} required autoComplete="off" type='password' name='password' id='password' onChange={e => setCredentials(prev => { return { ...prev, password: e.target.value }})} />
                        <span className={`${credentials.password ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Hasło</span>
                    </div>
                </div>
                {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                <span className="mt-6 mb-4">Nie posiadasz konta? <Link className="text-primary font-medium" to='/rejestracja'>Zarejestruj się</Link></span>
                <FilledButton className='mx-auto' type='submit'>Zaloguj</FilledButton>
            </form>
        </div>
    )
}