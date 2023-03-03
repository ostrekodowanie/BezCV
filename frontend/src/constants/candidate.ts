import { AbilityProps } from "../components/candidate/AbilityRange"
import { RoleType } from "./workForm"

type PercentageByProfession = {
    [p in RoleType]: number
}

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: {
        [t in RoleType]: AbilityProps[]
    },
    profession?: RoleType,
    percentage_by_category: PercentageByProfession,
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

export type Details = Omit<CandidateProps, | 'id' | 'percentage_by_category'> & { 
    is_purchased: boolean,
    worst_abilities: AbilityProps[],
    desc: string,
    ability_charts: PercentageByProfession
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
    desc: '',
    education: '',
    ability_charts: {
        sales: 0,
        office_administration: 0,
        customer_service: 0
    },
    salary_expectation: '',
    similar_candidates: [],
    worst_abilities: []
}

export type RoleTextsType = {
    profession: string,
    offersCategoryPercantageBox: string
}

export type MapTextToRoleType = {
    [t in RoleType]: RoleTextsType
}

export const roleToTextMap: MapTextToRoleType = {
    sales: {
        profession: 'Sprzedaż',
        offersCategoryPercantageBox: 'sprzedażowe'
    },
    customer_service: {
        profession: 'Obsługa klienta',
        offersCategoryPercantageBox: 'obsługi klienta'
    },
    office_administration: {
        profession: 'Administracja',
        offersCategoryPercantageBox: 'administracyjne'
    }
}
