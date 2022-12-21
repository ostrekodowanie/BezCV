import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { FilterProps as FilterStateProps } from "../../pages/Offers"

interface FilterProps {
    setInput: Dispatch<SetStateAction<string>>,
    setFilter: Dispatch<SetStateAction<FilterStateProps>>
}

export default function CandidateFilter({ setInput, setFilter }: FilterProps) {
    const [allFilters, setAllFilters] = useState<FilterStateProps>({
        abilities: [],
        roles: []
    })

    useEffect(() => {
        axios.get('/api/candidate/filters')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [])

    return (
        <div className="flex flex-col p-4">
            <div className="sticky top-36">
                <input className="px-6 pl-14 py-[0.6rem] border-[#E4E4E9] border-[1px] rounded-3xl bg-search bg-[1.4rem_center] bg-no-repeat" type='search' onChange={e => setInput(e.target.value)} placeholder="Wyszukaj kandydata" />
                <div className="flex flex-col mt-8 gap-8">
                    <div>
                        {allFilters.roles.length > 0 ? <h4 className="font-semibold mb-4">Zawody:</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                        <div className="flex flex-col gap-3">
                            {allFilters.roles.length > 0 ? allFilters.roles.map(role => <RoleCheckBox role={role} setFilter={setFilter} key={role} />) :
                            <>
                                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            </>}
                        </div>
                    </div>
                    <div>
                        {allFilters.abilities.length > 0 ? <h4 className="font-semibold mb-4">Umiejętności:</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                        <div className="flex flex-col gap-3">
                            {allFilters.abilities.length > 0 ? allFilters.abilities.map(ability => <AbilityCheckBox ability={ability} setFilter={setFilter} key={ability} />) :
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
            </div>
        </div>
    )
}

const AbilityCheckBox = ({ ability, setFilter }: { ability: string, setFilter: Dispatch<SetStateAction<FilterStateProps>> }) => {
    const location = useLocation()
    const [checked, setChecked] = useState(false)

    useLayoutEffect(() => {
        const decodedSearch = decodeURIComponent(location.search);
        setChecked(decodedSearch.includes(ability))
    }, [])

    const handleChange = () => {
        setFilter(prev => ({ ...prev, abilities: checked ? prev.abilities.filter(ab => ab !== ability) : [...prev.abilities, ability] }))
        setChecked(prev => !prev)
    }

    return (
        <div className='flex items-center'>
            <input type='checkbox' onChange={handleChange} checked={checked} name="abilities" id={ability}/>
            <label className="ml-4" htmlFor={ability}>{ability}</label>
        </div>
    )
}

const RoleCheckBox = ({ role, setFilter }: { role: string, setFilter: Dispatch<SetStateAction<FilterStateProps>> }) => {
    const location = useLocation()
    const [checked, setChecked] = useState(false)

    useLayoutEffect(() => {
        const decodedSearch = decodeURIComponent(location.search);
        setChecked(decodedSearch.includes(role))
    }, [])

    const handleChange = () => {
        setFilter(prev => ({ ...prev, roles: checked ? prev.roles.filter(r => r !== role) : [...prev.roles, role] }))
        setChecked(prev => !prev)
    }

    return (
        <div className='flex items-center'>
            <input type='checkbox' onChange={handleChange} checked={checked} name="abilities" id={role}/>
            <label className="ml-4" htmlFor={role}>{role}</label>
        </div>
    )
}