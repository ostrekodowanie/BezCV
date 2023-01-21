import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { cash, role } from "../assets/candidate/candidate"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { purchase } from "../reducers/login"
import { AbilityProps } from "./AdminPanel"

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    slug?: string,
    abilities?: AbilityProps[],
    role?: string,
    salary?: string,
    phone?: string,
    email?: string,
    favourite?: boolean,
    similar_candidates?: NonPercentageAbilitiesCandidateProps[]
}

type Details = Omit<CandidateProps, 'slug' | 'id' | 'favourite'> & { is_purchased: boolean }

export type NonPercentageAbilitiesCandidateProps = Omit<CandidateProps, 'abilities'> & { abilities?: string[] }

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
        role: '',
        salary: '',
        similar_candidates: []
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
        console.log({ slug, id})
        setLoading(prev => ({...prev, page: true}))
        axios.get(`/api/oferty/${slug}-${id}`, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidateDetails(data))
            .finally(() => setLoading(prev => ({...prev, page: false})))
    }, [points, slug, id])
    
    return (
        <section className="padding py-[1in] md:py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen flex flex-col gap-8">
            <div className="bg-white rounded-3xl shadow-primaryBig p-10">
                {loading.page ? <div className="flex items-center gap-4 mb-8">
                    <div className="w-[1in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.6in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                </div> : <div className="mb-8 flex flex-col gap-2">
                    <h2 className="text-primary font-medium">Kandydat</h2>
                    <h1 className="font-bold text-3xl">{candidateDetails.first_name} {candidateDetails.last_name}</h1>
                </div>}
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
                                <h3 className="font-bold">{candidateDetails.salary} zł</h3>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            {loading.page ? <Loader /> : !candidateDetails.is_purchased && 
                <div className="flex items-center gap-4">
                    <button onClick={handlePurchase} className="bg-primary transition-colors text-sm max-w-max font-medium hover:bg-darkPrimary text-white rounded-full flex items-center py-3 px-6">Wykup kontakt za 1 punkt</button>
                    {loading.purchase && <Loader />}    
                </div>
            }
            <div className="flex flex-col gap-8 lg:grid grid-cols-[2fr_5fr]">
                <div className="bg-white rounded-3xl p-10 flex flex-wrap shadow-primaryBig gap-8">
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-xl mb-6">Istotne umiejętności kandydata</h2>
                        <div className="flex flex-col gap-6">
                            {!loading.page ? candidateDetails.abilities?.map(ab => <AbilityRange {...ab} key={ab.name} />) : <>
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
                <div className="bg-white rounded-3xl p-10 flex flex-wrap shadow-primaryBig gap-8">
                    <div className="flex flex-col w-full">
                        <h2 className="font-semibold text-xl mb-6">Ci kandydaci mogą Cię zainteresować</h2>
                        <div className="flex flex-col gap-6 w-full">
                            {!loading.page ? candidateDetails.similar_candidates?.map(cand => <SuggestedCandidate {...cand} key={cand.id} />) : <> 
                                <SuggestedCandidateLoader />
                                <SuggestedCandidateLoader />
                                <SuggestedCandidateLoader />
                                <SuggestedCandidateLoader />
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </section>       
    )
}

const AbilityRange = ({ name, percentage }: AbilityProps) => {
    if(!percentage || percentage < 1) return <></>
    return (
        <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm">{name}</h4>
            <div className="bg-[#2F66F4]/20 rounded-full h-6">
                <div style={{ width: percentage + '%' }} className='relative bg-[linear-gradient(180deg,#2F66F4_-81.35%,#0D9AE9_100%)] rounded-full h-full'>
                    <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[140%] shadow-primarySmall bg-white flex items-center justify-center">
                        <span className="font-bold text-primary right-[120%] top-0 text-sm z-10 absolute">{percentage}%</span>
                        <div className="bg-primary h-[35%] w-[35%] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const SuggestedCandidate = ({ id, first_name, last_name, slug, role, abilities }: NonPercentageAbilitiesCandidateProps) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-[#F8F8F8] rounded-full flex items-center justify-center"><h4 className="font-bold text-xl text-primary">{first_name.charAt(0)}</h4></div>
                <div className="flex flex-col font-bold mr-8 gap-1 w-max">
                    <h4 className="text-sm w-max">{first_name} {last_name}</h4>
                    <h4 className="text-primary text-sm w-max">{role}</h4>
                </div>
                <div className="flex flex-wrap self-start items-center gap-4">
                    {abilities?.map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
                            <h4 className="text-primary text-[0.75rem] font-semibold">{ab}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <Link className="text-primary border-primary rounded-full w-max min-w-max text-sm py-2 px-4 border-[1px] hover:bg-primary hover:text-white transition-colors font-bold" to={`/oferty/${slug}-${id}`}>Pokaż profil</Link>
        </div>
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