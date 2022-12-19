import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { purchase } from "../reducers/login"

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    slug?: string,
    abilities?: [],
    role?: string,
    phone?: string,
    email?: string,
    favourite?: boolean
}

type Details = Omit<CandidateProps, 'slug' | 'id' | 'favourite'> & { is_purchased: boolean }

export default function Candidate() {
    const auth = useAppSelector(state => state.login)
    const { id, slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { points } = auth.data
    const user_id = auth.data.id
    const { access, refresh } = auth.tokens
    const [loading, setLoading] = useState({
        page: true,
        purchase: false
    })
    const [candidateDetails, setCandidateDetails] = useState<Details>({
        is_purchased: false,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        abilities: [],
        role: ''
    })

    const handlePurchase = async () => {
        if(points < 1) return navigate('/punkty')
        setLoading(prev => ({...prev, purchase: true}))
        let data = { candidate: id, employer: user_id, refresh }
        const resp = await axios.post('/api/oferty/purchase', data)
        if(resp.status === 201) dispatch(purchase())
        return setLoading(prev => ({...prev, purchase: false}))
    }

    useEffect(() => {
        setLoading(prev => ({...prev, page: true}))
        axios.get(`/api/oferty/${slug}-${id}?u=` + user_id, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidateDetails(data[0]))
            .finally(() => setLoading(prev => ({...prev, page: false})))
    }, [points, slug, id])

    if(loading.page) return <Loader />

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-bold text-3xl">{candidateDetails.first_name} {candidateDetails.last_name}</h1>
            <div className="flex items-center gap-4 font-medium text-lg">
                <h2>{candidateDetails.email}</h2>
                <h2>+48 {candidateDetails.phone}</h2>
            </div>
            <div className="flex flex-wrap gap-4">
                {candidateDetails.abilities?.map(ab => (
                    <div className="flex items-center gap-2 w-max rounded-full shadow py-2 px-6">
                        <h4>{ab}</h4>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-lg">Preferowane stanowisko: <span className="font-bold text-blue-400">{candidateDetails.role}</span></h2>
            </div>
            {!candidateDetails.is_purchased && 
                <div className="flex items-center gap-4">
                    <button onClick={handlePurchase} className="bg-primary transition-colors max-w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-2 px-6">Wykup kontakt za 1 punkt</button>
                    {loading.purchase && <Loader />}    
                </div>
            }
        </div>            
    )
}