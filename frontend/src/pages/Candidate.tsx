import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { cash, role } from "../assets/candidate/candidate"
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
            .then(data => setCandidateDetails(data))
            .finally(() => setLoading(prev => ({...prev, page: false})))
    }, [points, slug, id])
    
    return (
        <section className="padding py-[1in] md:py-[1.4in] 2xl:py-[1.8in] bg-[#F8F8F9] min-h-screen flex flex-col gap-8">
            <div className="bg-white rounded-xl p-10">
                {loading.page ? <div className="flex items-center gap-4 mb-8">
                    <div className="w-[1in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.6in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                </div> : <h1 className="font-bold text-3xl mb-8">{candidateDetails.first_name} {candidateDetails.last_name}</h1>}
                <div className="flex flex-wrap gap-6 xl:flex-nowrap xl:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img src={role} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm font-medium">Email</h4>
                                <h3 className="font-bold">{candidateDetails.email}</h3>
                            </>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img src={role} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm font-medium">Numer telefonu</h4>
                                <h3 className="font-bold">+48 {candidateDetails.phone}</h3>
                            </>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img src={role} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm font-medium">Stanowisko</h4>
                                <h3 className="font-bold">{candidateDetails.role}</h3>
                            </>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img src={cash} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm font-medium">Oczekiwania finansowe</h4>
                                <h3 className="font-bold">4500 - 7000 zł</h3>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            {loading.page ? <Loader /> : !candidateDetails.is_purchased && 
                <div className="flex items-center gap-4">
                    <button onClick={handlePurchase} className="bg-primary transition-colors text-sm max-w-max font-medium hover:bg-darkPrimary text-white rounded-3xl flex items-center py-3 px-6">Wykup kontakt za 1 punkt</button>
                    {loading.purchase && <Loader />}    
                </div>
            }
            <div className="bg-white rounded-xl p-10 flex flex-wrap gap-8">
                <div className="flex flex-col">
                    <h2 className="font-semibold text-xl mb-4">Istotne umiejętności kandydata</h2>
                    <div className="flex flex-wrap gap-4 max-w-[5in]">
                        {!loading.page ? candidateDetails.abilities?.map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-6 text-primary bg-lightPrimary" key={ab}>
                            <h4 className="text-sm font-semibold" key={ab + 'content'}>{ab}</h4>
                        </div>
                        )) : <>
                            <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                            <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                            <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                            <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                            <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                            <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
                        </>}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-10 flex flex-wrap gap-8">
                <div className="flex flex-col w-full">
                    <h2 className="font-semibold text-xl mb-4">Ci kandydaci mogą Cię zainteresować</h2>
                    <div className="flex flex-col gap-4 w-full">
                        {!loading.page ? candidateDetails.abilities?.map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-6 text-primary bg-lightPrimary">
                            <h4 className="text-sm font-semibold">{ab}</h4>
                        </div>
                        )) : <> 
                            <SuggestedCandidateLoader />
                            <SuggestedCandidateLoader />
                            <SuggestedCandidateLoader />
                            <SuggestedCandidateLoader />
                        </>}
                    </div>
                </div>
            </div>
        </section>       
    )
}

const SuggestedCandidateLoader = () => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center" />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <div className="w-[.8in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                        <div className="w-[1.2in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    </div>
                    <div className="w-[.6in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                </div>
            </div>
            <div className="w-[1in] h-[2em] rounded-full bg-[#f8f8f8]" />
        </div>
    )
}