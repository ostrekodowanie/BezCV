import { MouseEvent, useState } from "react";
import { pdf } from "../../assets/candidate/candidate";
import { RoleType } from "../../constants/workForm";
import { professionColorMap } from "../../constants/professionColorMap";

type ShareButtonProps = {
  profession?: RoleType;
};

const ShareButton = ({ profession }: ShareButtonProps) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  const handlePDF = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    setHasBeenCopied(true);
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
        }}
        disabled={hasBeenCopied}
        className={`rounded-full w-max justify-center min-w-max max-h-max text-white text-[.8rem] font-semibold flex items-center py-4 px-10 ${
          hasBeenCopied
            ? "cursor-default"
            : "hover:scale-[1.02] transition-transform"
        }`}
      >
        {hasBeenCopied
          ? "Skopiowano link do profilu!"
          : "Udostępnij profil kandydata"}{" "}
        {!hasBeenCopied && (
          <img className="max-h-[1.4em] ml-2" src={pdf} alt="" />
        )}
      </button>
    </div>
  );
};

export default ShareButton;
