import { bestseller, priceUnderline } from "../../../assets/points/points";
import Control, { Controller } from "react-control-js";
import { underline } from "../../../assets/home/candidate/candidate";
import { pointsMan } from "../../../assets/home/employer/employer";
import { bcvToken } from "../../../assets/general";

interface PackageProps {
  points: number;
  price: number;
}

const packages: PackageProps[] = [
  {
    points: 10,
    price: 499,
  },
  {
    points: 15,
    price: 699,
  },
  {
    points: 20,
    price: 899,
  },
];

export default function Points() {
  return (
    <section className="padding py-[1.4in] 2xl:py-[1.8in] bg-white min-h-screen">
      <div className="flex flex-col gap-4 mb-20">
        <h2 className="text-3xl leading-snug md:text-4xl md:leading-snug font-semibold max-w-[5in] mb-4">
          Rejestracja w bezCV jest{" "}
          <div className="inline-block relative font-bold">
            <span className="relative z-10">zupełnie darmowa!</span>
            <Control
              onScroll
              x={-30}
              duration={100}
              opacity={1}
              className="absolute -bottom-1 left-0 w-full"
              element={<img className="w-full" src={underline} alt="" />}
            />
          </div>
        </h2>
        <p className="text-sm leading-loose font-medium text-[#3C4663] max-w-[7in]">
          Dzięki temu możesz zobaczyć naszą bazę i sprawdzić, czy posiadamy
          kandydatów odpowiednich do pracy w Twoim przedsiębiorstwie.
        </p>
        <p className="text-sm leading-loose font-medium text-[#3C4663]">
          Natomiast, jeżeli chcesz wykupić dostęp do danych kontaktowych
          kandydatów masz 3 opcje:
        </p>
      </div>
      <Controller
        stagger={50}
        opacity={1}
        ease="ease-out"
        delay={500}
        onScroll
        className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap self-stretch gap-8 xl:grid grid-cols-3 mt-8"
      >
        {packages.map((pack) => (
          <Control
            className="control-package"
            element={<Package {...pack} key={pack.points} />}
          />
        ))}
      </Controller>
    </section>
  );
}

const Package = ({ points, price }: PackageProps) => {
  return (
    <div className="flex flex-col self-stretch h-full justify-end gap-8 rounded-3xl relative items-center p-12 bg-white shadow-primaryBig flex-1">
      <h2 className="font-semibold text-4xl md:text-5xl w-max flex flex-col gap-4 items-center">
        {points}
        <span className="font-medium text-xl flex items-center">
          tokenów{" "}
          <img
            className="ml-2 max-h-[1.2em] inline-block"
            src={bcvToken}
            alt="bCV"
          />
        </span>
      </h2>
      <div className="h-[1px] self-stretch bg-[#ECF0F2]" />
      <h3 className="font-medium text-2xl">
        {price} zł{" "}
        <sup className="bg-clip-text text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] font-medium">
          /netto
        </sup>
      </h3>
      <h3 className="font-medium text-[#5D7EAD] text-2xl">
        {(price / points).toFixed(2).toString()} zł{" "}
        <sup className="text-[#5D7EAD] font-medium">/1 token bCV</sup>
      </h3>
      {points === 20 && (
        <img
          className="hidden xl:block absolute bottom-full left-[50%] -translate-x-[50%] max-w-[80%]"
          src={pointsMan}
          alt=""
        />
      )}
    </div>
  );
};
