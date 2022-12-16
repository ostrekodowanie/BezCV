import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"
import { CandidateProps } from "./Candidate"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { first_name, last_name } = auth.data
    const { refresh } = auth.tokens

    const handleLogout = async () => {
        const resp = await axios.post('/api/logout', refresh, { headers: { 'Content-Type': 'application/json' }})
        if(resp.status === 200) {
            localStorage.removeItem('user')
            dispatch(logout())
        }
    }

    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <h1 className="font-bold text-2xl">{first_name} {last_name}</h1>
            <Favourites />
            <div className="flex flex-wrap items-center gap-6">
                <button className="font-medium py-2 px-5 rounded transition-colors bg-red-400 text-white" onClick={handleLogout}>Wyloguj się</button>
            </div>
        </section>
    )
}

const Favourites = () => {
    const auth = useAppSelector(state => state.login)
    const { id } = auth.data
    const { access } = auth.tokens
    const [favourites, setFavourites] = useState<CandidateProps[]>([])
    
    useEffect(() => {
        axios.get('/api/profile/favourites?u=' + id, { headers: { 'Authorization': 'Bearer ' + access}})
            .then(res => res.data)
            .then(data => setFavourites(data))
    }, [])

    return (
        <div className="flex flex-wrap gap-6">
            {favourites.length > 0 ? favourites.map(cand => <CandidateFavourite {...cand} key={cand.id} />) : <>
                <div className="flex-1 bg-[#f8f8f8] rounded-full min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-full min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-full min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-full min-h-[2in]" />
            </>}
        </div>
    )
}

const CandidateFavourite = ({ first_name, last_name }: CandidateProps) => {
    return (
        <div className='p-6 shadow rounded-3xl'>
            <h3>{first_name} {last_name}</h3>
        </div>
    )
}