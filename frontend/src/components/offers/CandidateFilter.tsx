import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FilterProps as FilterStateProps } from "../../pages/Offers"

interface FilterProps {
    setInput: Dispatch<SetStateAction<string>>,
    setFilter: Dispatch<SetStateAction<FilterStateProps>>
}

export default function CandidateFilter({ setInput, setFilter }: FilterProps) {
    const [allFilters, setAllFilters] = useState<FilterStateProps>({
        abilities: []
    })

    useEffect(() => {
        axios.get('/api/candidate/abilities')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [])

    const handleChange = (ability: string) => setFilter(prev => ({ ...prev, abilities: prev.abilities.includes(ability) ? prev.abilities.filter(ab => ab !== ability) : [...prev.abilities, ability] }))

    return (
        <div className="flex flex-col p-4">
            <input className="px-6 pl-14 py-[0.6rem] border-[#E4E4E9] border-[1px] rounded-3xl bg-search bg-[1.4rem_center] bg-no-repeat" type='search' onChange={e => setInput(e.target.value)} placeholder="Wyszukaj kandydata" />
            <div className="flex flex-col mt-8 gap-4">
                {allFilters.abilities.length > 0 ? <h4 className="font-semibold">Umiejętności:</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                <div className="flex flex-col gap-6">
                    {allFilters.abilities.length > 0 ? allFilters.abilities.map(ability => <div className='flex items-center' key={ability}>
                        <input type='checkbox' onChange={() => handleChange(ability)} name="abilities" id={ability} key={ability + 'input'}/>
                        <label className="ml-4" htmlFor={ability} key={ability + 'label'}>{ability}</label>
                    </div>) :
                    <>
                        <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                    </>}
                </div>
            </div>
        </div>
    )
}