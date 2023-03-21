import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { reportSuccessMan } from "../../../../assets/profile/profile";
import FilledButton from "../../../FilledButton";

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
        Lorem ipsum dolor sit amet consectetur. Enim erat nunc neque integer
        tristique feugiat leo. Dictumst lorem in eros in velit arcu semper
        vestibulum.
      </p>
      <div className="flex flex-col items-end sm:flex-row sm:items-center gap-8 mt-6 sm:justify-end">
        <button
          className="font-semibold hover:text-[#2F66F4] transition-colors text-[.8rem] min-w-max"
          onClick={() => setReportForm(false)}
        >
          Zamknij to okno
        </button>
        <FilledButton>
          <Link to="/oferty">Super! Działajmy dalej</Link>
        </FilledButton>
      </div>
    </div>
  );
};

export default SuccessView;
