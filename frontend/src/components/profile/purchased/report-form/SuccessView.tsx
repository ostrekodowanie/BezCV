import { Dispatch, SetStateAction } from "react";
import { reportSuccessMan } from "../../../../assets/profile/profile";

const SuccessView = ({
  setReportForm,
}: {
  setReportForm: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col text-center items-center gap-4">
      <img
        className="max-w-[1.4in] w-full mb-6"
        src={reportSuccessMan}
        alt=""
      />
      <h2 className="font-semibold text-xl sm:text-2xl">
        Gratulacje, zgłoszenie zostało wysłane!
      </h2>
      <p className="text-sm text-[#3C4663]">
        Dziękujemy za przesłanie formularza, za pośrednictwem którego będziemy
        mogli przeanalizować problem z kandydatem. Konsultant może się
        skontaktować w sprawie weryfikacji powodu dokonanego zwrotu. W przypadku
        pozytywnego rozpatrzenia wniosku, przyznamy Ci automatycznie należny
        token bCV.
      </p>
      <button
        className="font-semibold hover:text-[#2F66F4] transition-colors text-[.8rem] min-w-max"
        onClick={() => setReportForm(false)}
      >
        Zamknij to okno
      </button>
    </div>
  );
};

export default SuccessView;
