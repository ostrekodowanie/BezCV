import Control from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../../assets/general";
import { underline } from "../../../assets/home/candidate/candidate";
import { bgBoy, bgGirl } from "../../../assets/home/employer/employer";

export default function EmployerLanding() {
  return (
    <>
      <section className="padding pt-[1in] md:pt-[2in] pb-16 items-center flex flex-col gap-12 relative overflow-hidden">
        <h1 className="font-semibold text-3xl leading-snug md:text-4xl md:leading-snug xl:text-[2.75rem] xl:leading-snug text-center relative z-10 mb-32 md:mb-0">
          Znajdź{" "}
          <div className="relative inline-block">
            <span className="relative z-10">dopasowanego</span>
            <img
              className="absolute bottom-0 w-full underline-animation"
              src={underline}
              alt=""
            />
          </div>{" "}
          pracownika,
          <br /> bez tworzenia oferty o pracę!
        </h1>
        <div className="flex flex-col md:grid grid-cols-2 gap-8 relative">
          <Control
            className="absolute md:-bottom-[130%] md:-left-[19vw] -z-10 md:top-auto -left-[4vw] bottom-auto -top-[1.4in]"
            ease="ease-out"
            opacity={1}
            x={-20}
            element={
              <img
                className="md:max-w-[calc(5in+2vw)] max-w-[1.8in]"
                src={bgBoy}
                alt=""
              />
            }
          />
          <Control
            className="absolute md:-bottom-full md:-right-[19vw] md:top-auto -z-10 bottom-0 -top-[1.4in] -right-[4vw]"
            opacity={1}
            x={20}
            ease="ease-out"
            element={
              <img
                className="md:max-w-[calc(6.5in+2vw)] max-w-[2.2in]"
                src={bgGirl}
                alt=""
              />
            }
          />
          <div className="bg-white p-10 flex flex-col gap-4 shadow-[0px_4px_79px_-2px_rgba(56,95,194,0.19)] rounded-3xl relative">
            <h2 className="md:text-xl font-bold text-left">
              bezCV to portal, który...
            </h2>
            <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]">
              zrzesza kandydatów do pracy określając ich kompetencje miękkie.
              Dzięki wstępnej rekrutacji{" "}
              <span className="font-semibold">
                nie musisz przeglądać kilkudziesięciu CV
              </span>
              , a kandydatów masz w jednym miejscu!
            </p>
          </div>
          <div className="bg-white p-10 flex flex-col gap-4 shadow-[0px_4px_79px_-2px_rgba(56,95,194,0.19)] rounded-3xl relative">
            <h2 className="md:text-xl font-bold text-left">
              Oszczędzaj czas i pieniądze...
            </h2>
            <p className="text-sm text-[#3C4663] leading-loose max-w-[4in]">
              dzięki naszemu rozwiązaniu. Dopasowanie kandydatów do Twoich{" "}
              <span className="font-semibold">indywidualnych wymagań</span>{" "}
              pozwala <span className="font-semibold">zmniejszyć koszt</span>{" "}
              pozyskania pracownika i{" "}
              <span className="font-semibold">
                skrócić czas trwania rekrutacji.
              </span>
            </p>
          </div>
        </div>
        <Link
          to="/oferty"
          className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-[14px] px-10 bg-primary"
        >
          Znajdź pracownika{" "}
          <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
        </Link>
      </section>
      <div className="relative overflow-hidden h-[25vh] sm:h-[40vh]">
        <div className="absolute -left-[2in] -right-[8vw] bg-empbg bg-cover -z-10 bg-no-repeat top-0 h-full" />
      </div>
    </>
  );
}
