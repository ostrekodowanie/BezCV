export const radioInputStyles = 'px-8 py-4 text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold flex items-center gap-4 cursor-pointer'

export const textInputStyles = 'px-8 py-4 text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold placeholder:text-[#D3C5BB]'

export type RangeNumberKey = {
    number: number,
    key: string
}

export const rangeNumberKeys: RangeNumberKey[] = [
    {
        number: 1,
        key: 'Zdecydowanie nie'
    },
    {
        number: 2,
        key: 'Raczej nie'
    },
    {
        number: 3,
        key: 'Nie mam zdania'
    },
    {
        number: 4,
        key: 'Raczej tak'
    },
    {
        number: 5,
        key: 'Zdecydowanie tak'
    },
]

export type RoleType = 'office_management' | 'selling' | 'customer_service'