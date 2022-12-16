import axios from "axios"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import Loader from "../components/Loader"
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
    const [unVerified, setUnVerified] = useState<CandidateProps[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [action, setAction] = useState<'verify' | 'delete' | null>(null)
    const [status, setStatus] = useState('')

    useEffect(() => {
        axios.get('/api/ca/verify')
            .then(res => res.data)
            .then(data => setUnVerified(data))
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading')
        const response = await axios.post('/api/skp/verify/action', JSON.stringify({
            data: selected,
            action: action
        }), { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200) {
            selected.forEach(id => setUnVerified(prev => prev.filter(item => item.id !== id)))
            return setStatus('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <h3 className="font-bold ml-4">Wybierz akcję:</h3>
                <button onClick={() => setAction('verify')} className="py-2 px-5 rounded bg-blue-400 text-white">Zweryfikuj</button>
                <button onClick={() => setAction('delete')} className="py-2 px-5 rounded bg-red-400 text-white">Usuń</button>
                {status === 'loading' && <Loader />}
            </div>
            {(unVerified.length > 0 && selected.length === 0) ? unVerified.map(candidate => <Candidate {...candidate} setSelected={setSelected} key={candidate.id} />) : <h2>Brak niezweryfikowanych stacji!</h2>}
        </form>
    )
}

interface CandidateVerifyRef extends CandidateProps {
    setSelected: Dispatch<SetStateAction<number[]>>
}

const Candidate = ({ id, first_name, last_name, slug, setSelected}: CandidateVerifyRef) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(checked) setSelected(prev => [...prev, id])
        if(!checked) setSelected(prev => prev.filter(sel => sel !== id))
    }, [checked])

    return (
        <label htmlFor={slug} className="flex items-center justify-between gap-4 rounded p-4 shadow">
            <h3>{first_name} {last_name}</h3>
            <input type='checkbox' onChange={() => setChecked(prev => !prev)} checked={checked} id={slug} />
        </label>
    )
}