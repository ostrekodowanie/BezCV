import Control, { Controller } from "react-control-js";
import { bcvToken } from "../../../assets/general";
import { useState } from "react";
import { packages } from "../../../constants/points";
import Package from "../../points/Package";

export default function Points() {
  const [days, setDays] = useState<30 | 90>(30);
  return (
    <section className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] flex flex-col items-center gap-16 2xl:pt-[1.8in] bg-white min-h-screen">
      <div
        className="flex flex-col gap-8 xl:gap-16 items-center xl:flex-row xl:justify-center self-stretch 2xl:px-[4vw]"
        id="punkty"
      >
        <h2 className="font-semibold text-center xl:text-left text-3xl md:text-4xl leading-tight md:leading-tight xl:min-w-[4.6in] max-w-[4.6in]">
          Rejestracja w BezCV jest{" "}
          <span className="font-bold">zupełnie darmowa!</span>
        </h2>
        <p className="text-[#3C4663] font-medium text-sm text-center xl:text-left jakarta leading-relaxed max-w-[6in]">
          Dzięki temu możesz zobaczyć naszą bazę i sprawdzić, czy posiadamy
          kandydatów odpowiednich do pracy dla Twojego przedsiębiorstwa.
          Natomiast, jeżeli chcesz wykupić dostęp do danych kontaktowych
          kandydatów masz 3 opcje:
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
          {packages
            .filter((pack) => pack.days === days)
            .map((pack) => (
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
