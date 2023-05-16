import { FormEvent, useRef, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import PrivacyPolicy from "../docs/components/PrivacyPolicy";
import Statute from "../docs/components/Statute";

type PolicyAcceptProps = {
  hide: () => void;
  onAccept: () => void;
};

export default function PolicyAccept({ hide, onAccept }: PolicyAcceptProps) {
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const [formIndex, setFormIndex] = useState<0 | 1>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    formIndex === 1 ? onAccept() : setFormIndex(1);
    wrapperRef.current && wrapperRef.current.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className="inset-0 fixed z-50 flex items-center justify-center">
      <div onClick={hide} className="absolute inset-0 bg-black/40" />
      <form
        onSubmit={handleSubmit}
        className="bg-white z-10 sm:rounded-3xl xl:rounded-[2rem] overflow-y-scroll sm:overflow-y-auto overflow-x-auto flex flex-col items-center xl:w-[8in] gap-8 md:gap-10 relative px-[8vw] sm:px-[.8in] py-[1in] sm:py-16"
      >
        <h3 className="font-semibold text-xl">
          {formIndex === 0 ? "Polityka Prywatności bezCV" : "Regulamin bezCV"}
        </h3>
        <div className="overflow-y-scroll max-h-[5in]" ref={wrapperRef}>
          {formIndex === 0 ? <PrivacyPolicy /> : <Statute />}
        </div>
        <button
          type="submit"
          className="justify-center text-[.75rem] w-full sm:w-max rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] px-8 bg-secondary flex items-center"
        >
          Akceptuję {formIndex === 0 ? "politykę prywatności" : "regulamin"}{" "}
          bezCV <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" />
        </button>
      </form>
    </div>
  );
}
