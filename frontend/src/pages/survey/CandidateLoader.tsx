import { MouseEvent, useContext } from "react";
import { buttonArrow } from "../../assets/account/account";
import DotsLoader from "../../components/survey/DotsLoader";
import { SurveyContext } from "../Survey";

export default function CandidateLoader({ isLoading }: { isLoading: boolean }) {
  const { setActiveQuestionIndex, setStep } = useContext(SurveyContext);
  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveQuestionIndex(0);
    setStep("role");
  };
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className={isLoading ? "opacity-100" : "opacity-0"}>
        <DotsLoader />
      </div>
      <div className="flex flex-col items-center justify-between gap-8 w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          Dobre wieści! Dane zostały poprawnie zapisane w zaszyfrowanej chmurze!
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-center">
          Teraz czas na sprawdzenie Twoich kompetencji miękkich na wybranym
          stanowisku. Wypełnienie ankiety może rozpędzić Twoją zawodową karierę.
          Będziesz za darmo otrzymywać oferty pracy dopasowane do Twoich
          preferencji.
        </p>
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="justify-center text-[.75rem] w-full sm:w-max rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] px-8 bg-secondary flex items-center mt-4 disabled:opacity-40"
        >
          Przenieś mnie do ankiety!{" "}
          <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" />
        </button>
      </div>
    </div>
  );
}
