import { Dispatch, SetStateAction } from "react"
import { customerService, officeAdministration, selling } from "../assets/survey/survey"
import { QuestionProps } from "./findWork"

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
        image: officeAdministration
    },
    {
        name: 'customer_service',
        title: 'Obsługa klienta',
        image: customerService
    },
    {
        name: 'selling',
        title: 'Sprzedaż',
        image: selling
    },
]

export type CandidateAnswerType = {
    [K in QuestionProps['name']]: string | string[]
}

export type RoleAnswerType = number[]

export type SurveyContextType = {
    step: 'role' | 'candidate',
    setStep: Dispatch<SetStateAction<'role' | 'candidate'>>,
    candidateAnswers: CandidateAnswerType,
    setCandidateAnswers: Dispatch<SetStateAction<CandidateAnswerType>>,
    roleAnswers: RoleAnswerType,
    setRoleAnswers: Dispatch<SetStateAction<RoleAnswerType>>
}

export type ControllerContextType = {
    activeQuestionIndex: number,
    setActiveQuestionIndex: Dispatch<SetStateAction<number>>,
    questionsLength: number
}