import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import Loader from "../components/Loader"
import { StationProps } from "./SKP"


export default function AdminPanel() {
    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <div className="flex flex-col gap-6">
                <h2 className="font-bold text-xl">Niezweryfikowane stacje</h2>
                <UnVerified />
            </div>
        </section>
    )
}

const UnVerified = () => {
    const [unVerified, setUnVerified] = useState<StationProps[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [action, setAction] = useState<'verify' | 'delete' | null>(null)
    const [status, setStatus] = useState('')

    useEffect(() => {
        axios.get('/api/skp/verify')
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
            {unVerified.map(station => <Station {...station} setSelected={setSelected} key={station.name} />)}
            {unVerified.length === 0 && selected.length === 0 && <h2>Brak niezweryfikowanych stacji!</h2>}
        </form>
    )
}

interface StationVerifyRef extends StationProps {
    setSelected: any
}

const Station = (props: StationVerifyRef) => {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(checked) props.setSelected((prev: number[]) => [...prev, props.id])
        if(!checked) props.setSelected((prev: number[]) => prev.filter(sel => sel !== props.id))
    }, [checked])

    return (
        <label htmlFor={props.name} className="flex items-center justify-between gap-4 rounded p-4 shadow">
            <div className="flex items-center gap-4">
                <img src={`/images/skp/${props.image.split('/').pop()}`} alt="" />
                <h3>{props.name}</h3>
            </div>
            <input type='checkbox' onChange={() => setChecked(prev => !prev)} checked={checked} id={props.name} />
        </label>
    )
}