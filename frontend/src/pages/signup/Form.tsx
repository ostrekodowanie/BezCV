import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import FilledButton from '../../components/FilledButton'
import { inputStyles } from '../Contact'
import Loader from '../../components/Loader'

export default function Form() {
    const [confPassword, setConfPassword] = useState('')
    const [status, setStatus] = useState('')
    const [employerDetails, setEmployerDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        nip: '',
        password: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading')
        try {
            axios.post('/api/signup', JSON.stringify(employerDetails), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setStatus('Email weryfikacyjny został wysłany!'))
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col text-center items-center xl:w-max'>
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-6 w-full xl:text-5xl">Zarejestruj się</h2>
            <form className='flex flex-col gap-4 font-medium relative' onSubmit={handleSubmit}>
            <div className='flex flex-col max-w-full sm:grid grid-cols-2 gap-6'>
                <div className='relative'>
                    <input className={inputStyles.input} required type='text' name='firstName' id='firstName' onChange={e => setEmployerDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                    <span className={`${employerDetails.first_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Imię</span>
                </div>                    
                <div className='relative'>
                    <input className={inputStyles.input} required type='text' name='lastName' id='lastName' onChange={e => setEmployerDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                    <span className={`${employerDetails.last_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Nazwisko</span>
                </div>
                <div className='relative'>
                    <input className={inputStyles.input} required type='email' name='email' id='email' onChange={e => setEmployerDetails(prev => { return { ...prev, email: e.target.value }})} />
                    <span className={`${employerDetails.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Email</span>
                </div>
                <div className='relative'>
                    <input className={inputStyles.input} required type='tel' name='nip' id='nip' onChange={e => setEmployerDetails(prev => { return { ...prev, nip: e.target.value }})} />
                    <span className={`${employerDetails.nip ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>NIP</span>
                </div>
                <div className='relative min-w-0'>
                    <input className={inputStyles.input} required type='password' name='password' id='password' onChange={e => setEmployerDetails(prev => { return { ...prev, password: e.target.value }})} />
                    <span className={`${employerDetails.password ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Hasło</span>
                </div>
                <div className='relative'>
                    <input className={inputStyles.input} required type='password' name='confPassword' id='confPassword' onChange={e => setConfPassword(e.target.value)} />
                    <span className={`${confPassword ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Powtórz hasło</span>
                </div>
            </div>
            {status && status !== 'loading' && <span className='text-red-400 font-medium'>{status}</span>}
            {status === 'loading' && <Loader className='absolute bottom-0 left-0' />}
            <span className="mt-6 mb-4">Już posiadasz konto? <Link className="text-primary font-semibold" to='/logowanie'>Zaloguj się</Link></span>
            <FilledButton className='mx-auto' type='submit'>Dalej</FilledButton>
        </form>
        </div>
    )
}