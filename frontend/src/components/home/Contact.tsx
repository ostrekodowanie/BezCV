import axios from "axios"
import { FormEvent, useState } from "react"
import Loader from "../Loader"
import Control from 'react-control-js'

export const inputStyles = {
    input: 'peer rounded-lg py-3 px-6 border-[1px] max-w-full border-[#E4E4E9]',
    placeholder: 'left-6 text-sm py-1 peer-focus:top-0 peer-focus:text-primary transition-all peer-focus:bg-white peer-focus:px-2 pointer-events-none absolute -translate-y-[50%] font-medium text-[#6B6B6E]'
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
        <section className="padding bg-primary py-16 xl:py-28 max-h-[7in] sm:max-h-[6in] xl:max-h-[5in] relative xl:mt-auto mb-[4in] flex flex-col gap-8 sm:gap-16 xl:flex-row xl:justify-between items-center">
            <Control ease='ease-out' opacity={1} onScroll={true} element={
            <h2 className="flex flex-col gap-2 text-white xl:mb-8">
                <span className="font-semibold">Skontaktuj się z nami</span>
                <span className="font-bold text-4xl xl:w-max">za pomocą formularza</span>
            </h2>
            } />
            <div className="bg-white rounded-xl xl:self-start px-6 py-10 sm:p-12 max-w-full flex flex-col gap-6 shadow-[0px_0px_81px_rgba(15,50,235,0.07)]">
                <h3 className="font-bold text-xl mb-2">Masz jakieś pytania?</h3>
                <form onSubmit={handleSubmit} className="flex flex-col sm:grid grid-cols-2 gap-8 max-w-full font-medium">
                    <div className="relative min-w-0">
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => { return { ...prev, first_name: e.target.value }})} type="text" name="firstName" id='firstName' />
                        <span className={`${details.first_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>*Imię</span>
                    </div>
                    <div className="relative min-w-0">
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => { return { ...prev, last_name: e.target.value }})} type="text" name='lastName' id='lastName' />
                        <span className={`${details.last_name ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>*Nazwisko</span>
                    </div>
                    <div className="relative min-w-0">
                        <input className={inputStyles.input} required onChange={e => setDetails(prev => { return { ...prev, email: e.target.value }})} type="email" name="email" id='email' />
                        <span className={`${details.email ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>*Email</span>
                    </div>
                    <div className="relative min-w-0">
                        <input className={inputStyles.input} onChange={e => setDetails(prev => { return { ...prev, phone: e.target.value }})} type="tel" name="phone" id='phone' />
                        <span className={`${details.phone ? 'px-2 bg-white top-0' : 'top-[50%]'} ${inputStyles.placeholder}`}>Numer telefonu</span>
                    </div>
                    <div className="relative min-w-0 col-span-2">
                        <textarea className="peer w-full min-h-[1in] rounded-lg py-3 px-6 border-[1px] border-[#E4E4E9]" required onChange={e => setDetails(prev => { return { ...prev, message: e.target.value }})} name="message" id="message"></textarea>
                        <span className={`${details.message ? 'px-2 bg-white top-0' : 'top-[1.6rem]'} ${inputStyles.placeholder}`}>*Wiadomość</span>
                    </div>
                    <span className="text-[#6B6B6E] font-medium text-sm">* - pole wymagane</span>
                    <div className="col-span-2 flex justify-between mt-2">
                        <button className="bg-font text-sm transition-colors w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-3 px-6">Wyślij formularz</button>
                        {status && status !== 'loading' && <span className={`font-medium ${status === 200 ? 'text-green-400' : 'text-red-400'}`}>{status === 200 ? 'Wiadomość została wysłana!' : 'Wystąpił błąd'}</span>}
                        {status === 'loading' && <Loader />}
                    </div>
                </form>
            </div>
        </section>
    )
}