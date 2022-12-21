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
    const [input, setInput] = useState(decodeURIComponent(location.search).split('&').find(item => item.includes('q='))?.split("=").pop() || '')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [filter, setFilter] = useState<FilterProps>({
        abilities: decodeURIComponent(location.search).split('&').find(item => item.includes('a='))?.split("=").pop()?.split(',') || [],
        roles: decodeURIComponent(location.search).split('&').find(item => item.includes('r='))?.split("=").pop()?.split(',') || []
    })
    const debounceSearch = useDebounce(input, 400)

    useEffect(() => {
        setCandidates([])
        setPage(1)
        setHasMore(true)
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
        let url = '/api' + location.pathname + (location.search ? location.search + '&u=' + id : '?u=' + id)
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => { setCount(data.count); return data })
            .then(data => !isCancelled && setCandidates(data.results))
            .catch(() => setHasMore(false))
        return () => {
            isCancelled = true
        }
    }, [location.search])

    useEffect(() => {
        if(page === 1) return
        let url = '/api' + location.pathname + (location.search ? location.search + '&u=' + id : '?u=' + id) + '&page=' + page
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => { setCount(data.count); return data })
            .then(data => setCandidates(prev => page === 1 ? data.results : [...prev, ...data.results]))
            .catch(() => setHasMore(false))
    }, [page])

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
                <CandidateFilter input={input} setFilter={setFilter} setInput={setInput} />
                <InfiniteScroll className="flex flex-col relative gap-8 flex-1 sm:ml-8" next={() => setPage(prev => prev + 1)} hasMore={hasMore} loader={<OffersLoader />} dataLength={candidates.length}>
                    <div className="flex items-center right-0 -top-8 w-max ml-auto">
                        <h4 className="text-sm font-semibold text-[rgba(23,26,35,0.5)]">Wyświetlono {candidates.length} z {count} wyników</h4>
                    </div>
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
        setIsFavourite(prev => !prev)
        if(isFavourite) return axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`)
        return axios.post('/api/profile/favourites/add', JSON.stringify({ employer: user_id, candidate: id }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <div className="hover:bg-[#FAFAFA] transition-colors rounded-3xl p-6 flex justify-between">
            <Link to={'/oferty/' + slug + '-' + id}  className="flex flex-col gap-6 flex-1">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-full flex justify-center items-center bg-[#F6F6F6]">
                        <h4 className="font-bold text-2xl">{first_name.charAt(0)}</h4>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold">{first_name} {last_name}</h3>
                        <h3 className="font-bold text-primary">{role}</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    {abilities?.map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-6 bg-[#EBF0FE]">
                            <h4 className="text-primary text-sm font-semibold">{ab}</h4>
                        </div>
                    ))}
                </div>
            </Link>
            <button className="py-2 px-6 rounded-3xl transition-colors hover:bg-[#FAFAFA]" onClick={handleLike}>{isFavourite ? 'Polubiono' : 'Polub'}</button>
        </div>
    )
}