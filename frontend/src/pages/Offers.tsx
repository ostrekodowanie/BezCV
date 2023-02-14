import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import CandidateFilter from "../components/offers/CandidateFilter"
import { CandidateProps } from "./Candidate"
import Candidate from './Candidate'
import { Link, useSearchParams } from "react-router-dom"
import { useAppSelector } from "../main"
import InfiniteScroll from "react-infinite-scroll-component"
import { liked, notLiked } from "../assets/offers/offers"
import { emailIcon, phoneIcon } from "../assets/candidate/candidate"

export default function Offers() {
    return (
        <Routes>
            <Route path='/:id' element={<Candidate />} />
            {['/', '/search/*'].map((path, index) => 
                <Route path={path} element={<CandidateList />} key={index} />
            )}
        </Routes>
    )
}

export interface FilterProps {
    abilities: string[],
    professions: string[]
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
        professions: searchParams.get('r')?.split(',') || []
    })

    useEffect(() => {
        setCandidates([])
        setPage(1)
        setHasMore(true)
        let url = '/oferty'
        if(filter.abilities.length > 0 || filter.professions.length > 0) {
            let searchArr = [
                filter.abilities.length > 0 && 'a=' + filter.abilities.map(ability => ability).join(','),
                filter.professions.length > 0 && 'p=' + filter.professions.map(role => role).join(','),
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
        <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[18vw] py-[1.4in] md:py-[2in] bg-white">
            <div className="flex flex-wrap gap-6 items-center justify-between mx-[8vw] sm:mx-0">
                <h1 className="font-medium text-3xl xl:text-4xl">Wyszukaj pracownika</h1>
                <div className="flex items-center gap-4">
                    <h4>Sortuj według:</h4>
                    <select className="bg-white font-medium">
                        <option className="font-medium">Najnowsze oferty</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col lg:grid grid-cols-[2fr_7fr] mt-8 mb-12">
                <CandidateFilter setFilter={setFilter} />
                <InfiniteScroll className={`flex flex-col bg-white shadow-primaryBig sm:rounded-3xl relative flex-1 min-h-[80vh] lg:ml-8 px-[8vw] py-4 sm:p-4`} next={() => setPage(prev => prev + 1)} hasMore={hasMore} loader={<OffersLoader />} dataLength={candidates.length}>
                    {candidates.length > 0 ? candidates.map(candidate => <CandidateRef {...candidate} key={candidate.id} />) : <OffersLoader />}
                </InfiniteScroll>
            </div>
            <div className="flex items-center w-max ml-auto mb-4">
                <h4 className="text-sm font-semibold text-[rgba(23,26,35,0.5)]">Wyświetlono {candidates.length} z {count} wyników</h4>
            </div>
        </section>
    )
}

const CandidateRef = ({ id, first_name, last_name, favourite, abilities, phone, email }: CandidateProps) => {
    const user_id = useAppSelector(state => state.login.data.id)
    const [isFavourite, setIsFavourite] = useState(favourite)

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFavourite(prev => !prev)
        if(isFavourite) return axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`)
        return axios.post('/api/profile/favourites/add', JSON.stringify({ employer: user_id, candidate: id }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <Link to={'/oferty/' + id} className="sm:hover:bg-[#FAFAFA] transition-colors sm:px-6 py-8 flex flex-col sm:flex-row sm:justify-between border-b-[1px] gap-8 border-[#E6E7EA]">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                            <h4 className="text-xl text-primary">{first_name.charAt(0)}</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-sm">Kandydat</h5>
                            <h3 className="text-sm font-medium">{first_name} {last_name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                            <img className="max-w-[60%] max-h-[60%]" src={emailIcon} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-sm">Email</h5>
                            <h3 className="text-sm font-medium">{email ?? '******@***.com'}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                            <img className="max-w-[60%] max-h-[60%]" src={phoneIcon} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-sm">Numer telefonu</h5>
                            <h3 className="text-sm font-medium">+48 {phone ?? '*** *** ***'}</h3>
                        </div>
                    </div>
                </div>
                <h4 className="text-sm mt-2">Preferowane stanowisko: <span className="text-primary font-semibold"></span></h4>
                <div className="flex flex-wrap gap-4">
                    {abilities?.map(ab => ab.name).map(ab => (
                        <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
                            <h4 className="text-primary text-[.75rem] font-medium">{ab}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <button type='button' className="flex items-center justify-center self-end rounded-full h-12 w-12 bg-[#EBF0FE] relative" onClick={handleLike}>
                <img className="max-h-[40%] max-w-[40%]" src={isFavourite ? liked : notLiked} alt={isFavourite ? 'Polubiono' : 'Polub'} />
            </button>
        </Link>
    )
}