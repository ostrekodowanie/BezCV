import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Loader from "../Loader"

interface FilterProps {
    setInput: any,
    setFilter: any
}


export default function CandidateFilter({ setInput, setFilter }: FilterProps) {
    const location = useLocation()
    const [allFilters, setAllFilters] = useState({
        abilities: []
    })

    useEffect(() => {
        axios.get('/api/candidates/filters')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [location])

    return (
        <div className="flex items-center justify-between mt-8 mb-12">
            <input className="px-6 pl-14 py-[0.6rem] border-[#E4E4E9] border-[1px] rounded-3xl bg-search bg-[1.4rem_center] bg-no-repeat" type='search' onChange={e => setInput(e.target.value)} placeholder="Wpisz kandydata" />
            <div className="flex items-center gap-4">
                <h4 className="font-semibold">Umiejętności: </h4>
                <div className="relative">
                    <ul className="flex flex-col absolute top-[120%] z-10 w-max min-h-max max-h-[1.5in] overflow-y-auto rounded-xl overflow-hidden right-0 shadow-primarySmall">
                        {allFilters.abilities.length > 0 ? allFilters.abilities.map(ability => <li className="py-3 px-6 pr-16 hover:bg-[#E4E4E4] transition-colors bg-white cursor-pointer" onClick={() => setFilter((prev: {}) => ({ ...prev, ability: ability}))}>{ability}</li>) : <Loader className="mx-auto my-6 w-6" />}
                    </ul>
                </div>
            </div>
        </div>
    )
}