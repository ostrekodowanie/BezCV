import { pdsMan, pdsWoman } from "../../../assets/home/candidate/candidate";

interface PersonalDataTopicProps {
  title: string;
  desc: string;
}

const topics: PersonalDataTopicProps[] = [
  {
    title: "Weryfikujemy pracodawców za pomocą bazy KRS i CEiDG",
    desc: "",
  },
  {
    title: "Szyfrowanie wyników i zabezpieczenie danych w Internecie",
    desc: "",
  },
  {
    title:
      "Wypełniając ankietę zgadzasz się na przetwarzanie danych i przekazanie ich do zainteresowanych pracodawców",
    desc: "Przy obydwu formach wypełnienia kwestionariusza będziesz poproszony o przeczytanie Polityki Prywatności oraz Regulaminu Portalu. To od Ciebie zależy, czy będziesz jednym z kandydatów w bazie BezCV.",
  },
];

export default function PersonalDataSecurity() {
  return (
    <section className="padding pb-[1.4in] md:pb-[1.8in] 2xl:pb-[2.2in] items-center flex flex-col gap-8 relative">
      <img
        className="absolute md:left-[12vw] 2xl:left-[18vw] bottom-0 h-[6.5in] hidden lg:block"
        src={pdsMan}
        alt=""
      />
      <div className="flex flex-col gap-8 max-w-[6in] relative z-10">
        <h2 className="text-3xl xl:text-4xl font-semibold text-center mx-auto mb-8 max-w-[4.5in]">
          Jak <span className="font-bold">chronimy Twoje</span> dane osobowe?
        </h2>
        <div className="flex flex-col gap-8">
          {topics.map((topic) => (
            <TopicSelect {...topic} />
          ))}
        </div>
      </div>
      <img
        className="absolute md:right-[12vw] 2xl:right-[18vw] bottom-0 h-[6in] hidden lg:block"
        src={pdsWoman}
        alt=""
      />
      <div className="absolute right-0 left-0 -z-10 translate-y-[50%] bottom-0 bg-[#F9AE3D] blur-[125px] opacity-25 h-[300px]" />
    </section>
  );
}

const TopicSelect = ({ title, desc }: PersonalDataTopicProps) => {
  return (
    <div className="rounded-3xl bg-white py-4 px-8 text-center sm:text-left shadow-[0px_4px_64px_rgba(56,95,194,0.1)]">
      <h3 className="font-medium">{title}</h3>
    </div>
  );
};
