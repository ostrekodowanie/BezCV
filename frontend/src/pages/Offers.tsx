import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import CandidateFilter from "../components/offers/CandidateFilter"
import useDebounce from "../hooks/useDebounce"
import { CandidateProps } from "./Candidate"
import Candidate from './Candidate'
import { Link } from "react-router-dom"
import { useAppSelector } from "../main"

export default function Offers() {
    const [candidates, setCandidates] = useState<CandidateProps[]>([])
    const auth = useAppSelector(state => state.login)
    const { access } = auth.tokens
    const { id } = auth.data

    useEffect(() => {
        axios.get('/api/oferty/all?u=' + id, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => setCandidates(data))
    }, [])

    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <Routes>
                {candidates.map(candidate => <Route path={'/' + [candidate.first_name, candidate.last_name, candidate.id].join('-')} element={<Candidate {...candidate} key={candidate.id} />} />)}
                {['/', '/search/*'].map((path, index) => 
                    <Route path={path} element={<CandidateList defaultCandidates={candidates} />} key={index} />
                )}
            </Routes>
        </section>
    )
}

export interface FilterProps {
    abilities: string[]
}

const CandidateList = ({ defaultCandidates }: { defaultCandidates: CandidateProps[]}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstRender = useRef(true)
    const auth = useAppSelector(state => state.login)
    const { access } = auth.tokens
    const { id } = auth.data
    const [candidates, setCandidates] = useState<CandidateProps[]>(defaultCandidates)
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState<FilterProps>({
        abilities: []
    })
    const debounceSearch = useDebounce(input, 400)

    useEffect(() => {
        setCandidates([])
        let url = '/oferty'
        if(input || filter.abilities.length > 0) {
            let searchArr = [
                debounceSearch && 'q=' + debounceSearch,
                filter.abilities.length > 0 && 'a=' + filter.abilities.map(ability => ability).join(',')
            ]
            url = `/oferty/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
        }
        if(firstRender.current) url = location.pathname + location.search
        firstRender.current = false
        return navigate(url)
    }, [debounceSearch, filter])

    useEffect(() => {
        let isCancelled = false
        let url = '/api' + location.pathname + (location.search ? location.search + '&u=' + id :  '?u=' + id)
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => !isCancelled && setCandidates(data))
        return () => {
            isCancelled = true
        }
    }, [location.search])

    return (
        <>
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Oferty</h1>
            <div className="flex flex-col sm:grid grid-cols-[1fr_3fr] mt-8 mb-12">
                <CandidateFilter setFilter={setFilter} setInput={setInput} />
                <div className="flex flex-col gap-8 flex-1 sm:ml-8">
                    {candidates.length > 0 ? candidates.map(candidate => <CandidateRef {...candidate} key={candidate.id} />) : 
                    <>
                        <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
                        <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
                        <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
                        <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
                    </>}
                </div>
            </div>
        </>
    )
}

const CandidateRef = ({ id, first_name, last_name, slug, favourite }: CandidateProps) => {
    const user_id = useAppSelector(state => state.login.data.id)
    const [isFavourite, setIsFavourite] = useState(favourite)

    const handleLike = async () => {
        if(isFavourite) {
            let resp = await axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`)
            if(resp.status === 204) return setIsFavourite(false)
        }
        let resp = await axios.post('/api/profile/favourites/add', JSON.stringify({ employer: user_id, candidate: id }), {
            headers: { 'Content-Type': 'application/json' }
        })
        if(resp.status === 201) return setIsFavourite(true)
    }
    
    return (
        <div className="shadow rounded-3xl p-6 flex justify-between">
            <div className="flex flex-col">
                <h3 className="text-bold text-xl">{first_name} {last_name}</h3>
                <Link className="text-primary font-medium" to={'/oferty/' + slug?.split(' ').join('-') + '-' + id}>Sprawdź</Link>
            </div>
            <button onClick={handleLike}>{isFavourite ? 'Polubiono' : 'Polub'}</button>
        </div>
    )
}