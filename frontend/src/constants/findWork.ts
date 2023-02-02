import { HTMLInputTypeAttribute } from "react"

export interface QuestionProps {
    name: string,
    question: string,
    type: HTMLInputTypeAttribute,
    answers?: string[],
    placeholder?: string
}

export const defaultQuestions: QuestionProps[] = [
    {
        name: 'name',
        question: 'Podaj proszę swoje imię i nazwisko.',
        type: 'text',
        placeholder: 'Tutaj wpisz swoje imię i nazwisko'
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
        name: 'role',
        question: 'W których zawodach chciałbyś pracować?',
        type: 'checkbox',
        answers: ['Sprzedaż', 'Obsługa klienta', 'Administracja biurowa'],
    },
    {
        name: 'salary',
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
        name: 'time',
        question: 'Jaka jest Twoja dyspozycyjność?',
        type: 'radio',
        answers: [
            '¼ etatu',
            'pół etatu',
            'cały etat'
        ],
    },
    {
        name: 'employed',
        question: 'Jakie jest Twoje obecne lub poprzednie stanowisko w pracy?',
        type: 'text',
        placeholder: 'Tutaj wpisz swoje stanowisko'
    },
    {
        name: 'experience',
        question: 'Jakie posiadasz doświadczenie w pracy na wybranych stanowiskach? (wpisz liczbę miesięcy pracy na takim lub podobnym stanowisku)',
        type: 'text',
        placeholder: 'Tutaj wpisz swoje doświadczenie'
    },
    {
        name: 'education',
        question: 'Jakie posiadasz wykształcenie?',
        type: 'radio',
        answers: [
            'wykształcenie podstawowe (posiadają osoby, które ukończyły szkołę podstawową)',
            'wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)',
            'wykształcenie wyższe (posiadają osoby, które na studiach wyższych (I, II lub III stopnia)',
            'uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)'
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