import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import Loader from "../components/Loader"
import CandidateFilter from "../components/skp/CandidateFilter"
import StationRef from "../components/skp/StationRef"
import useDebounce from "../hooks/useDebounce"
import { CandidateProps } from "./Candidate"
import Candidate from './Candidate'

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

const CandidateList = ({ defaultCandidates }: { defaultCandidates: CandidateProps[]}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstRender = useRef(true)
    const [stations, setStations] = useState<CandidateProps[]>(defaultCandidates)
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState({
        city: ''
    })
    const debounceSearch = useDebounce(input, 400)

    useEffect(() => {
        setStations([])
        let url = '/skp'
        if(input || filter.city) {
            let searchArr = [
                debounceSearch && 'q=' + debounceSearch,
                filter.city && 'c=' + filter.city
            ]
            url = `/skp/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
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
            .then(data => !isCancelled && setStations(data))
        return () => {
            isCancelled = true
        }
    }, [location])

    return (
        <>
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Kandydaci</h1>
            <CandidateFilter setFilter={setFilter} setInput={setInput} filter={filter} />
            <div className="flex flex-col gap-6 sm:grid grid-cols-skp">
                {stations.length > 0 ? stations.map(station => <StationRef {...station} key={station.name} />) : <Loader className="mx-auto" />}
            </div>
        </>
    )
}