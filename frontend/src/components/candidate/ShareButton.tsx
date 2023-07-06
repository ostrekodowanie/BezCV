import { MouseEvent } from "react";
import { pdf } from "../../assets/candidate/candidate";
import { RoleType } from "../../constants/workForm";
import { professionColorMap } from "../../constants/professionColorMap";

type ShareButtonProps = {
  disabled: boolean;
  profession?: RoleType;
};

const ShareButton = ({ disabled, profession }: ShareButtonProps) => {
  const handlePDF = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mx-[8vw] sm:mx-0 print:hidden">
      <button
        type="button"
        onClick={handlePDF}
        style={{
          backgroundImage: profession
            ? professionColorMap[profession].gradient
            : professionColorMap.office_administration.gradient,
          opacity: disabled ? 0.4 : 1,
        }}
        disabled={disabled}
        className={`rounded-full w-max justify-center min-w-max max-h-max text-white text-[.8rem] font-semibold flex items-center py-4 px-10 ${
          disabled
            ? "cursor-default"
            : "hover:scale-[1.02] transition-transform"
        }`}
      >
        Udostępnij profil kandydata{" "}
        <img className="max-h-[1.4em] ml-2" src={pdf} alt="" />
      </button>
      {disabled && (
        <div className="shadow-[0px_6px_52px_-2px_rgba(211,161,25,0.22)] p-6 bg-[#FEFAEF] rounded-3xl">
          <p className="text-[.8rem] font-medium text-center text-[#3C4663]">
            Możliwość udostępnienia profilu po wykupieniu dostępu do tego
            kontaktu.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
