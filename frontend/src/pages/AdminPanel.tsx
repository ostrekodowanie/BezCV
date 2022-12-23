import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { CandidateProps } from "./Candidate"
import { inputStyles } from "./Contact"

export default function AdminPanel() {
    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <div className="flex flex-col gap-6">
                <h2 className="font-bold text-3xl">Niezweryfikowani kandydaci</h2>
                <UnVerified />
            </div>
        </section>
    )
}

const UnVerified = () => {
    const { access } = useAppSelector(state => state.login.tokens)
    const [unVerified, setUnVerified] = useState<CandidateProps[]>([])
    const [status, setStatus] = useState('loading')
    const [data, setData] = useState({ abilities: [], roles: [] })

    useEffect(() => {
        axios.get('/api/candidate/filters')
            .then(res => res.data)
            .then(data => setData(data))
        axios.get('/api/admin/candidates', { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setUnVerified(data))
            .finally(() => setStatus(''))
    }, [])
    
    if(status === 'loading') return <Loader />
    if(unVerified.length === 0) return <h2>Brak niezweryfikowanych kandydatów!</h2>
    return (
        <div className="flex flex-col gap-6">
            {unVerified.map(candidate => <Candidate {...candidate} data={data} setUnVerified={setUnVerified} key={candidate.id} />)}
        </div>
    )
}

interface CandidateVerifyRef extends CandidateProps {
    data: { abilities: string[], roles: string[] },
    setUnVerified: Dispatch<SetStateAction<CandidateProps[]>>
}

interface DetailsProps { 
    abilities: string[],
    role: string,
    salary: string
}

const Candidate = ({ setUnVerified, data, id, ...rest }: CandidateVerifyRef) => {
    const { first_name, last_name, email, phone } = rest
    const listRef = useRef<any>(null!)
    const [list, setList] = useState({ abilities: false, role: false })
    const [details, setDetails] = useState<DetailsProps>({
        abilities: [],
        role: '',
        salary: ''
    })

    const handleSubmit = async (action: 'verify' | 'delete') => {
        const response = await axios.post('/api/admin/candidates/verify', JSON.stringify({
            action,
            id,
            ...(action === 'verify' && { ...details })
        }), { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200) return setUnVerified(prev => prev.filter(cand => cand.id !== id))
    }


    const handleBlur = (e: Event) => {
        if(listRef.current && !listRef.current.contains(e.target)) return setList(prev => ({ ...prev, role: false}))
        return setList(prev => ({ ...prev, role: true }))
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur)
        return () => document.removeEventListener('mousedown', handleBlur)
    }, [listRef])

    return (
        <div className="flex flex-col gap-4 rounded shadow px-10 py-6">
            <h3 className="font-bold text-lg">{first_name} {last_name}</h3>
            <div className="flex items-center gap-6 font-medium">
                <h3>Email: {email}</h3>
                <h3>Numer telefonu: {phone}</h3>
            </div>
            <input className={inputStyles.input} type="text" onChange={e => setDetails(prev => ({ ...prev, salary: e.target.value }))} placeholder='Stawka' />
            <div className="flex flex-wrap items-center gap-4">
                {data.abilities.map(ab => (
                    <label htmlFor={ab + id.toString()} className="flex items-center gap-2 rounded-full shadow py-2 px-6">
                        <input type="checkbox" id={ab + id.toString()} value={ab} onChange={() => setDetails(prev => prev.abilities.includes(ab) ? ({ ...prev, abilities: prev.abilities.filter(item => item !== ab) }) : ({ ...prev, abilities: [...prev.abilities, ab]}))} />
                        <h4>{ab}</h4>
                    </label>
                ))}
            </div>
            <div className="flex items-center justify-between gap-4">
                <div ref={listRef} className="relative">
                    <button className={details.role && 'text-blue-400'}>{details.role ? details.role : 'Wybierz zawód'}</button>
                    {list.role && <ul className="absolute shadow z-10 top-[120%] bg-white rounded overflow-hidden max-h-[5in] overflow-y-scroll">
                        {data.roles.map(role => <li className="min-w-max w-full py-2 px-6 cursor-pointer transition-colors hover:bg-[#F2F2F2]" onClick={() => { setDetails(prev => ({ ...prev, role })); setList(prev => ({ ...prev, role: false }))}} key={role}>{role}</li>)}
                    </ul>}
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm py-2 px-5 rounded transition-colors bg-blue-400 hover:bg-blue-500 text-white" onClick={() => handleSubmit('verify')}>Zweryfikuj</button>
                    <button className="text-sm py-2 px-5 rounded transition-colors bg-red-400 hover:bg-red-500 text-white" onClick={() => handleSubmit('delete')}>Usuń</button>
                </div>
            </div>
        </div>
    )
}