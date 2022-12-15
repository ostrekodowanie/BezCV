import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import FilledButton from '../FilledButton'
import { inputStyles } from '../../pages/Contact'
import Loader from '../Loader'

export default function ClientForm() {
    const [status, setStatus] = useState({
        ok: false,
        message: ''
    })
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus({ ok: false, message: 'loading' })
        try {
            axios.post('/api/signup', JSON.stringify(details), {
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
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-8 w-full xl:text-5xl">Zarejestruj się</h2>
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
                </div>
                {!status.ok && status.message && status.message !== 'loading' && <span className='text-red-400 font-medium'>{status.message}</span>}
                {status.message === 'loading' && <Loader className='absolute bottom-0 left-0' />}
                <span className="mt-6 mb-4">Już posiadasz konto? <Link className="text-primary font-medium" to='/logowanie'>Zaloguj się</Link></span>
                <FilledButton className='mx-auto' type='submit'>Zarejestruj</FilledButton>
            </form>
        </div>
    )
}