import { RoleType } from "./workForm"

type ProfessionColorMap = {
    [p in RoleType]: string
}

export const professionColorMap: ProfessionColorMap = {
    'customer_service': '#F9AE3D',
    'office_administration': '#2F66F4',
    'sales': '#1BDF69'
}