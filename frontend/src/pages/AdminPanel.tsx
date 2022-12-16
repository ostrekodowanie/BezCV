import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { CandidateProps } from "./Candidate"

export default function AdminPanel() {
    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <div className="flex flex-col gap-6">
                <h2 className="font-bold text-xl">Niezweryfikowani kandydaci</h2>
                <UnVerified />
            </div>
        </section>
    )
}

const UnVerified = () => {
    const { access } = useAppSelector(state => state.login.tokens)
    const [unVerified, setUnVerified] = useState<CandidateProps[]>([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        axios.get('/api/admin/candidates', { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setUnVerified(data))
            .finally(() => setStatus(''))
    }, [])
    
    if(status === 'loading') return <Loader />
    if(unVerified.length === 0) return <h2>Brak niezweryfikowanych kandydatów!</h2>
    return (
        <div className="flex">
            {unVerified.map(candidate => <Candidate {...candidate} setUnVerified={setUnVerified} key={candidate.id} />)}
        </div>
    )
}

interface CandidateVerifyRef extends CandidateProps {
    setUnVerified: Dispatch<SetStateAction<CandidateProps[]>>
}

const Candidate = ({ setUnVerified, id, ...rest }: CandidateVerifyRef) => {
    const { first_name, last_name, email, phone } = rest
    const [details, setDetails] = useState({
        first_name,
        last_name,
        email,
        phone,
        abilities: []
    })

    const handleSubmit = async (action: 'verify' | 'delete') => {
        const response = await axios.post('/api/admin/candidates/verify', JSON.stringify({
            action,
            id,
            ...(action === 'verify' && { ...details })
        }), { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200) return setUnVerified(prev => prev.filter(cand => cand.id !== id))
    }

    return (
        <div className="flex items-center justify-between gap-4 rounded p-4 shadow">
            <h3>{first_name} {last_name}</h3>
            <div className="flex items-center gap-4">
                <button className="text-sm py-2 px-5 rounded transition-colors bg-blue-400 hover:bg-blue-500 text-white" onClick={() => handleSubmit('verify')}>Zweryfikuj</button>
                <button className="text-sm py-2 px-5 rounded transition-colors bg-red-400 hover:bg-red-500 text-white" onClick={() => handleSubmit('delete')}>Usuń</button>
            </div>
        </div>
    )
}