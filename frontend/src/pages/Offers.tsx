import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import Loader from "../components/Loader"
import CandidateFilter from "../components/offers/CandidateFilter"
import useDebounce from "../hooks/useDebounce"
import { AbilityProps, CandidateProps } from "./Candidate"
import Candidate from './Candidate'
import { Link } from "react-router-dom"

export default function Offers() {
    const [candidates, setCandidates] = useState<CandidateProps[]>([])

    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setCandidates(data))
    }, [])

    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <Routes>
                {candidates.map(candidate => <Route path={`/${candidate.slug}`} element={<Candidate {...candidate} key={candidate.id} />} />)}
                {['/', '/search/*'].map((path, index) => 
                    <Route path={path} element={<CandidateList defaultCandidates={candidates} />} key={index} />
                )}
            </Routes>
        </section>
    )
}

interface FilterProps {
    abilities: AbilityProps[]
}

const CandidateList = ({ defaultCandidates }: { defaultCandidates: CandidateProps[]}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstRender = useRef(true)
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
                filter.abilities.length > 0 && 'a=' + filter.abilities.map(ability => ability.name).join(',')
            ]
            url = `/oferty/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
        }
        if(firstRender.current) url = location.pathname + location.search
        firstRender.current = false
        return navigate(url)
    }, [debounceSearch, filter])

    useEffect(() => {
        let isCancelled = false
        let url = '/api' + location.pathname + location.search
        axios.get(url)
            .then(res => res.data)
            .then(data => !isCancelled && setCandidates(data))
        return () => {
            isCancelled = true
        }
    }, [location])

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

const CandidateRef = ({ first_name, last_name, slug }: CandidateProps) => {
    return (
        <div className="shadow rounded-3xl flex flex-col p-6">
            <h3 className="text-bold text-xl">{first_name} {last_name}</h3>
            <Link className="text-primary font-medium" to={'/oferty/' + slug}>Sprawdź</Link>
        </div>
    )
}