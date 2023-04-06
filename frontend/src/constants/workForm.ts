import { Dispatch, SetStateAction } from "react"
import { customerService, officeAdministration, selling } from "../assets/survey/survey"
import { QuestionProps } from "./findWork"
import { tutorialSales } from "../assets/home/home"

export const radioInputStyles = 'min-w-0 px-8 py-4 text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold flex items-center gap-4 cursor-pointer'

export const textInputStyles = 'px-8 py-4 text-[.8rem] sm:text-sm bg-white shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] rounded-xl w-full font-semibold placeholder:font-medium placeholder:text-[#D3C5BB] min-w-0'

export type RangeNumberKey = {
    number: number,
    text: string
}

export const rangeNumberKeys: RangeNumberKey[] = [
    {
        number: 1,
        text: 'Zdecydowanie nie'
    },
    {
        number: 2,
        text: 'Raczej nie'
    },
    {
        number: 3,
        text: 'Nie mam zdania'
    },
    {
        number: 4,
        text: 'Raczej tak'
    },
    {
        number: 5,
        text: 'Zdecydowanie tak'
    },
]

export type RoleType = 'office_administration' | 'sales' | 'customer_service'

export interface RoleProps {
    name: RoleType,
    title: string,
    image: string,
}

export const roles: RoleProps[] = [
    {
        name: 'office_administration',
        title: 'Administracja biurowa',
        image: officeAdministration,
    },
    {
        name: 'customer_service',
        title: 'Obsługa klienta',
        image: customerService,
    },
    {
        name: 'sales',
        title: 'Sprzedaż',
        image: selling,
    },
]

export type CandidateAnswerType = {
    [K in QuestionProps['name']]: string | string[]
}

export type RoleAnswerType = [number, number]

export type SurveyContextType = {
    step: 'role' | 'candidate',
    setStep: Dispatch<SetStateAction<'role' | 'candidate'>>,
    role: RoleType | null,
    setRole: Dispatch<SetStateAction<RoleType | null>>,
    candidateAnswers: CandidateAnswerType,
    setCandidateAnswers: Dispatch<SetStateAction<CandidateAnswerType>>,
    roleAnswers: RoleAnswerType[],
    setRoleAnswers: Dispatch<SetStateAction<RoleAnswerType[]>>,
    isSurveyFilled: IsFilled,
    setIsSurveyFilled: Dispatch<SetStateAction<IsFilled>>,
    activeQuestionIndex: number,
    setActiveQuestionIndex: Dispatch<SetStateAction<number>>
}

export type ControllerContextType = {
    activeQuestionIndex: number,
    setActiveQuestionIndex: Dispatch<SetStateAction<number>>,
    questionsLength: number
}

export type IsFilled = {
    [r in RoleType]: boolean
}

export const initialFilledState: IsFilled = {
    sales: false,
    office_administration: false,
    customer_service: false
}