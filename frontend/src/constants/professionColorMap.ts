import { RoleType } from "./workForm"

export type ProfessionColorScheme = {
    color: string,
    gradient: string
}

export const professionColorMap: { [t in RoleType]: ProfessionColorScheme } = {
    sales: {
        color: '#1BDF69',
        gradient: 'linear-gradient(180deg, #1BDF8A 0%, #1BDF69 100%'
    },
    customer_service: {
        color: '#F9AE3D',
        gradient: 'linear-gradient(289.36deg, #F98D3D 9.9%, #F9AE3D 62.28%)'
    },
    office_administration: {
        color: '#2F66F4',
        gradient: 'linear-gradient(90.04deg, #2F66F4 24.53%, #0D9AE9 82.58%)'
    }
}