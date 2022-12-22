import axios from 'axios'
import { FormEvent, useState } from 'react'
import FilledButton from '../FilledButton'
import { inputStyles } from '../../pages/Contact'
import Loader from '../Loader'

export default function CandidateForm() {
    const [status, setStatus] = useState<'loading' | boolean | undefined>(undefined)
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading')
        axios.post('/api/candidate/add', JSON.stringify(details), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => setStatus(true))
        .catch(err => setStatus(err.response.data ? err.response.data : 'Wystąpił błąd!'))
    }
    
    return (
        <section className='padding py-[1in] md:py-[1.4in] 2xl:py-[1.8in] flex flex-col text-center items-center xl:items-start xl:w-max'>
            <h2 className='font-semibold mb-8 text-3xl'>Zgłoś się do pracy</h2>
            <form className='flex flex-col gap-4 font-medium relative' onSubmit={handleSubmit}>
                <div className='flex flex-col max-w-full sm:grid grid-cols-2 gap-6'>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="firstName">Imię</label>
                        <input className={inputStyles.input} required type='text' name='firstName' id='firstName' onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} />
                    </div>                    
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="lastName">Nazwisko</label>
                        <input className={inputStyles.input} required type='text' name='lastName' id='lastName' onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} />
                    </div>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="email">Email</label>
                        <input className={inputStyles.input} required type='email' name='email' id='email' onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} />
                    </div>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="phone">Numer telefonu</label>
                        <input className={inputStyles.input} type='tel' name='phone' id='phone' onChange={e => setDetails(prev => { return { ...prev, phone: e.target.value }})} />
                    </div>
                </div>
                <div className='flex items-center gap-6 mt-4'>
                    <FilledButton type='submit'>Wyślij zgłoszenie</FilledButton>
                    {status === 'loading' ? <Loader /> : status && status !== true && <span className='text-red-400 font-medium'>{status}</span>}
                    {status === true && <span className='text-green-400 font-medium'>Zgłoszenie wysłane!</span>}
                </div>
            </form>
        </section>
    )
}