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
      <img className="max-w-[4rem] w-full" src={reportSuccessMan} alt="" />
      <h2 className="font-semibold text-xl sm:text-2xl">
        Gratulacje, zgłoszenie zostało wysłane!
      </h2>
      <p className="text-sm text-[#3C4663]">
        Lorem ipsum dolor sit amet consectetur. Enim erat nunc neque integer
        tristique feugiat leo. Dictumst lorem in eros in velit arcu semper
        vestibulum.
      </p>
      <div className="flex flex-col items-end sm:flex-row sm:items-center gap-8 mt-4 sm:justify-end">
        <button
          className="font-semibold text-[.8rem] min-w-max"
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
