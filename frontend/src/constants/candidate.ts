import { AbilityProps } from "../components/candidate/AbilityRange"
import { RoleType } from "./workForm"

type PercentageByProfession = {
    [p in RoleType]: number
}

export type AbilitiesListType = {
    [t in RoleType]: AbilityProps[]
}

export interface CandidateProps {
    id: number,
    first_name: string,
    last_name: string,
    abilities?: AbilitiesListType,
    profession?: RoleType,
    percentage_by_category: PercentageByProfession,
    drivers_license?: boolean,
    job_position?: string,
    availability?: string,
    salary_expectation?: string,
    education?: string,
    phone?: string,
    province?: string,
    email?: string,
    has_job?: boolean,
    is_followed?: boolean,
    similar_candidates?: CandidateProps[]
}

export type Details = Omit<CandidateProps, | 'id' | 'percentage_by_category'> & { 
    is_purchased: boolean,
    worst_abilities: AbilitiesListType,
    desc: string,
    ability_charts: PercentageByProfession
}

export type NonPercentageAbilitiesCandidateProps = Omit<CandidateProps, 'abilities'> & {
    abilities: string[]
}

const initialAbilities = {
    'sales': [],
    'customer_service': [],
    'office_administration': []
}

export const initialDetailsState: Details = {
    is_purchased: false,
    is_followed: false,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    abilities: initialAbilities,
    desc: '',
    education: '',
    ability_charts: {
        sales: 0,
        office_administration: 0,
        customer_service: 0
    },
    salary_expectation: '',
    similar_candidates: [],
    worst_abilities: initialAbilities
}

export type RoleTextsType = {
    name: RoleType,
    profession: string,
    offersCategoryPercantageBox: string
}

export type MapTextToRoleType = {
    [t in RoleType]: RoleTextsType
}

export const roleToTextMap: MapTextToRoleType = {
    sales: {
        name: 'sales',
        profession: 'Sprzedaż',
        offersCategoryPercantageBox: 'Sprzedażowe'
    },
    customer_service: {
        name: 'customer_service',
        profession: 'Obsługa klienta',
        offersCategoryPercantageBox: 'Obsługi klienta'
    },
    office_administration: {
        name: 'office_administration',
        profession: 'Administracja',
        offersCategoryPercantageBox: 'Administracyjne'
    }
}

export const provinces = [
    "Dolnośląskie",
    "Kujawsko-pomorskie",
    "Lubelskie",
    "Lubuskie",
    "Łódzkie",
    "Małopolskie",
    "Mazowieckie",
    "Opolskie",
    "Podkarpackie",
    "Podlaskie",
    "Pomorskie",
    "Śląskie",
    "Świętokrzyskie",
    "Warmińsko-mazurskie",
    "Wielkopolskie",
    "Zachodniopomorskie"
]