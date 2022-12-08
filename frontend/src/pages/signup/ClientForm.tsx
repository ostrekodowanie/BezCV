import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import FilledButton from '../../components/FilledButton'
import { inputStyles } from '../../components/home/Contact'
import Loader from '../../components/Loader'

export default function ClientForm() {
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const [confPassword, setConfPassword] = useState('')
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus({ ok: false, message: 'loading' })
        if(details.password !== confPassword) return setStatus({ok: false, message: "Hasła się nie zgadzają!"})
        if(details.password.length < 8) return setStatus({ok: false, message: "Hasło musi posiadać co najmniej 8 znaków."})
        try {
            axios.post('/api/rejestracja/klient', JSON.stringify({...details, type: 'user'}), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setStatus({
                ok: true,
                message: ''
            }))
        }
        catch(err) {
            console.log(err)
        }
    }
    
    if(status.ok) return <h1 className='text-xl font-semibold'>Email weryfikacyjny <span className='text-primary'>został wysłany!</span></h1>

    return (
        <div className='flex flex-col text-center items-center xl:items-start xl:w-max'>
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-6 w-full xl:text-5xl">Zarejestruj się</h2>
            <p className="text-[#74788D] font-medium mb-16 w-full xl:text-lg">Uzupełnij formularz, aby założyć konto jako użytkownik</p>
            <form className='flex flex-col gap-4 font-medium relative' onSubmit={handleSubmit}>
                <div className='flex flex-col max-w-full sm:grid grid-cols-2 gap-6'>
                    <div className='relative'>
                        <input className={inputStyles.input} required type='text' name='firstName' id='firstName' onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                        <span className={`${details.first_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Imię</span>
                    </div>                    
                    <div className='relative'>
                        <input className={inputStyles.input} required type='text' name='lastName' id='lastName' onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                        <span className={`${details.last_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Nazwisko</span>
                    </div>
                    <div className='relative'>
                        <input className={inputStyles.input} required type='email' name='email' id='email' onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} />
                        <span className={`${details.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                    </div>
                    <div className='relative'>
                        <input className={inputStyles.input} type='tel' name='phone' id='phone' onChange={e => setDetails(prev => { return { ...prev, phone: e.target.value }})} />
                        <span className={`${details.phone ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Numer telefonu</span>
                    </div>
                    <div className='relative min-w-0'>
                        <input className={inputStyles.input} required type='password' name='password' id='password' onChange={e => setDetails(prev => { return { ...prev, password: e.target.value }})} />
                        <span className={`${details.password ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Hasło</span>
                    </div>
                    <div className='relative'>
                        <input className={inputStyles.input} required type='password' name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                        <span className={`${confPassword ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Powtórz hasło</span>
                    </div>
                </div>
                {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                <span className="mt-6 mb-4">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
                <FilledButton className='mx-auto' type='submit'>Zarejestruj</FilledButton>
            </form>
        </div>
    )
}