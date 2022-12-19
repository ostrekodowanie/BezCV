import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import CandidateFilter from "../components/offers/CandidateFilter"
import useDebounce from "../hooks/useDebounce"
import { CandidateProps } from "./Candidate"
import Candidate from './Candidate'
import { Link } from "react-router-dom"
import { useAppSelector } from "../main"
import InfiniteScroll from "react-infinite-scroll-component"

export default function Offers() {
    return (
        <section className="padding py-[1.4in] md:py-[2in]">
            <Routes>
                <Route path='/:slug-:id' element={<Candidate />} />
                {['/', '/search/*'].map((path, index) => 
                    <Route path={path} element={<CandidateList />} key={index} />
                )}
            </Routes>
        </section>
    )
}

export interface FilterProps {
    abilities: string[],
    roles: string[]
}

const CandidateList = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstRender = useRef(true)
    const auth = useAppSelector(state => state.login)
    const { access } = auth.tokens
    const { id } = auth.data
    const [candidates, setCandidates] = useState<CandidateProps[]>([])
    const [input, setInput] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [filter, setFilter] = useState<FilterProps>({
        abilities: [],
        roles: []
    })
    const debounceSearch = useDebounce(input, 400)

    useEffect(() => {
        setCandidates([])
        setPage(1)
        let url = '/oferty'
        if(input || filter.abilities.length > 0 || filter.roles.length > 0) {
            let searchArr = [
                debounceSearch && 'q=' + debounceSearch,
                filter.abilities.length > 0 && 'a=' + filter.abilities.map(ability => ability).join(','),
                filter.roles.length > 0 && 'r=' + filter.roles.map(role => role).join(','),
            ]
            url = `/oferty/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
        }
        if(firstRender.current) url = location.pathname + location.search
        firstRender.current = false
        return navigate(url)
    }, [debounceSearch, filter])

    useEffect(() => {
        let isCancelled = false
        let url = '/api' + location.pathname + (location.search ? location.search + '&u=' + id : '?u=' + id) + (page > 1 ? '&page=' + page : '')
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => !isCancelled && setCandidates(prev => page === 1 ? data.results : [...prev, ...data.results]))
            .catch(() => setHasMore(false))
        return () => {
            isCancelled = true
        }
    }, [location.search, page])

    const OffersLoader = () => (
        <>
            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
        </>
    )

    return (
        <>
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Wyszukaj pracownika</h1>
            <div className="flex flex-col sm:grid grid-cols-[1fr_3fr] mt-8 mb-12">
                <CandidateFilter setFilter={setFilter} setInput={setInput} />
                <InfiniteScroll className="flex flex-col gap-8 flex-1 sm:ml-8" next={() => setPage(prev => prev + 1)} hasMore={hasMore} loader={<OffersLoader />} dataLength={candidates.length}>
                    {candidates.length > 0 ? candidates.map(candidate => <CandidateRef {...candidate} key={candidate.id} />) : <OffersLoader />}
                </InfiniteScroll>
            </div>
        </>
    )
}

const CandidateRef = ({ id, first_name, last_name, slug, favourite, role, abilities }: CandidateProps) => {
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
        <Link to={'/oferty/' + slug + '-' + id} className="shadow rounded-3xl p-6 flex justify-between">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded bg-[#F8F8F9]" />
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold">{first_name} {last_name}</h3>
                        <h3 className="font-bold text-primary">{role}</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    {abilities?.map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full shadow py-2 px-6 bg-[#EBF0FE]">
                            <h4 className="text-primary text-sm font-semibold">{ab}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleLike}>{isFavourite ? 'Polubiono' : 'Polub'}</button>
        </Link>
    )
}