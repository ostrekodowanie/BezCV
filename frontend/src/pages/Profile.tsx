import axios from "axios"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"
import { CandidateProps } from "./Candidate"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { id, first_name, last_name, is_staff, image, desc } = auth.data
    const [profilePicture, setProfilePicture] = useState<any>(image)
    const [status, setStatus] = useState<any>()
    const { access, refresh } = auth.tokens

    const handleLogout = async () => {
        const resp = await axios.post('/api/logout', refresh, { headers: { 'Content-Type': 'application/json' }})
        if(resp.status === 200) {
            localStorage.removeItem('user')
            dispatch(logout())
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append(
            "image",
            profilePicture
        );
        const resp = await axios.patchForm('/api/user/update' + id, formData, { headers: { 'Authorization': 'Bearer ' + access }})
        if(resp.status === 200) {
            setStatus(true)
        }
    }

    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in]">
            <div className="flex flex-col mb-4">
                <label className="h-24 w-24 cursor-pointer overflow-hidden block rounded-full relative bg-[#F6F6F6]" htmlFor="profile-photo">
                    <img className="absolute h-full w-full inset-0 object-cover" src={profilePicture} alt='' />
                </label>
                {/* @ts-ignore */}
                <input onChange={e => setProfilePicture(URL.createObjectURL(e.target.files[0]))} accept="image/png, image/jpeg" className='absolute -z-10 opacity-0' type='file' id="profile-photo" />
            </div>
            <h1 className="font-bold text-2xl">{first_name} {last_name}</h1>
            <p className="text-[rgba(23,26,35,0.5)] text-sm font-medium leading-relaxed my-6">{desc}</p>
            <button className="font-medium py-2 px-5 rounded transition-colors bg-green-400 hover:bg-green-500 text-white mb-6" onClick={handleSubmit}>Zapisz dane</button>
            <div className="flex flex-wrap items-center gap-6">
                {is_staff && <Link className="font-medium py-2 px-5 rounded transition-colors bg-primary hover:bg-darkPrimary text-white" to='/administracja'>Panel administracyjny</Link>}
                <button className="font-medium py-2 px-5 rounded transition-colors bg-red-400 hover:bg-red-500 text-white" onClick={handleLogout}>Wyloguj się</button>
            </div>
            <Favourites />
            <Purchased />
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
        <div className="my-16 flex flex-col gap-6">
            <h2 className="font-bold text-3xl mb-4">Ulubieni</h2>
            <div className="flex flex-wrap gap-6">
                {loading ? <>
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                </> : favourites.length > 0 ? favourites.map(cand => <CandidateFavourite setFavourites={setFavourites} {...cand} key={cand.id} />) : <h2>Brak ulubionych!</h2>}
            </div>
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
            <h3 className="text-lg font-medium">{first_name} {last_name}</h3>
            <div className="flex items-center justify-between mt-2">
                <Link className="text-blue-400 font-medium" to={'/oferty/' + slug?.split(' ').join('-') + '-' + id}>Sprawdź</Link>
                <button className="text-red-400 font-medium" onClick={handleRemove}>Usuń</button>
            </div>
        </div>
    )
}

const Purchased = () => {
    const [purchased, setPurchased] = useState<CandidateProps[]>([])
    const [loading, setLoading] = useState(true)
    const auth = useAppSelector(state => state.login)
    const { id } = auth.data
    const { access } = auth.tokens

    useEffect(() => {
        axios.get('/api/profile/candidates?u=' + id, { headers: { 'Authorization': 'Bearer ' + access}})
            .then(res => res.data)
            .then(data => setPurchased(data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="my-16 flex flex-col gap-6">
            <h2 className="font-bold text-3xl mb-4">Zakupione kontakty</h2>
            <div className="flex flex-wrap gap-6">
                {loading ? <>
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                    <div className="flex-1 bg-[#f8f8f8] rounded-3xl min-h-[2in]" />
                </> : purchased.length > 0 ? purchased.map(cand => <CandidatePurchased {...cand} key={cand.id} />) : <h2>Brak zakupionych kontaktów!</h2>}
            </div>
        </div>
    )
}

const CandidatePurchased = ({ id, first_name, last_name, slug, email, phone }: CandidateProps) => {
    return (
        <div className='p-6 shadow rounded-3xl'>
            <h3 className="text-lg font-medium">{first_name} {last_name}</h3>
            <div className="my-2">
                <h4>{email}</h4>
                <h4>+48 {phone}</h4>
            </div>
            <Link className="text-blue-400 font-medium" to={'/oferty/' + slug?.split(' ').join('-') + '-' + id}>Wyświetl profil</Link>
        </div>
    )
}