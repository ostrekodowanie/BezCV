import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { purchase } from "../reducers/login"

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
    const { access } = auth.tokens
    const [loading, setLoading] = useState(true)
    const [candidateDetails, setCandidateDetails] = useState({
        is_purchased: false,
        email: '',
        phone: ''
    })

    const handlePurchase = async () => {
        if(points < 1) return navigate('/punkty')
        let data = { candidate: id, employer: user_id }
        const resp = await axios.post('/api/oferty/purchase', data)
        if(resp.status === 201) return dispatch(purchase())
    }

    useEffect(() => {
        axios.get(`/api/oferty/${slug}${id}?u=` + user_id, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidateDetails(data))
            .finally(() => setLoading(false))
    }, [])

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