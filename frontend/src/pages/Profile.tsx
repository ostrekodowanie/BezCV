import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"
import { CandidateProps } from "./Candidate"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { first_name, last_name, is_staff } = auth.data
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
            <h1 className="font-bold text-2xl mb-8">{first_name} {last_name}</h1>
            <h2 className="font-bold text-3xl mb-4">Ulubieni</h2>
            <Favourites />
            <div className="flex flex-wrap items-center gap-6">
                {is_staff && <Link className="font-medium py-2 px-5 rounded transition-colors bg-blue-400 hover:bg-blue-500 text-white" to='/administracja'>Panel administracyjny</Link>}
                <button className="font-medium py-2 px-5 rounded transition-colors bg-red-400 hover:bg-red-500 text-white" onClick={handleLogout}>Wyloguj się</button>
            </div>
        </section>
    )
}

const Favourites = () => {
    const auth = useAppSelector(state => state.login)
    const { id } = auth.data
    const { access } = auth.tokens
    const [favourites, setFavourites] = useState<CandidateProps[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get('/api/profile/favourites?u=' + id, { headers: { 'Authorization': 'Bearer ' + access}})
            .then(res => res.data)
            .then(data => setFavourites(data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex flex-wrap gap-6 my-8">
            {loading ? <>
                <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
            </> : favourites.length > 0 ? favourites.map(cand => <CandidateFavourite setFavourites={setFavourites} {...cand} key={cand.id} />) : <h2>Brak ulubionych!</h2>}
        </div>
    )
}

const CandidateFavourite = ({ id, first_name, last_name, slug, setFavourites }: CandidateProps & { setFavourites: Dispatch<SetStateAction<CandidateProps[]>>}) => {
    const user_id = useAppSelector(state => state.login.data.id)

    const handleRemove = async () => {
        let resp = await axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`)
        if(resp.status === 204) return setFavourites(prev => prev.filter(cand => cand.id !== id))
    }
    
    return (
        <div className='p-6 shadow rounded-3xl'>
            <h3>{first_name} {last_name}</h3>
            <div className="flex items-center justify-between mt-4">
                <Link className="text-blue-400 font-medium" to={'/oferty/' + slug + id}>Sprawdź</Link>
                <button className="text-red-400 font-medium" onClick={handleRemove}>Usuń</button>
            </div>
        </div>
    )
}