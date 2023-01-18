import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import CandidateFilter from "../components/offers/CandidateFilter"
import { CandidateProps, NonPercentageAbilitiesCandidateProps } from "./Candidate"
import Candidate from './Candidate'
import { Link, useSearchParams } from "react-router-dom"
import { useAppSelector } from "../main"
import InfiniteScroll from "react-infinite-scroll-component"
import { liked, notLiked } from "../assets/offers/offers"

export default function Offers() {
    return (
        <Routes>
            <Route path='/:slug-:id' element={<Candidate />} />
            {['/', '/search/*'].map((path, index) => 
                <Route path={path} element={<CandidateList />} key={index} />
            )}
        </Routes>
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
    const [searchParams] = useSearchParams()
    const [candidates, setCandidates] = useState<CandidateProps[]>([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [filter, setFilter] = useState<FilterProps>({
        abilities: searchParams.get('a')?.split(',') || [],
        roles: searchParams.get('r')?.split(',') || []
    })

    useEffect(() => {
        setCandidates([])
        setPage(1)
        setHasMore(true)
        let url = '/oferty'
        if(filter.abilities.length > 0 || filter.roles.length > 0) {
            let searchArr = [
                filter.abilities.length > 0 && 'a=' + filter.abilities.map(ability => ability).join(','),
                filter.roles.length > 0 && 'r=' + filter.roles.map(role => role).join(','),
            ]
            url = `/oferty/search?${searchArr.length > 0 && searchArr.map(item => item).filter(item => item).join("&")}`
        }
        if(firstRender.current) url = location.pathname + location.search
        firstRender.current = false
        return navigate(url)
    }, [filter])

    useEffect(() => {
        let isCancelled = false
        let url = '/api' + location.pathname + location.search
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
        let url = '/api' + location.pathname + (location.search ? location.search + '&page=' + page: '?page=' + page)
        axios.get(url, { headers: { 'Authorization': 'Bearer ' + access }})
            .then(res => res.data)
            .then(data => { setCount(data.count); return data })
            .then(data => setCandidates(prev => page === 1 ? data.results : [...prev, ...data.results]))
            .catch(() => setHasMore(false))
    }, [page])

    const OffersLoader = () => (
        <div className="m-6 flex flex-col gap-6">
            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[1in]" />
            <div className="bg-[#f8f8f8] rounded-full min-h-[1in]" />
        </div>
    )

    return (
        <section className="padding py-[1.4in] md:py-[2in] bg-white">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Wyszukaj pracownika</h1>
                <div className="flex items-center gap-4">
                    <h4>Sortuj według:</h4>
                    <select className="bg-white font-medium">
                        <option>Najnowsze oferty</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col sm:grid grid-cols-[1fr_3fr] mt-8 mb-12">
                <CandidateFilter setFilter={setFilter} />
                <InfiniteScroll className={`flex flex-col bg-white shadow-primaryBig rounded-3xl relative gap-6 flex-1 min-h-[80vh] sm:ml-8 p-4`} next={() => setPage(prev => prev + 1)} hasMore={hasMore} loader={<OffersLoader />} dataLength={candidates.length}>
                    {candidates.length > 0 ? candidates.map(candidate => <CandidateRef {...candidate} abilities={candidate.abilities?.map(item => item.name)} key={candidate.id} />) : <OffersLoader />}
                </InfiniteScroll>
            </div>
            <div className="flex items-center w-max ml-auto mb-4">
                <h4 className="text-sm font-semibold text-[rgba(23,26,35,0.5)]">Wyświetlono {candidates.length} z {count} wyników</h4>
            </div>
        </section>
    )
}

const CandidateRef = ({ id, first_name, last_name, slug, favourite, role, abilities }: NonPercentageAbilitiesCandidateProps) => {
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
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
                            <h4 className="text-primary text-sm font-semibold">{ab}</h4>
                        </div>
                    ))}
                </div>
            </Link>
            <button className="flex items-center self-end gap-3 w-max h-max rounded-full py-3 px-6 bg-[#EBF0FE]" onClick={handleLike}>
                <h3 className="text-primary text-sm font-semibold hidden sm:block">{isFavourite ? 'Polubiono' : 'Dodaj do ulubionych'}</h3>
                <img className="max-h-[1em]" src={isFavourite ? liked : notLiked} alt={isFavourite ? 'Polubiono' : 'Polub'} />
            </button>
        </div>
    )
}