import axios from "axios"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { descIcon } from "../assets/profile/profile"
import { useAppDispatch, useAppSelector } from "../main"
import { logout } from "../reducers/login"
import { CandidateProps } from "./Candidate"

export default function Profile() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.login)
    const { id, first_name, last_name, image, desc } = auth.data
    const [profilePicture, setProfilePicture] = useState<any>(image ? '/' + image.split('/').splice(3).join('/') : image)
    const { access, refresh } = auth.tokens

    const handleLogout = async () => {
        const resp = await axios.post('/api/logout', refresh, { headers: { 'Content-Type': 'application/json' }})
        if(resp.status === 200) dispatch(logout())
    }

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        formData.append(
            "image",
            // @ts-ignore
            e.target.files[0]
        );
        const resp = await axios.patchForm('/api/user/update/' + id, formData, { headers: { 'Authorization': 'Bearer ' + access }})
        if(resp.status === 200) {
            //@ts-ignore
            setProfilePicture(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <section className="padding py-[1.4in] md:py-[1.8in] 2xl:py-[2.2in] flex flex-col gap-8 xl:grid grid-cols-[6fr_5fr_5fr] grid-rows-[5in_3in]">
            <div className="flex flex-col justify-between gap-6 p-10 shadow-primaryBig rounded-3xl">
                <div className="flex items-center gap-6">
                    <label className="h-24 w-24 cursor-pointer flex items-center justify-center overflow-hidden rounded-full relative bg-[#F6F6F6]" htmlFor="profile-photo">
                        {profilePicture ? <img className="absolute h-full w-full inset-0 object-cover" src={profilePicture} alt='' /> : <span className="text-primary font-bold">{first_name.charAt(0)}</span>}
                        <div className="absolute inset-0 bg-black z-10 transition-opacity opacity-0 hover:opacity-20 duration-300" />
                    </label>
                    <input onChange={handleSubmit} accept="image/png, image/jpeg" className='absolute -z-10 opacity-0' type='file' id="profile-photo" />
                    <div className="flex flex-col gap-2">
                        <h4 className="text-primary font-medium">Pracodawca</h4>
                        <h1 className="font-bold text-3xl">{first_name} {last_name}</h1>
                    </div>
                </div>
                <div className="flex-1 rounded-3xl bg-[#F8F9FB] flex flex-col px-8 py-6 gap-4">
                    <h3 className="font-bold flex items-center"><img className="max-h-[1.4em] mr-3" src={descIcon} alt="" />Informacje</h3>
                    <p className="text-[#4D5058] text-sm font-medium leading-relaxed my-6">{desc}</p>
                </div>
                <button className="font-semibold w-max transition-colors text-negative hover:text-darkNegative" onClick={handleLogout}>Wyloguj się</button>
            </div>
            <Favourites />
            <Purchased />
            <Stats />
        </section>
    )
}

const Favourites = () => {
    const { access } = useAppSelector(state => state.login.tokens)
    const [favourites, setFavourites] = useState<CandidateProps[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get('/api/profile/favourites', { headers: { 'Authorization': 'Bearer ' + access}})
            .then(res => res.data)
            .then(data => setFavourites(data))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex flex-col gap-6 px-6 py-10 shadow-primaryBig overflow-y-scroll rounded-3xl col-[2/3] row-[1/2]">
            <h2 className="font-bold text-2xl ml-6 mb-4">Polubione kontakty</h2>
            <div className="flex flex-col gap-4">
                {loading ? <>
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                </> : favourites.length > 0 ? favourites.map((cand, i) => <CandidateFavourite i={i} setFavourites={setFavourites} {...cand} key={cand.id} />) : <h2>Brak ulubionych!</h2>}
            </div>
        </div>
    )
}

const CandidateFavourite = ({ id, first_name, last_name, slug, i, setFavourites }: CandidateProps & { i: number, setFavourites: Dispatch<SetStateAction<CandidateProps[]>>}) => {
    const { access } = useAppSelector(state => state.login.tokens)

    const handleRemove = async () => {
        let resp = await axios.delete(`/api/profile/favourites/remove/${id}`, {
            headers: { 'Authorization': 'Bearer ' + access }
        })
        if(resp.status === 204) return setFavourites(prev => prev.filter(cand => cand.id !== id))
    }
    
    return (
        <div className={`px-6 py-3 rounded-3xl text-sm flex items-center w-full justify-between ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}`}>
            <h3 className="font-medium">{first_name} {last_name}</h3>
            <div className="flex items-center gap-3">
                <button className="text-negative hover:text-darkNegative transition-colors font-medium" onClick={handleRemove}>Usuń</button>
                <Link className="hover:text-fontPrimary transition-colors font-medium" to={'/oferty/' + slug?.split(' ').join('-') + '-' + id}>Pokaż profil</Link>
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
        <div className="px-6 py-10 shadow-primaryBig flex flex-col gap-6 overflow-y-scroll rounded-3xl row-span-2 col-[3/4]">
            <h2 className="font-bold text-2xl ml-6 mb-4">Zakupione kontakty</h2>
            <div className="flex flex-col gap-2">
                {loading ? <>
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                    <div className="bg-[#f8f8f8] rounded-3xl min-h-[3rem] w-full" />
                </> : purchased.length > 0 ? purchased.map(cand => <CandidatePurchased {...cand} key={cand.id} />) : <h2>Brak zakupionych kontaktów!</h2>}
            </div>
        </div>
    )
}

const CandidatePurchased = ({ id, first_name, last_name, slug, role, abilities }: CandidateProps) => {
    return (
        <Link to={'/oferty/' + slug + '-' + id}  className="flex flex-col gap-6 w-full rounded-3xl px-6 py-3 hover:bg-[#FAFAFA] transition-colors ">
            <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-full flex justify-center items-center bg-[#F6F6F6]">
                    <h4 className="font-bold text-primary">{first_name.charAt(0)}</h4>
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold">{first_name} {last_name}</h3>
                    <h3 className="font-bold text-primary">{role}</h3>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                {abilities?.splice(0, 3).map(ab => (
                    <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
                        <h4 className="text-primary text-sm font-semibold">{ab}</h4>
                    </div>
                ))}
            </div>
        </Link>
    )
}

const Stats = () => {
    const { points } = useAppSelector(state => state.login.data)
    return (
        <div className="p-10 shadow-primaryBig flex flex-col gap-6 rounded-3xl col-span-2 row-[2/3]">
            <h2 className="font-bold text-2xl mb-4">Statystyki</h2>
            <div className="flex flex-col gap-6 md:grid grid-cols-3 h-full">
                <div className="rounded-3xl bg-[#F8F9FB] px-6 py-4 flex flex-col justify-between">
                    <h3 className="font-semibold">Dostępne tokeny</h3>
                    <h4 className="text-5xl font-bold">{points}</h4>
                </div>
                <div className="rounded-3xl bg-[#F8F9FB] px-6 py-4 flex flex-col justify-between">
                    <h3 className="font-semibold">Dostępne tokeny</h3>
                    <h4 className="text-5xl font-bold">{points}</h4>
                </div>
                <div className="rounded-3xl bg-[#F8F9FB] px-6 py-4 flex flex-col justify-between">
                    <h3 className="font-semibold">Dostępne tokeny</h3>
                    <h4 className="text-5xl font-bold">{points}</h4>
                </div>
            </div>
        </div>
    )
}