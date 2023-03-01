import { AbilityProps } from "../components/candidate/AbilityRange"
import { RoleType } from "./workForm"

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: {
        [t in RoleType]: AbilityProps[]
    },
    profession: RoleType | '',
    percentage_by_category: {
        [p in RoleType]: number
    },
    drivers_license?: boolean,
    job_position?: string,
    availability?: string,
    salary_expectation?: string,
    education?: string,
    phone?: string,
    email?: string,
    is_followed?: boolean,
    similar_candidates?: CandidateProps[]
}

export type Details = Omit<CandidateProps, | 'id'> & { 
    is_purchased: boolean,
    worst_abilities: AbilityProps[],
    desc: string,
}

export type NonPercentageAbilitiesCandidateProps = Omit<CandidateProps, 'abilities'> & {
    abilities: string[]
}

export const initialDetailsState: Details = {
    is_purchased: false,
    is_followed: false,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    abilities: {
        'sales': [],
        'customer_service': [],
        'office_administration': []
    },
    profession: '',
    desc: '',
    education: '',
    percentage_by_category: {
        sales: 0,
        office_administration: 0,
        customer_service: 0
    },
    salary_expectation: '',
    similar_candidates: [],
    worst_abilities: []
}

export type OffersCategoryPercantageBox = {
    name: RoleType,
    text: string
}

export const offersCategoryPercantageBox: OffersCategoryPercantageBox[] = [
    {
        name: 'sales',
        text: 'sprzedażowe'
    },
    {
        name: 'customer_service',
        text: 'obsługi klienta'
    },
    {
        name: 'office_administration',
        text: 'administracyjne'
    }
]