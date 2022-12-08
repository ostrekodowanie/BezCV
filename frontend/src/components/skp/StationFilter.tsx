import axios from "axios"
import { useEffect, useState } from "react"
import { Filter } from "../../pages/SKP"
import { search } from '../../assets/skp'
import Loader from "../Loader"

interface FilterProps {
    setInput: any,
    setFilter: any,
    filter: Filter
}


export default function SKPFilter({ setInput, setFilter, filter }: FilterProps) {
    const [active, setActive] = useState({
        cities: false
    })
    const [allFilters, setAllFilters] = useState({
        cities: [],
        vehicles: []
    })

    useEffect(() => {
        axios.get('/api/skp/filters')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [])

    return (
        <div className="flex items-center justify-between mt-8 mb-12">
            <input className="px-6 pl-14 py-[0.6rem] border-[#E4E4E9] border-[1px] rounded-3xl bg-search bg-[1.4rem_center] bg-no-repeat" type='search' onChange={e => setInput(e.target.value)} placeholder="Wpisz nazwę stacji" />
            <div className="flex items-center gap-4">
                <h4 className="font-semibold">Miasto: </h4>
                <div className="relative">
                    <button className="bg-primary text-sm py-3 px-6 rounded hover:bg-darkPrimary transition-colors font-semibold text-white" onClick={() => setActive(prev => { return { ...prev, cities: !prev.cities }})}>{filter.city ? filter.city : 'Wybierz miasto'}</button>
                    {active.cities && <ul className="flex flex-col absolute top-[120%] z-10 w-max min-h-max max-h-[1.5in] overflow-y-auto rounded-xl overflow-hidden right-0 shadow-primarySmall">
                        {allFilters.cities.length > 0 ? allFilters.cities.map(city => <li className="py-3 px-6 pr-16 hover:bg-[#E4E4E4] transition-colors bg-white cursor-pointer" onClick={() => setFilter((prev: {}) => { return { ...prev, city: city}})}>{city}</li>) : <Loader className="mx-auto my-6 w-6" />}
                    </ul>}
                </div>
            </div>
        </div>
    )
}