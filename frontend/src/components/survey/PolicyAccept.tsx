import { buttonArrow } from "../../assets/account/account";
import PrivacyPolicy from "../docs/components/PrivacyPolicy";

type PolicyAcceptProps = {
  onAccept: () => void;
};

export default function PolicyAccept({ onAccept }: PolicyAcceptProps) {
  return (
    <div className="inset-0 fixed bg-black/50 z-50 flex items-center justify-center">
      <form
        onSubmit={onAccept}
        className="bg-white sm:rounded-3xl xl:rounded-[2rem] overflow-y-scroll sm:overflow-y-auto overflow-x-auto flex flex-col items-center xl:w-[8in] gap-8 md:gap-10 relative px-[8vw] sm:px-[.8in] py-[1in] sm:py-16"
      >
        <h3 className="font-semibold text-xl">Polityka Prywatności bezCV</h3>
        <div className="overflow-y-scroll max-h-[5in]">
          <PrivacyPolicy />
        </div>
        <button
          type="submit"
          className="justify-center text-[.75rem] w-full sm:w-max rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] px-8 bg-secondary flex items-center"
        >
          Akceptuję politykę prywatności bezCV{" "}
          <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="->" />
        </button>
      </form>
    </div>
  );
}
