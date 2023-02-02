import { Dispatch, SetStateAction } from "react"

export const radioInputStyles = 'min-w-0 px-8 py-4 text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold flex items-center gap-4 cursor-pointer'

export const textInputStyles = 'px-8 py-4 text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold placeholder:font-medium placeholder:text-[#D3C5BB] min-w-0'

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

export type RoleType = 'office_administration' | 'selling' | 'customer_service'


export interface RoleProps {
    name: RoleType,
    title: string,
    image: string
}

export const roles: RoleProps[] = [
    {
        name: 'office_administration',
        title: 'Administracja biurowa',
        image: ''
    },
    {
        name: 'customer_service',
        title: 'Obsługa klienta',
        image: ''
    },
    {
        name: 'selling',
        title: 'Sprzedaż',
        image: ''
    },
]

export type StepContextType = {
    step: 'role' | 'candidate',
    setStep: Dispatch<SetStateAction<'role' | 'candidate'>>
}

export type ControllerContextType = {
    activeQuestionIndex: number,
    setActiveQuestionIndex: Dispatch<SetStateAction<number>>,
    answers: {},
    setAnswers: Dispatch<SetStateAction<{}>>,
    questionsLength: number
}