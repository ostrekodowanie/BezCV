import Control, { Controller } from "react-control-js";
import { bcvToken } from "../../../assets/general";
import { useState } from "react";

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
  const [days, setDays] = useState<30 | 90>(30);
  return (
    <section className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] flex flex-col items-center gap-16 2xl:pt-[1.8in] bg-white min-h-screen">
      <div className="flex flex-col gap-8 xl:gap-16 items-center xl:flex-row xl:justify-center self-stretch 2xl:px-[4vw]">
        <h2 className="font-semibold text-center xl:text-left text-3xl md:text-4xl leading-tight md:leading-tight xl:min-w-[4.6in] max-w-[4.6in]">
          Rejestracja w BezCV jest{" "}
          <span className="font-bold">zupełnie darmowa!</span>
        </h2>
        <p className="text-[#3C4663] text-sm text-center xl:text-left jakarta leading-relaxed max-w-[6in]">
          <span className="font-medium">
            Dzięki temu możesz zobaczyć naszą bazę i sprawdzić, czy posiadamy
            kandydatów odpowiednich do pracy dla Twojego przedsiębiorstwa.
          </span>{" "}
          Natomiast, jeżeli chcesz wykupić dostęp do danych kontaktowych
          kandydatów <span className="font-medium">masz 3 opcje:</span>
        </p>
      </div>
      <div className="flex flex-col gap-8 items-center self-stretch w-full">
        <div className="flex items-center gap-2 bg-[#F7FAFC] py-2 px-4 w-max rounded-full">
          <button
            className={`py-[14px] px-8 font-semibold flex items-center text-[.8rem] rounded-full ${
              days === 30 ? "text-white bg-primary" : "text-[5D7EAD]"
            }`}
            onClick={() => setDays(30)}
          >
            Plan 30 dniowy
          </button>
          <button
            className={`py-[14px] px-8 font-semibold flex items-center text-[.8rem] rounded-full ${
              days === 90 ? "text-white bg-primary" : "text-[5D7EAD]"
            }`}
            onClick={() => setDays(90)}
          >
            Plan 90 dniowy
          </button>
        </div>
        <p className="font-medium w-full text-center">
          1 token{" "}
          <img className="max-h-[1.2em] inline-block" src={bcvToken} alt="" />{" "}
          umożliwia dostęp do danych kontaktowych jednego kandydata
        </p>
        <Controller
          stagger={50}
          opacity={1}
          ease="ease-out"
          delay={500}
          className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap self-stretch gap-8 xl:grid grid-cols-3 mt-8"
        >
          {packages.map((pack) => (
            <Control
              className="control-package"
              element={<Package {...pack} days={days} key={pack.points} />}
            />
          ))}
        </Controller>
      </div>
    </section>
  );
}

const Package = ({ points, price, days }: PackageProps & { days: 30 | 90 }) => {
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
      <h4 className="text-[#5D7EAD] text-center">
        Okres ważności 3 tokenów - {days} dni
      </h4>
    </div>
  );
};
