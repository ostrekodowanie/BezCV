import Control from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../../assets/general";
import { desktop, surveyVideo } from "../../../assets/home/home";

export default function HowToFindJob() {
  return (
    <section
      className="padding py-[.5in] md:py-[1in] flex flex-col gap-16 xl:grid grid-cols-[3fr_4fr] items-center"
      id="jzp"
    >
      <Control
        onScroll
        x={-20}
        opacity={1}
        element={
          <div className="flex flex-col items-center xl:items-start gap-4 md:max-w-[50vw]">
            <h3 className="text-secondary">WYPEŁNIENIE ANKIETY ONLINE</h3>
            <h2 className="font-semibold text-center xl:text-left text-4xl md:text-5xl md:self-stretch md:max-w-[90%] xl:min-w-[5.1in] xl:self-start leading-tight md:leading-tight">
              W jaki sposób mogę znaleźć pracę?
            </h2>
            <p className="text-[.8rem] md:text-sm my-2 text-center xl:text-left font-medium text-[#444444] leading-relaxed md:leading-relaxed">
              Wypełniasz specjalnie przygotowany formularz, który pozwala
              określić Twoje predyspozycje do pracy na jednym z dostępnych
              stanowisk. Im więcej nam o sobie opowiesz tym większa szansa, że
              znajdziesz swoją wymarzoną pracę.
            </p>
            <Link
              to="/ankieta"
              className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-[14px] px-10 mt-4 bg-primary"
            >
              Opowiedz nam o sobie{" "}
              <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
            </Link>
          </div>
        }
      />
      <Control
        opacity={1}
        delay={200}
        onScroll
        element={
          <div className="relative w-full">
            <div className="absolute top-[4%] bottom-[10%] left-[12%] right-[12%] overflow-hidden max-w-[95%] flex flex-col items-center justify-center">
              <video className="w-full" autoPlay loop src={surveyVideo}></video>
            </div>
            <img className="w-full" src={desktop} alt="" />
          </div>
        }
      />
    </section>
  );
}
