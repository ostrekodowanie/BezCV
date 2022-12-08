import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import Loader from "../components/Loader"
import SKPFilter from "../components/skp/StationFilter"
import StationRef from "../components/skp/StationRef"
import useDebounce from "../hooks/useDebounce"
import Station from "./Station"

export default function SKP() {
    const [stations, setStations] = useState<StationProps[]>([])

    useEffect(() => {
        axios.get('/api/skp')
            .then(res => res.data)
            .then(data => setStations(data))
    }, [])

    return (
        <section className="padding pt-[1.4in] md:pt-[2in]">
            <Routes>
                {stations.map(station => <Route path={`/${station.slug}`} element={<Station {...station} key={station.id} />} />)}
                {['/', '/search/*'].map((path, index) => 
                    <Route path={path} element={<SKPList defaultStations={stations} />} key={index} />
                )}
            </Routes>
        </section>
    )
}

export interface StationProps {
    id: number,
    name: string,
    slug: string,
    city: string,
    desc: string,
    image: string,
    rating_count: number,
    avg_rating: number
}

export interface Filter {
    city: string
}

const SKPList = ({ defaultStations }: { defaultStations: StationProps[]}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const firstRender = useRef(true)
    const [stations, setStations] = useState<StationProps[]>(defaultStations)
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState<Filter>({
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
            <h1 className="font-semibold mb-4 text-3xl xl:text-4xl">Stacje Kontroli Pojazdów</h1>
            <SKPFilter setFilter={setFilter} setInput={setInput} filter={filter} />
            <div className="flex flex-col gap-6 sm:grid grid-cols-skp">
                {stations.length > 0 ? stations.map(station => <StationRef {...station} key={station.name} />) : <Loader className="mx-auto" />}
            </div>
        </>
    )
}