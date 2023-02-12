import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react"
import { useLocation } from "react-router"
import { FilterProps as FilterStateProps } from "../../pages/Offers"

interface FilterProps {
    setFilter: Dispatch<SetStateAction<FilterStateProps>>
}

export default function CandidateFilter({ setFilter }: FilterProps) {
    const [mobileActive, setMobileActive] = useState(false)
    const [allFilters, setAllFilters] = useState<FilterStateProps>({
        abilities: [],
        professions: []
    })

    useEffect(() => {
        axios.get('/api/candidate/filters')
            .then(res => res.data)
            .then(data => setAllFilters(data))
    }, [])

    return (
        <>
            <button type="button" onClick={() => setMobileActive(prev => !prev)} className="lg:hidden font-medium mb-4 text-left ml-[8vw] sm:ml-0">{!mobileActive ? 'Filtruj' : 'Zamknij'}</button>
            <div className={`flex-col gap-8 px-8 py-6 mb-4 lg:mb-0 transition-all bg-white shadow-primaryBig sm:rounded-3xl min-h-[80vh] relative ${mobileActive ? 'flex' : 'hidden lg:flex'}`}>
                <div>
                    {allFilters.professions.length > 0 ? <h4 className="font-medium mb-6">Zawody</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                    <div className="flex flex-col gap-4">
                        {allFilters.professions.length > 0 ? allFilters.professions.map(role => <RoleCheckBox role={role} setFilter={setFilter} key={role} />) :
                        <>
                            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        </>}
                    </div>
                </div>
                <div>
                    {allFilters.abilities.length > 0 ? <h4 className="font-medium mb-6">Umiejętności</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                    <div className="flex flex-col gap-4">
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
        </>
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
        <div className='flex items-center text-sm'>
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
        setFilter(prev => ({ ...prev, professions: checked ? prev.professions.filter(r => r !== role) : [...prev.professions, role] }))
        setChecked(prev => !prev)
    }

    return (
        <div className='flex items-center text-sm'>
            <input type='checkbox' onChange={handleChange} checked={checked} name="abilities" id={role}/>
            <label className="ml-4" htmlFor={role}>{role}</label>
        </div>
    )
}