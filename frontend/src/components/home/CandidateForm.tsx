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
        try {
            axios.post('/api/candidate/add', JSON.stringify(details), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => setStatus(true))
        }
        catch(err) {
            setStatus(false)
        }
    }
    
    return (
        <section className='padding flex flex-col text-center items-center xl:items-start xl:w-max'>
            <h2 className='font-semibold mb-8 text-3xl'>Zgłoś się do pracy</h2>
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
                {status === false && <span className='text-red-400 font-medium'>Wystąpił błąd</span>}
                {status === true && <span className='text-green-400 font-medium'>Zgłoszenie wysłane!</span>}
                <FilledButton className='mt-4' type='submit'>Wyślij zgłoszenie</FilledButton>
                {status === 'loading' && <Loader className='absolute bottom-0 left-0' />}
            </form>
        </section>
    )
}