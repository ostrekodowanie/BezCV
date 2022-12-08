import axios from "axios"
import { useEffect, useRef, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { inputStyles } from "./home/Landing"

export default function CitySearchBar({ setSearch }: { setSearch: any }) {
    const searchBar = useRef<any>(null!)
    const [input, setInput] = useState('')
    const [filteredCities, setFilteredCities] = useState([])
    const [menu, setMenu] = useState(false)
    const debounceSearch: string = useDebounce(input, 400)

    useEffect(() => {
        let url = `/api/skp/cities/search${debounceSearch ? '?c=' + debounceSearch : ''}`
        axios.get(url)
            .then(res => res.data)
            .then(data => setFilteredCities(data))
            .catch(() => console.log("error"))
    }, [debounceSearch])

    useEffect(() => {
        setSearch((prev: {}) => {
            return {
                ...prev,
                city: input
            }
        })
    }, [input])

    const handleBlur = (e: Event) => {
        if(searchBar.current && !searchBar.current.contains(e.target)) return setMenu(false)
        return setMenu(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleBlur)
        return () => document.removeEventListener('mousedown', handleBlur)
    }, [searchBar])

    return (
        <div ref={searchBar} className="relative max-w-max">
            <input className={inputStyles} onChange={e => setInput(e.target.value)} required autoComplete='off' value={input} type='search' autoCorrect="off" name='city' id='city' placeholder="Miasto" />
            {menu && filteredCities.length > 0 && <ul className="flex flex-col transition-opacity absolute top-full right-0 left-0 rounded overflow-hidden overflow-y-scroll border-[1px] border-black max-h-[1.5in]">
                {filteredCities.map(city => <li onClick={() => setInput(city)} className="py-2 px-5 bg-white transition-colors hover:bg-[#EEEEEE] cursor-pointer">{city}</li>)}
            </ul>}
        </div>
    )
}