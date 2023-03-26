import { HTMLInputTypeAttribute } from "react"
import { CandidateAnswerType, RoleType } from "./workForm"

type CustomInput = {
    name: keyof CandidateAnswerType,
    placeholder: string,
    type: HTMLInputTypeAttribute,
    value?: string,
    label?: string
}

export interface QuestionProps {
    name: 'name' | 'phone' | "drivers_license" | 'email' | 'preferred_professions' | 'birth_date' | 'province' | 'salary_expectation' | 'availability' | 'job_position' | 'experience' | 'education' | 'first_name' | 'last_name' | 'experience_sales' | 'experience_customer_service' | 'experience_office_administration',
    question: string,
    type: HTMLInputTypeAttribute | 'custom' | 'select',
    answers?: string[],
    placeholder?: string,
    customInputs?: CustomInput[]
}

export const defaultQuestions: QuestionProps[] = [
    {
        name: 'name',
        question: 'Podaj proszę swoje imię i nazwisko.',
        type: 'custom',
        placeholder: 'Tutaj wpisz swoje imię i nazwisko',
        customInputs: [
            {
                name: 'first_name',
                placeholder: 'Tutaj wpisz swoje imię',
                type: 'text'
            },
            {
                name: 'last_name',
                placeholder: 'Tutaj wpisz swoje nazwisko',
                type: 'text'
            },
        ]
    },
    {
        name: 'phone',
        question: 'Pod jakim numerem pracodawca będzie mógł się z Tobą skontaktować?',
        type: 'tel',
        placeholder: 'Tutaj wpisz swój numer telefonu'
    },
    {
        name: 'email',
        question: 'Jakiego adresu e-mail używasz?',
        type: 'email',
        placeholder: 'Tutaj wpisz swój email'
    },
    {
        name: 'salary_expectation',
        question: 'Jakiego wynagrodzenia oczekujesz?',
        type: 'radio',
        answers: [
            'mniej niż 2999 zł',
            'od 3000 zł do 3499 zł',
            'od 3500 zł do 3999 zł',
            'od 4000 zł do 4499 zł',
            'od 4500 zł do 4999 zł',
            'od 5000 zł do 5999 zł',
            'powyżej 6000 zł'
        ],
    },
    {
        name: 'birth_date',
        type: 'date',
        question: 'Podaj swoją datę urodzenia',
        placeholder: 'Tutaj wprowadź datę'
    },
    {
        name: 'availability',
        question: 'Jaka jest Twoja dyspozycyjność?',
        type: 'radio',
        answers: [
            '¼ etatu',
            'pół etatu',
            'cały etat'
        ],
    },
    {
        name: 'province',
        question: 'W jakim województwie chciałbyś pracować?',
        type: 'select',
        placeholder: 'Wybierz województwo',
        answers: [
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
    },
    {
        name: 'job_position',
        question: 'Jakie jest Twoje obecne lub poprzednie stanowisko w pracy?',
        type: 'custom',
        placeholder: 'Tutaj wpisz swoje stanowisko',
        customInputs: [
            {
                placeholder: 'Tutaj wpisz swoje stanowisko',
                name: 'job_position',
                type: 'text'
            },
            {
                placeholder: 'Chcę znaleźć pierwszą pracę',
                name: 'job_position',
                type: 'checkbox'
            }
        ]
    },
    {
        name: 'experience',
        question: 'Jakie posiadasz doświadczenie w pracy na wybranych stanowiskach? (wpisz liczbę miesięcy pracy na takim lub podobnym stanowisku)',
        type: 'custom',
        placeholder: 'Tutaj wpisz swoje doświadczenie',
        customInputs: [
            {
                name: 'experience_sales',
                placeholder: 'Tutaj wpisz swoje doświadczenie',
                type: 'text',
                label: 'Sprzedaż'
            },
            {
                name: 'experience_customer_service',
                placeholder: 'Tutaj wpisz swoje doświadczenie',
                type: 'text',
                label: 'Obsługa klienta'
            },
            {
                name: 'experience_office_administration',
                placeholder: 'Tutaj wpisz swoje doświadczenie',
                type: 'text',
                label: 'Administracja biurowa'
            },
        ]
    },
    {
        name: 'education',
        question: 'Jakie posiadasz wykształcenie?',
        type: 'radio',
        answers: [
            'wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)',
            'wykształcenie wyższe (posiadają osoby, które na studiach wyższych (I, II lub III stopnia) uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)',
        ],
    },
    {
        name: "drivers_license",
        question: 'Czy posiadasz prawo jazdy kat. B?',
        type: 'radio',
        answers: ['Tak', 'Nie'],
    }
]

export const defaultQuestionsLength = defaultQuestions.length

type SurveyQuotes = {
    [t in RoleType]: string[]
} & { chooseRole: string, candidateStep: string[] }

export const surveyManQuotes: SurveyQuotes = {
    sales: [
        'Idziesz jak burza!',
        'Ponad połowa za nami! Świetnie Ci idzie.',
        'Great! Only few questions left',
        'Twoim pracodawcom na pewno się to spodoba!',
    ],
    office_administration: [
        'Idziesz jak burza!',
        'Ponad połowa za nami! Świetnie Ci idzie.',
        'Twoim pracodawcom na pewno się to spodoba!',
        'Twój profil jest już gotowy w 79%',
    ],
    customer_service: [
        'Tak trzymaj! Podoba mi się ta motywacja',
        'Idziesz jak burza!',
        'Twoim pracodawcom na pewno się to spodoba!',
        'Twój profil jest gotowy w 98%',
    ],
    candidateStep: [
        'Już prawie wiem jaka jest Twoja wymarzona praca. Kontynuujmy :)',
        ''
    ],
    chooseRole: 'Świetnie wiem już jakie oferty spełniają Twoje oczekiwania. Teraz sprawdźmy Twoje kompetencje miękkie.'
}