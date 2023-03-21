import Control, { Controller } from "react-control-js";
import { htf1, htf2, htf3, htf4 } from "../../../assets/home/employer/employer";
import { underline } from "../../../assets/home/candidate/candidate";

interface BoxProps {
  image: string;
  title: string;
  desc: string;
}

const boxes: BoxProps[] = [
  {
    image: htf1,
    title: "Rejestracja",
    desc: "Wypełniasz dane o swoim przedsiębiorstwie i masz dostęp do wszystkich kandydatów w naszej bazie.",
  },
  {
    image: htf2,
    title: "Szukanie odpowiedniego kandydata",
    desc: "Za pomocą filtrów możesz znaleźć osobę, która spełnia Twoje wymagania dotyczące stanowiska pracy.",
  },
  {
    image: htf3,
    title: "Wykupienie dostępu do kandydata",
    desc: "Znalazłeś pasujących kandydatów? Dodaj ich do ulubionych, żeby Ci nie uciekli. Następnie wybierasz jeden z zestawów pakietów, który Cię interesuje. Dostęp do danych kontaktowych 1 osoby kosztuje 1 token.",
  },
  {
    image: htf4,
    title: "Kontakt z kandydatem",
    desc: "Po wykupieniu dostępu do odpowiedniego kandydata możesz z nim porozmawiać i dokończyć proces rekrutacji u siebie w firmie! ",
  },
];

export default function HowToFind() {
  return (
    <section
      className="padding py-[1in] md:pb-[1.4in] items-center relative"
      id="jzp"
    >
      <h2 className="text-center text-3xl leading-tight xl:text-4xl xl:leading-tight mx-auto font-semibold mb-8 md:mb-16 max-w-[7in]">
        W jaki sposób mogę znaleźć{" "}
        <div className="inline-block relative">
          <span className="relative z-10">kandydata</span>
          <Control
            onScroll
            x={-30}
            opacity={1}
            className="absolute bottom-0 w-full"
            element={<img className="max-w-full" src={underline} alt="" />}
          />
        </div>{" "}
        do pracy <span className="font-bold">jeszcze dzisiaj?</span>
      </h2>
      <Controller
        opacity={1}
        onScroll={true}
        stagger={80}
        ease="ease-out"
        className="flex flex-col gap-8 xl:grid grid-cols-4 xl:items-stretch"
      >
        {boxes.map((box, i) => (
          <Control element={<Box i={i + 1} {...box} />} key={box.image} />
        ))}
      </Controller>
    </section>
  );
}

const Box = ({ i, image, title, desc }: BoxProps & { i: number }) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <img className="max-w-[1.1in] h-[1.3in]" src={image} alt="" />
      <h3 className="text-xl font-bold">
        {i}. {title}
      </h3>
      <p className="font-medium text-sm leading-loose text-[#3C4663]">{desc}</p>
    </div>
  );
};
