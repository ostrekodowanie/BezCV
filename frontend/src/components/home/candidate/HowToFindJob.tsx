import Control from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../../assets/general";
import { desktopSurvey } from "../../../assets/home/home";

export default function HowToFindJob() {
  return (
    <section
      className="padding py-[1in] md:py-[1.4in] flex flex-col gap-16 xl:grid grid-cols-[3fr_4fr] xl:items-center"
      id="jzp"
    >
      <Control
        onScroll
        x={-20}
        opacity={1}
        element={
          <div className="flex flex-col items-center xl:items-auto gap-4 md:max-w-[50vw]">
            <h3 className="text-secondary text-center xl:text-left">
              WYPEŁNIENIE ANKIETY ONLINE
            </h3>
            <h2 className="font-semibold text-center xl:text-left text-4xl xl:text-5xl leading-tight xl:leading-tight">
              W jaki sposób mogę znaleźć pracę?
            </h2>
            <p className="text-sm text-center xl:text-left my-2 font-medium text-[#444444] leading-relaxed">
              Wypełniasz specjalnie przygotowany formularz, który pozwala
              określić Twoje predyspozycje do pracy na jednym z dostępnych
              stanowisk. Im więcej nam o sobie opowiesz tym większa szansa, że
              znajdziesz swoją wymarzoną pracę.
            </p>
            <Link
              to="/praca"
              className="rounded-full mx-auto xl:mx-0 max-w-max text-white text-[.8rem] font-semibold flex items-center py-[14px] px-10 mt-4 bg-primary"
            >
              Opowiedz nam o sobie{" "}
              <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
            </Link>
          </div>
        }
      />
      <Control
        className="mx-auto xl:mx-0"
        opacity={1}
        delay={200}
        onScroll
        element={
          <img
            className="max-w-[8in] w-full xl:max-w-auto"
            src={desktopSurvey}
            alt=""
          />
        }
      />
    </section>
  );
}
