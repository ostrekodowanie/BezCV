import axios from "axios"
import { FormEvent, useState } from "react"
import { useLocation } from "react-router"
import FilledButton from "../../components/FilledButton"
import Loader from "../../components/Loader"
import { inputStyles } from "../Contact"

export default function ChangePassword() {
    const location = useLocation()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState<boolean | string | undefined>()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        if(password !== confirmPassword) return setStatus('Hasła się nie zgadzają')
        if(password.length < 6) return setStatus('Hasło musi posiadać co najmniej 6 znaków!')
        let token = location.search.split('=').pop()
        const response = await axios.post('/api/login/reset-password/confirm', JSON.stringify({ token, new_password: password }), { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200) return setStatus(true)
        return setStatus(false)
    }

    return (
        <div className='flex flex-col text-center items-center md:shadow-boxPrimary xl:flex-1 xl:max-w-[7in] bg-white py-[1in] px-[8vw] md:py-10 md:px-16 md:rounded-3xl xl:px-24 xl:py-12 xl:self-start'>
            <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-8 w-full">Zresetuj hasło</h2>
            {status === true ? <h3 className='text-xl my-6'>Hasło zostało zmienione.</h3> : <form className='flex flex-col gap-4 w-full font-medium relative' onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row justify-center max-w-full gap-6 xl:gap-8'>
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="password">Nowe hasło</label>
                        <input className={inputStyles.input} required autoCorrect="off" type='password' name='password' id='password' onChange={e => setPassword(e.target.value)} />
                    </div>                    
                    <div className='relative flex flex-col gap-2 items-start w-full'>
                        <label className='text-sm' htmlFor="confPassword">Powtórz nowe hasło</label>
                        <input className={inputStyles.input} required autoCorrect="off" type='password' name='password' id='confPassword' onChange={e => setConfirmPassword(e.target.value)} />
                    </div>                    
                </div>
                <div className='flex items-center mt-6 gap-6'>
                    <FilledButton type='submit'>Zmień hasło</FilledButton>
                    {status === 'loading' && <Loader />}
                    {status && status !== 'loading' && <span className="text-red-400 font-medium">{status}</span>}
                </div>
            </form>}
        </div>
    )
}