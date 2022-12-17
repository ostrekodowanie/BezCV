import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { login, purchase } from "../reducers/login"
import getUserInfo from "../utils/getUserInfo"
import { User } from "./Login"

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: [],
    phone?: string,
    email?: string,
    slug?: string,
    favourite?: boolean
}

export default function Candidate({ id, first_name, last_name, slug }: CandidateProps) {
    const auth = useAppSelector(state => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { points } = auth.data
    const user_id = auth.data.id
    const { access, refresh } = auth.tokens
    const [loading, setLoading] = useState(true)
    const [candidateDetails, setCandidateDetails] = useState({
        is_purchased: false,
        email: '',
        phone: ''
    })

    const handlePurchase = async () => {
        if(points < 1) return navigate('/punkty')
        let data = { candidate: id, employer: user_id, refresh }
        const resp = await axios.post('/api/oferty/purchase', data)
        if(resp.status === 200) localStorage.setItem('user', JSON.stringify(resp.data))
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/oferty/${slug}${id}?u=` + user_id, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidateDetails(data))
            .finally(() => setLoading(false))
    }, [points])

    if(loading) return <Loader />

    return (
        <div className="flex flex-col gap-6">
            <h1>{first_name} {last_name}</h1>
            <div className="flex items-center gap-4">
                <h2>{candidateDetails.email ? candidateDetails.email : first_name.charAt(0).toLowerCase() + '******@*****.***'}</h2>
                <h2>{candidateDetails.phone ? candidateDetails.phone : '+48 *** *** ***'}</h2>
            </div>
            {!candidateDetails.is_purchased && <button onClick={handlePurchase} className="bg-primary transition-colors max-w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-2 px-6">Wykup kontakt za 1 punkt</button>}
        </div>            
    )
}