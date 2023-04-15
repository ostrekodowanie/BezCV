import ProgressBar from "../../components/survey/ProgressBar";
import { useContext } from "react";
import { SurveyContext } from "../Survey";

export default function Finished() {
  const { setIsIntroduced, setRole, setRoleAnswers, setActiveQuestionIndex } =
    useContext(SurveyContext);

  const handleRoleChange = () => {
    setRoleAnswers([]);
    setActiveQuestionIndex(0);
    setRole(null);
  };

  return (
    <>
      <ProgressBar progress={1} />
      <h2 className="text-2xl sm:text-3xl font-bold text-center w-full max-w-[8in]">
        Rewelacja!
      </h2>
      <div className="flex flex-col items-center justify-between gap-6 w-full">
        <p className="text-2xl md:text-3xl font-medium text-center">
          Znamy już Twoje kompetencje do pracy w branży administracji biurowej.
          Właśnie tworzymy Twój profil dla pracodawców. Jednak coś czuje, że
          chciałbyś zwiększyć jeszcze swoje szanse na pracę marzeń.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-center">
          Zostając tutaj jeszcze 7 minut zwiększysz prawdopodobieństwo
          zatrudnienia o 30%. <span className="font-bold">Startujemy?</span>
        </p>
        <div className="flex sm:items-center sm:max-w-max sm:self-center sm:gap-4 fixed sm:static right-0 left-0 self-stretch max-w-full bottom-0">
          <button
            onClick={() => setIsIntroduced(false)}
            className="sm:rounded-full sm:text-[.8rem] w-full sm:w-max justify-center text-[#F98D3D] text-[.75rem] scale shadow-[0px_6px_30px_rgba(193,120,16,0.17)] font-semibold py-[14px] px-8 bg-white self-end flex items-center"
          >
            Teraz nie mogę
          </button>
          <button
            onClick={handleRoleChange}
            className="rounded-full text-[.8rem] max-w-max font-medium mt-8 text-white px-6 py-[14px] bg-secondary"
          >
            Jasne
          </button>
        </div>
      </div>
    </>
  );
}
