import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import CandidateFilter from "../components/offers/CandidateFilter"
import { CandidateProps, offersCategoryPercantageBox } from "../constants/candidate"
import Candidate from './Candidate'
import { Link, useSearchParams } from "react-router-dom"
import { useAppSelector } from "../main"
import InfiniteScroll from "react-infinite-scroll-component"
import { emailIcon, phoneIcon } from "../assets/candidate/candidate"
import { arrowRight } from "../assets/general"
import CategoryPercantageBox from "../components/offers/CategoryPercentageBox"

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
    professions: string[],
    availability: string[]
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
        professions: searchParams.get('professions')?.split(',') || [],
        availability: searchParams.get('availability')?.split(',') || []
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
        <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] py-[1.4in] md:py-[2in] bg-white">
            <div className="flex flex-wrap gap-6 items-center justify-between mx-[8vw] sm:mx-0">
                <h1 className="font-medium text-3xl xl:text-4xl">Wyszukaj pracownika</h1>
                <div className="flex items-center gap-4">
                    <h4>Sortuj według:</h4>
                    <select className="bg-white font-medium">
                        <option className="font-medium">Najnowsze oferty</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col lg:grid grid-cols-[1fr_4fr] mt-8 mb-12">
                <CandidateFilter setFilter={setFilter} />
                <InfiniteScroll className={`flex flex-col bg-white shadow-primaryBig sm:rounded-3xl relative flex-1 min-h-[80vh] lg:ml-8 px-[8vw] py-4 sm:p-4`} next={() => setPage(prev => prev + 1)} hasMore={hasMore} loader={<OffersLoader />} dataLength={candidates.length}>
                    {candidates.length > 0 ? candidates.map(candidate => <CandidateRef {...candidate} key={candidate.id} />) : <OffersLoader />}
                </InfiniteScroll>
            </div>
            <div className="flex items-center w-max ml-auto mb-4">
                <h4 className="text-sm font-medium text-[rgba(23,26,35,0.5)]">Wyświetlono {candidates.length} z {count} wyników</h4>
            </div>
        </section>
    )
}

const CandidateRef = ({ id, first_name, last_name, is_followed, percentage_by_category, phone, email, profession }: CandidateProps) => {
    const user_id = useAppSelector(state => state.login.data.id)
    const [isFollowed, setIsFollowed] = useState(is_followed)

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFollowed(prev => !prev)
        if(isFollowed) return axios.delete(`/api/profile/favourites/remove/${user_id}/${id}`)
        return axios.post('/api/profile/favourites/add', JSON.stringify({ employer: user_id, candidate: id }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <Link to={'/oferty/' + id} className="sm:hover:bg-[#FAFAFA] transition-colors sm:px-6 py-8 flex flex-col gap-8 border-b-[1px] border-[#E6E7EA]">
            <div className="flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                        <h4 className="font-semibold text-primary">{first_name.charAt(0) + last_name.charAt(0)}</h4>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[.8rem]">Szuka pracy w <span className="text-primary">{profession ?? ''}</span></h4>
                        <h3 className="text-sm font-medium">{first_name} {last_name}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                        <img className="max-w-[60%] max-h-[60%]" src={emailIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[.8rem]">Email</h4>
                        <h3 className="text-sm font-medium">{email ?? '******@***.com'}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                        <img className="max-w-[60%] max-h-[60%]" src={phoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[.8rem]">Numer telefonu</h4>
                        <h3 className="text-sm font-medium">+48 {phone ?? '*** *** ***'}</h3>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-full border-[1px] border-[#F9FAFC] flex justify-center items-center bg-[#F6F6F6]">
                        <img className="max-w-[60%] max-h-[60%]" src={phoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[.8rem]">Numer telefonu</h4>
                        <h3 className="text-sm font-medium">+48 {phone ?? '*** *** ***'}</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-20 gap-y-4">
                <div className="flex flex-col gap-1">
                    <h4 className="text-[.8rem]">Dyspozycyjność</h4>
                    <h3 className="text-sm font-semibold">Cały etat</h3>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-[.8rem]">Miasto</h4>
                    <h3 className="text-sm font-semibold">Wrocław</h3>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-[.8rem]">Wykształcenie</h4>
                    <h3 className="text-sm font-semibold">Typ wykształcenia</h3>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-[.8rem]">Prawo jazdy kat. B</h4>
                    <h3 className="text-sm font-semibold">Tak</h3>
                </div>
            </div>
            <div className="flex items-center gap-4 justify-between flex-wrap sm:flex-nowrap">
                <div className="flex flex-wrap gap-4">
                    {offersCategoryPercantageBox.map(box => <CategoryPercantageBox {...box} percentage={percentage_by_category[box.name]} />)}
                </div>
                <button className="rounded-full max-w-max text-white text-[.75rem] font-semibold flex items-center py-3 px-10 bg-primary" type='button'>Zobacz profil<img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" /></button>
            </div>
        </Link>
    )
}