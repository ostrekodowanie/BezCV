import axios from "axios"
import { FormEvent, useState } from "react"
import Loader from "../components/Loader"
import FilledButton from "../components/FilledButton"

export const inputStyles = {
    input: 'peer rounded-lg bg-[#F8F9F9] focus:bg-[#F3F6FE] py-3 px-6 w-full'
}

export default function Contact() {
    const [status, setStatus] = useState<number | string | null>(null)
    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        axios.post('/api/contact', JSON.stringify(details), { headers: { 'Content-Type': 'application/json' }})
            .then(res => setStatus(res.status))
            .catch(() => setStatus(500))
    }

    return (
        <section className="padding py-[1.4in] md:py-[1.8in] xl:py-[2in] max-h-[7in] sm:max-h-[6in] xl:max-h-[5in] relative xl:mt-auto mb-[4in] flex flex-col gap-8 sm:gap-16 xl:flex-row">
            <h2 className="font-semibold text-3xl">Skontaktuj się z nami</h2>
            <div className="bg-white rounded-xl xl:self-start max-w-full flex flex-col gap-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 gap-8 max-w-full font-medium">
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="firstName">*Imię</label>
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => ({ ...prev, first_name: e.target.value }))} type="text" name="firstName" id='firstName' />
                    </div>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="lastName">*Nazwisko</label>
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => ({ ...prev, last_name: e.target.value }))} type="text" name='lastName' id='lastName' />
                    </div>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="email">*Email</label>
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => ({ ...prev, email: e.target.value }))} type="email" name="email" id='email' />
                    </div>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="phone">*Numer telefonu</label>
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => ({ ...prev, phone: e.target.value }))} type="tel" name="phone" id='phone' />
                    </div>
                    <div className="relative flex flex-col gap-2 items-start w-full col-span-2">
                        <label className='text-sm' htmlFor="message">Wiadomość</label>
                        <textarea className={`${inputStyles.input} min-h-[1in]`} onChange={e => setDetails(prev => ({ ...prev, message: e.target.value }))} name="message" id="message"></textarea>
                    </div>
                    <span className="text-[#6B6B6E] font-medium text-sm">* - pole wymagane</span>
                    <div className="col-span-2 flex justify-between mt-2">
                        <FilledButton>Wyślij formularz</FilledButton>
                        {status && status !== 'loading' && <span className={`font-medium ${status === 200 ? 'text-green-400' : 'text-red-400'}`}>{status === 200 ? 'Wiadomość została wysłana!' : 'Wystąpił błąd'}</span>}
                        {status === 'loading' && <Loader />}
                    </div>
                </form>
            </div>
        </section>
    )
}