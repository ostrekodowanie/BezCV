import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { cashIcon, emailIcon, percentageTriangle, phoneIcon, role } from "../assets/candidate/candidate"
import Loader from "../components/Loader"
import { useAppSelector } from "../main"
import { purchase } from "../reducers/login"

export interface AbilityProps {
    name: string,
    percentage: number
}

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: AbilityProps[],
    profession?: string,
    salary_expectation?: string,
    phone?: string,
    email?: string,
    favourite?: boolean,
    similar_candidates?: CandidateProps[]
}

type Details = Omit<CandidateProps, | 'id' | 'favourite'> & { is_purchased: boolean }

export type NonPercentageAbilitiesCandidateProps = Omit<CandidateProps, 'abilities'> & {
    abilities: string[]
}

export default function Candidate() {
    const auth = useAppSelector(state => state.login)
    const { id } = useParams()
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
        profession: '',
        salary_expectation: '',
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
        setLoading(prev => ({...prev, page: true}))
        axios.get(`/api/oferty/${id}`, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidateDetails(data))
            .finally(() => setLoading(prev => ({...prev, page: false})))
    }, [points, id])
    
    return (
        <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[18vw] py-[1in] md:py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen flex flex-col gap-8">
            <div className="bg-white sm:rounded-3xl shadow-primaryBig px-[8vw] py-10 sm:p-10">
                {loading.page ? <div className="flex items-center gap-4 mb-8">
                    <div className="w-[1in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                    <div className="w-[1.6in] h-[2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                </div> : <div className="mb-8 flex flex-col gap-2">
                    <h2 className="text-primary">Kandydat</h2>
                    <h1 className="font-medium text-xl xl:text-2xl">{candidateDetails.first_name} {candidateDetails.last_name}</h1>
                </div>}
                <div className="flex flex-wrap gap-6 xl:flex-nowrap xl:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img className="max-w-[60%] max-h-[60%]" src={emailIcon} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm">Email</h4>
                                <h3 className="font-medium text-sm">{candidateDetails.email}</h3>
                            </>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img className="max-w-[60%] max-h-[60%]" src={phoneIcon} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm">Numer telefonu</h4>
                                <h3 className="font-medium text-sm">+48 {candidateDetails.phone}</h3>
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
                                <h4 className="text-sm">Stanowisko</h4>
                                <h3 className="font-medium text-sm">{candidateDetails.profession}</h3>
                            </>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center"><img src={cashIcon} alt="" /></div>
                        <div className="flex flex-col gap-1">
                            {loading.page ? <>
                                <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                                <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
                            </> : <>
                                <h4 className="text-sm">Oczekiwania finansowe</h4>
                                <h3 className="font-medium text-sm">{candidateDetails.salary_expectation} zł</h3>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            {loading.page ? <div className="ml-[8vw] sm:ml-0"><Loader /></div> : !candidateDetails.is_purchased && 
                <div className="flex items-center gap-4 ml-[8vw] sm:ml-0">
                    <button onClick={handlePurchase} className="bg-primary transition-colors text-sm max-w-max font-medium hover:bg-darkPrimary text-white rounded-full flex items-center py-3 px-6">Wykup kontakt za 1 punkt</button>
                    {loading.purchase && <Loader />}    
                </div>
            }
            <div className="flex flex-col gap-8 lg:grid grid-cols-[1fr_2fr]">
                <div className="bg-white sm:rounded-3xl px-[8vw] py-10 sm:p-10 shadow-primaryBig gap-8">
                    <div className="flex flex-col w-full">
                        <h2 className="font-medium text-xl mb-6">Istotne umiejętności kandydata</h2>
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
                <div className="bg-white sm:rounded-3xl px-[8vw] py-10 sm:p-10 flex flex-wrap shadow-primaryBig gap-8">
                    <div className="flex flex-col w-full">
                        <h2 className="font-medium text-xl mb-6">Ci kandydaci mogą Cię zainteresować</h2>
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
        <div className="flex flex-col gap-3">
            <h4 className={`w-full max-w-[60%] font-medium text-[.8rem] ${percentage < 60 ? 'text-right self-end' : 'text-left self-start'}`}>{name}</h4>
            <div className="bg-[#2F66F4]/20 rounded-full h-[1.4rem]">
                <div style={{ width: percentage + '%' }} className='relative bg-[linear-gradient(180deg,#2F66F4_-81.35%,#0D9AE9_100%)] rounded-full h-full'>
                    <div className="rounded-full absolute right-0 translate-x-[50%] h-6 w-6 bottom-[120%] shadow-primarySmall bg-white flex items-center justify-center">
                        <span className="font-medium text-primary right-[125%] -top-1 z-10 absolute">{percentage}%</span>
                        <div className="bg-primary h-[35%] w-[35%] rounded-full" />
                        <img className="absolute top-[50%] left-0 w-full -z-10" src={percentageTriangle} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const SuggestedCandidate = ({ id, first_name, last_name, profession, abilities }: CandidateProps) => {
    return (
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                <div className="h-14 w-14 bg-[#F8F8F8] rounded-full flex items-center justify-center"><h4 className="text-primary">{first_name.charAt(0)}</h4></div>
                <div className="flex flex-col mr-8 gap-1 w-max">
                    <h4 className="text-sm w-max font-medium">{first_name} {last_name}</h4>
                    <h4 className="text-[.8rem] w-max"><span className="hidden sm:inline">Preferowane stanowisko:</span> <span className="font-medium text-primary">{profession}</span></h4>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    {abilities?.map(ab => ab.name).map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
                            <h4 className="text-primary text-[.75rem] font-medium">{ab}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <Link className="border-primary rounded-full w-max min-w-max text-[.8rem] border-[1px] hover:text-[#2F66F4] transition-colors font-medium" to={`/oferty/${id}`}>Pokaż profil</Link>
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