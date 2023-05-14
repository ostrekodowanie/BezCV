import { HTMLInputTypeAttribute } from "react"
import { CandidateAnswerType, RoleType } from "./workForm"
import { provinces } from "./candidate"

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
            'poniżej 3500 zł',
            'od 3500 do 4500 zł',
            'od 4501 do 5500 zł',
            'od 5501 do 6500 zł',
            'od 6501 do 10 000 zł',
            'powyżej 10 000 zł',
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
        answers: provinces
    },
    {
        name: 'job_position',
        question: 'Jakie jest Twoje obecne lub poprzednie stanowisko w pracy?',
        type: 'custom',
        placeholder: 'Tutaj wpisz swoje stanowisko',
        customInputs: [
            {
                placeholder: 'Tutaj wpisz swoje stanowisko np. Doradca Klienta, Przedstawiciel Handlowy, Office Manager',
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
        question: 'Jakie posiadasz doświadczenie w pracy?',
        type: 'custom',
        placeholder: 'Tutaj wpisz swoje doświadczenie',
        customInputs: [
            {
                name: 'experience_sales',
                placeholder: 'Wpisz liczbę miesięcy na takim lub podobnym stanowisku',
                type: 'number',
                label: 'Sprzedaż'
            },
            {
                name: 'experience_customer_service',
                placeholder: 'Wpisz liczbę miesięcy na takim lub podobnym stanowisku',
                type: 'number',
                label: 'Obsługa klienta'
            },
            {
                name: 'experience_office_administration',
                placeholder: 'Wpisz liczbę miesięcy na takim lub podobnym stanowisku',
                type: 'number',
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
            'wykształcenie wyższe (posiadają osoby, które uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)',
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
    role: string[][]
} & { chooseRole: string, candidateStep: string[] }

export const surveyManQuotes: SurveyQuotes = {
    role: [
        ['Idziesz jak burza!',
        'Great! Only few questions left',
        'Twoim pracodawcom na pewno się to spodoba!',
        'Ponad połowa za nami! Świetnie Ci idzie.',], 
        ['Twój profil jest już gotowy w 79%',
        'Ja już widzę metę. Ostatnie kilka pytań'],
        ['Tak trzymaj! Podoba mi się ta motywacja.',
        'Twój profil jest gotowy w 98%']
    ],
    candidateStep: [
        'Już prawie wiem jaka jest Twoja wymarzona praca. Kontynuujmy :)',
    ],
    chooseRole: 'Świetnie wiem już jakie oferty spełniają Twoje oczekiwania. Teraz sprawdźmy Twoje kompetencje miękkie.'
}

export const initialCandidateAnswers = defaultQuestions.reduce((acc, { name, type, customInputs }) => {
    if (name === "preferred_professions") return { ...acc, [name]: [] };
    if (type === "custom") {
      let newObj = customInputs?.reduce(
        (acc, { name }) => ({ ...acc, [name]: "" }),
        {}
      );
      return { ...acc, ...newObj };
    }
    if (type === "date") {
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      return { ...acc, [name]: eighteenYearsAgo.toISOString().split('T')[0] };
    }
    return { ...acc, [name]: "" };
}, {} as CandidateAnswerType)

type LoaderFactType = {
    [t in RoleType]: {
        ability: string,
        desc: string
    }
}

export const loaderFacts: LoaderFactType = {
    sales: {
        ability: 'Asertywność',
        desc: 'Asertywność oznacza, że potrafisz mówić o swoim zdaniu, uczuciach i postawach w sposób szczery i bezpośredni, nie naruszając przy tym granic innych osób ani swoich własnych. Bycie asertywnym oznacza także umiejętność przyjmowania i wyrażania krytyki, pochwał oraz opinii innych. To również umiejętność stanowczego odmawiania, jeśli czegoś nie chcesz lub nie zgadzasz się z czymś, ale w sposób grzeczny i bez obrażania innych.'
    },
    office_administration: {
        ability: 'Cierpliwość',
        desc: 'Cierpliwość pozwala nam zachować spokój i kontrolę w trudnych sytuacjach, co może pomóc nam w podejmowaniu lepszych decyzji i  unikaniu konfliktów. Często jest też znaczącym czynnikiem w osiąganiu długoterminowych celów. Cecha ta pomaga nam w budowaniu i utrzymywaniu pozytywnych relacji, ponieważ pozwala na wykazanie zrozumienia i szacunku dla innych.'
    },
    customer_service: {
        ability: 'Prezentacja',
        desc: 'Prezencja to sposób, w jaki się zachowujemy i postrzegamy siebie w interakcjach z innymi ludźmi. To znaczy, że prezentujemy siebie w sposób świadomy, pewny siebie i szanujący innych, co może wpłynąć na sposób, w jaki inni nas postrzegają. O prezencji świadczy ubiór, fryzura, makijaż czy inne wizualne  efekty dbałości o siebie.'
    }
}