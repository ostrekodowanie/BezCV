import { AbilityProps } from "../components/candidate/AbilityRange"
import { RoleType } from "./workForm"

export interface TutorialAnswerProps {
    position: string,
    title: string,
    desc: string
}

type ExampleAbilities = {
    [r in RoleType]: AbilityProps[]
}

export const exampleAbilities: ExampleAbilities = {
	"customer_service": [
		{
			"name": "Nadawanie priorytetów",
			"percentage": 74
		},
		{
			"name": "Otwartość na problemy innych / Opiekuńczość",
			"percentage": 68
		},
		{
			"name": "Pewność siebie",
			"percentage": 55
		},
		{
			"name": "Pozytywne nastawienie",
			"percentage": 50
		}
	],
    "office_administration": [
        {
            "name": "Lojalność i dyskrecja",
            "percentage": 100
        },
        {
            "name": "Asertywność",
            "percentage": 67
        },
        {
            "name": "Cierpliwość",
            "percentage": 50
        },
        {
            "name": "Nadawanie priorytetów",
            "percentage": 50
        },
    ],
    "sales": [
        {
            "name": "Cierpliwość",
            "percentage": 100
        },
        {
            "name": "Pewność siebie",
            "percentage": 87
        },
        {
            "name": "Pozytywne nastawienie",
            "percentage": 60
        },
        {
            "name": "Prezencja",
            "percentage": 52
        }
    ]
}