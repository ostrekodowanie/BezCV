import { createContext, Dispatch, SetStateAction } from "react";
import { CandidateProps, NonPercentageAbilitiesCandidateProps } from "./candidate";

export type StatsProps = {
    token_count: number,
    followed_count: number,
    purchased_count: number
}

export type EmployerInfoType = {
    nip: string,
    image: string
}

export type ProfileDataType = {
    stats: StatsProps,
    employer: EmployerInfoType,
    purchased_contacts: NonPercentageAbilitiesCandidateProps[],
    followed_contacts: CandidateProps[]
}

export const initialProfileData: ProfileDataType = {
    stats: {
        token_count: 0,
        followed_count: 0,
        purchased_count: 0
    },
    employer: {
        nip: '',
        image: ''
    },
    purchased_contacts: [],
    followed_contacts: []
}

export const ProfileDataContext = createContext<ProfileDataType>(initialProfileData)

export type InfoFormQuestion = {
    question: string
}

export const infoFormQuestions: InfoFormQuestion[] = [
    {
        question: 'W jakiej branży działa Twoja firma?'
    },
    {
        question: 'Ilu pracowników potrzebujesz?'
    },
    {
        question: 'Na jakie stanowiska rekrutujesz?'
    }
]

export const reportFormInfo = [
    {
        title: 'Napotkałeś problem z kandydatem?',
    },
    {
        title: 'Kilka rzeczy o których należy pamiętać:',
        paragraph: 'Aby otrzymać zwrot punktów za dany kontakt, prześlij wypełniony formularz zwrotu w ciągu 3 dni roboczych od zakupu kontaktu.'
    },
    {
        title: 'Kilka rzeczy o których należy pamiętać:',
        paragraph: 'Punkty za zwrócone kontakty pojawią się na Twoim koncie najdalej w ciągu 1-2 dni roboczych, W momencie udostępnienia możliwości zwrotów kontaktów Twój limit zwrotów został ustalony na kwotę 10% Twoich tokenów bCV'
    },
    {
        title: 'Kilka rzeczy o których należy pamiętać:',
        paragraph: 'Każde kolejne płatne doładowanie tokenów bCV powoduje ustawienie limitu zwrotów na 10% wartości ostatniego doładowania.'
    },
    {
        title: 'Kilka rzeczy o których należy pamiętać:',
        paragraph: 'Pracownik bezCV może się skontaktować w sprawie weryfikacji powodu dokonanego zwrotu. Zgłoszenie powodu zwrotu niezgodnego ze stanem faktycznym może skutkować całkowitą blokadą zwrotów kontaktów.'
    },
    {
        title: 'Opisz krótko przyczynę zwrotu'
    },
]

export type FollowedCandidateBonusProps = { 
    isFromFollowed?: boolean, 
    setFollowed?: (userId: number) => void
}