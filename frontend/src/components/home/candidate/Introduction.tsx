import Control, { Controller } from "react-control-js";
import CountUp from "react-countup";
import {
  administration,
  bannerArrow,
  customerService,
  introductionBg,
  selling,
} from "../../../assets/home/candidate/candidate";

interface RoleBox {
  image: string;
  title: string;
  desc: string;
}

const roles: RoleBox[] = [
  {
    image: selling,
    title: "Sprzedaż",
    desc: "Między innymi: Przedstawiciel Handlowy, Specjalista ds. Sprzedaży, Doradca Klienta, Manager E-commerce, Key Account Manager",
  },
  {
    image: customerService,
    title: "Obsługa klienta",
    desc: "Między innymi: Doradca Klienta, Konsultant Infolinii, Specjalista ds. Obsługi Klienta, Specjalista ds. Telemarketingu",
  },
  {
    image: administration,
    title: "Administracja biurowa",
    desc: "Między innymi: Specjalista ds. Administracji, Asystent/ka biura, Office Manager, Specjalista ds. Kadr i Płac, Pracownik Obsługi Recepcji",
  },
];

export default function Introduction() {
  return (
    <section className="padding items-center flex flex-col gap-16 relative overflow-hidden">
      <div className="absolute -left-[2in] -right-[2in] -z-10 top-0">
        <img className="object-cover h-[62vh]" src={introductionBg} alt="" />
      </div>
      <div className="flex flex-wrap gap-8 justify-between items-center text-white pt-[.6in] pb-[1in] md:py-[1in]">
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug md:leading-snug relative">
          W bezCV jest ponad{" "}
          <span className="text-4xl md:text-5xl">
            <CountUp end={40} enableScrollSpy useEasing />
          </span>
          <br />
          zarejestrowanych pracodawców,
          <Control
            className="absolute left-[calc(100%-10vw)] sm:left-[calc(100%-6vw)] 2xl:left-full lg:hidden xl:block lg:top-4 top-[1.4in]"
            onScroll
            opacity={1}
            x={-30}
            duration={250}
            ease="ease-in-out"
            element={
              <img
                className="max-w-[15vw] xl:max-w-[10vw] 2xl:max-w-[15vw] xl:rotate-0 rotate-90 sm:rotate-180"
                src={bannerArrow}
                alt=""
              />
            }
          />
        </h2>
        <h2 className="text-xl font-medium xl:text-right">
          którzy szukają kandydata do
          <br />
          pracy w 3 sektorach
        </h2>
        <Controller
          opacity={1}
          onScroll
          viewPort={0.9}
          ease="ease-out"
          stagger={80}
          className="flex justify-center gap-8 flex-wrap xl:grid grid-cols-3 mt-8"
        >
          {roles.map((role) => (
            <Control
              element={<RoleBox {...role} key={role.title} />}
              key={"ctrl" + role.title}
            />
          ))}
        </Controller>
      </div>
    </section>
  );
}

const RoleBox = ({ title, desc, image }: RoleBox) => {
  return (
    <div className="rounded-xl flex flex-col gap-4 px-8 md:py-12 py-8 bg-white shadow-[0px_24px_61px_rgba(250,172,62,0.15)]">
      <div className="h-14 w-14 flex items-center justify-center rounded bg-[#FFFAF5]">
        <img className="max-w-[60%] max-h-[60%]" src={image} alt="" />
      </div>
      <h3 className="font-semibold text-xl text-font">{title}</h3>
      <p className="text-sm text-[#3C4663]">{desc}</p>
    </div>
  );
};
