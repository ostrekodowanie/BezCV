import { useState } from "react";
import Control, { Controller } from "react-control-js";
import { bcvToken } from "../../assets/general";
import MorePointsForm from "../../components/points/MorePointsForm";
import Package from "../../components/points/Package";
import { packages } from "../../constants/points";

export default function Packages() {
  const [days, setDays] = useState<30 | 90>(30);
  return (
    <>
      <section className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] flex flex-col items-center gap-16 2xl:pt-[1.8in] bg-white min-h-screen">
        <h2 className="font-semibold text-3xl md:text-4xl text-center leading-tight md:leading-tight max-w-[6.8in]">
          Doładuj swoje konto w tokeny{" "}
          <img className="inline-block max-h-[1.2em]" src={bcvToken} alt="" /> i{" "}
          <span className="font-bold">zdobądź pracowników!</span>
        </h2>
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
            1 token
            <img
              className="max-h-[1.2em] ml-[1ch] inline-block"
              src={bcvToken}
              alt=""
            />{" "}
            umożliwia dostęp do danych kontaktowych 1 kandydata
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
      <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] bg-[#FAFCFE] py-[.7in] flex flex-col items-center gap-16 2xl:py-[.9in] xl:items-start xl:grid grid-cols-2">
        <div className="max-w-[min(6.8in,90%)] flex flex-col items-center xl:items-start gap-8">
          <h2 className="font-semibold text-3xl md:text-4xl text-center xl:text-left leading-tight md:leading-tight">
            Chcesz kupić większą ilość tokenów?
          </h2>
          <p className="text-sm md:text-base text-[#3C4663] leading-relaxed text-center xl:text-left md:leading-relaxed max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur. Nunc posuere eu a sem eget.
            Vel non nunc sit nibh consectetur blandit amet faucibus velit.
            Venenatis aliquam habitasse tempor magna vitae malesuada. Vel id
            pulvinar eget platea.
          </p>
        </div>
        <MorePointsForm />
      </section>
    </>
  );
}
