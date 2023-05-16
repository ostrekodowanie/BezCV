import { useContext } from "react";
import { arrowRight } from "../../assets/general";
import { error } from "../../assets/survey/survey";
import { SurveyContext } from "../../pages/Survey";

export default function SurveyError() {
  const { setIsIntroduced } = useContext(SurveyContext);
  return (
    <div className="flex flex-col items-center gap-4 mt-24">
      <img className="max-w-[2in]" src={error} alt="Error" />
      <h3 className="font-bold text-xl text-center">Upss.. mamy problem</h3>
      <p className="text-sm text-[#3C4663] leading-relaxed max-w-[4in] text-center">
        Nasz system napotkał błąd i nie możemy teraz zrealizować tej operacji,
        spróbuj ponownie pózniej
      </p>
      <button
        onClick={() => setIsIntroduced(false)}
        className="rounded-full mt-2 text-[.8rem] max-w-max font-medium text-white px-6 py-[14px] bg-secondary flex items-center"
      >
        Wróć
        <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
      </button>
    </div>
  );
}
