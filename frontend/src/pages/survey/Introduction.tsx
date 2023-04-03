import Control, { Controller } from "react-control-js";
import { Link } from "react-router-dom";
import { arrowRight } from "../../assets/general";
import { surveyIntroductionMan, triangle } from "../../assets/survey/survey";

export default function Introduction() {
  return (
    <section className="padding pt-[1.4in] md:pt-[2in] bg-white lg:grid grid-cols-[1fr_2fr] gap-8 overflow-hidden">
      <Control
        className="w-full lg:h-[8in] h-[6in] hidden lg:block relative"
        ease="ease-out"
        x={-20}
        opacity={1}
        element={
          <img
            className="object-top object-cover"
            src={surveyIntroductionMan}
            alt=""
          />
        }
      />
      <Controller
        className="flex flex-col gap-8 lg:gap-12 text-[#3C4663] font-medium mb-[1in]"
        ease="ease-out"
        delay={200}
        stagger={100}
        opacity={1}
      >
        <Control
          className="w-full lg:w-[5in]"
          delay={200}
          opacity={1}
          ease="ease-out"
          element={
            <div className="bg-white rounded-3xl shadow-[0px_8px_64px_rgba(199,147,70,0.17)] p-8 flex flex-col items-stretch gap-2 relative">
              <small className="text-secondary font-semibold">Cześć!</small>
              <p className="font-medium w-full">
                <span className="font-bold">Miło mi Ciebie poznać.</span> Jestem
                Mariusz i{" "}
                <span className="font-bold">
                  przeprowadzę Cię przez kwestionariusz,
                </span>{" "}
                który pozwoli mi Cię lepiej poznać.
              </p>
              <img
                className="rotate-[115deg] hidden lg:block absolute -left-12 -bottom-8 w-[1in]"
                src={triangle}
                alt=""
              />
            </div>
          }
        />
        <Control
          element={
            <div className="bg-white rounded-3xl shadow-[0px_8px_64px_rgba(199,147,70,0.17)] p-8 flex flex-col gap-4 relative">
              <img
                className="rotate-[160deg] absolute hidden lg:block -left-16 -top-6 w-[1in]"
                src={triangle}
                alt=""
              />
              <p>
                Chciałbyś mieć{" "}
                <span className="font-bold">większą satysfakcję z pracy</span> i{" "}
                <span className="font-bold">zarabiać więcej niż teraz?</span>
              </p>
              <p>
                A może chcesz dowiedzieć się, jakie są{" "}
                <span className="font-bold">Twoje mocne strony zawodowe</span> i
                do których profesji{" "}
                <span className="font-bold">najlepiej pasujesz</span>?
              </p>
              <p>
                <span className="font-bold">Wypełniając</span> tą ankietę możesz{" "}
                <span className="font-bold">rozpędzić</span> swoją zawodową
                karierę. Będziesz za darmo otrzymywać oferty pracy{" "}
                <span className="font-bold">
                  dopasowane do Twoich preferencji.
                </span>
              </p>
            </div>
          }
        />
        <Control
          opacity={1}
          delay={200}
          element={
            <Link
              to="/praca/ankieta"
              className="bg-secondary transition-colors font-semibold border-primary text-white rounded-full flex items-center text-[.8rem] py-[14px] px-8 mt-4 self-start max-w-max"
            >
              Przenieś mnie do ankiety!{" "}
              <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
            </Link>
          }
        />
      </Controller>
    </section>
  );
}
