import Control from "react-control-js";
import { q1, q2, q3 } from "../../../assets/home/candidate/candidate";

interface QuestionListProps {
  question: string;
  answers: string[];
}

const questionLists = [
  {
    question: "Jak wygląda praca w sprzedaży?",
    answers: [
      "prezentacja i sprzedaż produktów / usług marki do obecnych lub nowych klientów",
      "budowanie pozytywnych relacji z odbiorcami",
      "doradztwo w zakresie oferty przedsiębiorstwa",
      "realizacja postawionych planów sprzedażowych i jakościowych, zarówno indywidualnych jak i zespołowych",
      "monitorowanie i koordynowanie procesu finansowania dla przypisanego klienta",
      "inicjowanie i prowadzenie spotkań handlowych",
      "przygotowanie ofert i prowadzenie negocjacji",
      "raportowanie pracy w systemie CRM",
    ],
  },
  {
    question: "Jak wygląda praca w obsłudze klienta?",
    answers: [
      "aktywne pozyskiwanie nowych klientów",
      "prezentowanie oferty przedsiębiorstwa",
      "przekazywanie informacji na temat realizacji zamówień",
      "udzielanie odpowiedzi na pytania klientów związane z produktami lub usługami firmy (poprzez kontakt telefoniczny, mailowy lub bezpośredni)",
      "rozwiązywanie bieżących problemów, które pojawiają się po stronie konsumentów",
      "analizowanie oczekiwań klientów i podejmowanie działań, mających na celu wzrost ich satysfakcji",
      "uzupełnianie i aktualizowanie bazy danych",
      "komunikacja z innymi działami firmy",
    ],
  },
  {
    question: "Jak wygląda praca w administracji biurowej?",
    answers: [
      "rejestracja i organizacja wizyt gości oraz ich przyjmowanie",
      "odbieranie telefonów, przyjmowanie i wysyłanie korespondencji firmowej oraz przesyłek kurierskich, rejestracja korespondencji",
      "prowadzenie kalendarza spotkań",
      "monitorowanie stanu zaopatrzenia biura i zamawianie",
      "artykułów spożywczych oraz biurowych",
      "współorganizacja imprez i wyjazdów firmowych",
      "obsługa oraz archiwizacja dokumentacji, rejestracja umów",
      "dbanie o prawidłowy przepływ informacji w firmie",
      "monitorowanie osób przychodzących i wychodzących z placówki",
      "regularne raportowania wykonywanych zadań",
    ],
  },
];

export default function Questions() {
  return (
    <section className="padding flex flex-col relative">
      <div className="flex flex-col items-center gap-16 xl:grid grid-cols-2 my-8 xl:my-16">
        <img
          className="w-full max-w-[70%] mx-auto sm:mx-0 sm:max-w-[4in] xl:max-w-[5in]"
          src={q1}
          alt=""
        />
        <QuestionList {...questionLists[0]} />
      </div>
      <div className="flex flex-col items-center gap-16 xl:grid grid-cols-2 my-16">
        <QuestionList {...questionLists[1]} />
        <img
          className="w-full max-w-[70%] mx-auto sm:mx-0 sm:max-w-[4in] xl:max-w-[5.5in] justify-self-end order-first xl:order-last"
          src={q2}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center gap-16 xl:grid grid-cols-2 my-16">
        <img
          className="w-full max-w-[70%] mx-auto sm:mx-0 sm:max-w-[4in] xl:max-w-[5in]"
          src={q3}
          alt=""
        />
        <QuestionList {...questionLists[2]} />
      </div>
    </section>
  );
}

const QuestionList = ({ question, answers }: QuestionListProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-3xl">{question}</h2>
      <ul className="flex flex-col gap-6 text-[.95rem] text-[#3C4663] font-medium list-accCand">
        {answers.map((ans) => (
          <Control
            opacity={1}
            x={-10}
            onScroll
            ease="ease-in-out"
            element={
              <li key={ans}>
                <span className="ml-2 block" key={"answer:" + ans}>
                  {ans}
                </span>
              </li>
            }
          />
        ))}
      </ul>
    </div>
  );
};
