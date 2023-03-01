export interface TutorialAnswerProps {
    position: string,
    title: string,
    desc: string
}

export const candidateAnswers: TutorialAnswerProps[] = [
    {
        position: 'top-[18%] left-[32%]',
        title: 'Podstawowe informacje',
        desc: 'To tutaj pracodawcy zobaczą podstawowe informacje o Tobie oraz będą mieli okazję lepiej Cię poznać'
    },
    {
        position: 'left-[30%] top-[52%]',
        title: 'Istotne umiejętności',
        desc: 'W tej sekcji pracodawcy będą mieli możliwość poznać Twoje mocne oraz słabe strony na podstawie Twoich umiejętności'
    },
    {
        position: 'left-[80%] top-[52%]',
        title: 'Potencjalni kandydaci',
        desc: 'Tutaj wyświetlamy pracodawcom profile kandydatów, z którymi konkurujesz o pracę'
    },
]

export const employerAnswers: TutorialAnswerProps[] = [
    {
        position: 'top-[18%] left-[32%]',
        title: 'Podstawowe informacje',
        desc: 'To tutaj zobaczysz podstawowe informacje o wybranym przez siebie kandydacie oraz będziesz miał okazję lepiej go poznać'
    },
    {
        position: 'left-[30%] top-[52%]',
        title: 'Istotne umiejętności',
        desc: 'W tej sekcji będziesz miał możliwość poznania mocnych oraz słabych cech Twojego kandydata na podstawie jego umiejętności'
    },
    {
        position: 'left-[80%] top-[52%]',
        title: 'Potencjalni kandydaci',
        desc: 'Tutaj wyświetlamy Ci profile, które znacząco przypominają cechami wybranego przez Ciebie kandydata'
    },
]