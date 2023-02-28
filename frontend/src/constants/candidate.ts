import { AbilityProps } from "../components/candidate/AbilityRange"
import { RoleType } from "./workForm"

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: AbilityProps[],
    profession?: string,
    percentage_by_category?: {
        [p in RoleType]: number
    },
    salary_expectation?: string,
    phone?: string,
    email?: string,
    is_followed?: boolean,
    desc?: string,
    similar_candidates?: CandidateProps[]
}

export type Details = Omit<CandidateProps, | 'id' | 'is_followed'> & { is_purchased: boolean }

export type NonPercentageAbilitiesCandidateProps = Omit<CandidateProps, 'abilities'> & {
    abilities: string[]
}

export const initialDetailsState: Details = {
    is_purchased: false,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    abilities: [],
    profession: '',
    desc: '',
    percentage_by_category: {
        sales: 0,
        office_administration: 0,
        customer_service: 0
    },
    salary_expectation: '',
    similar_candidates: []
}