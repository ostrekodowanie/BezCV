import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { report } from "../../../assets/profile/profile";
import { NonPercentageAbilitiesCandidateProps } from "../../../constants/candidate";
import { inputStyles } from "../../../pages/ChooseAccount";
import FilledButton from "../../FilledButton";

const CandidatePurchased = (props: NonPercentageAbilitiesCandidateProps) => {
  const { id, first_name, last_name, profession, abilities } = props;
  const [reportForm, setReportForm] = useState(false);
  return (
    <>
      <Link
        to={"/oferty/" + id}
        className="flex flex-col gap-6 w-full rounded-3xl px-6 py-3 hover:bg-[#FAFAFA] transition-colors relative"
      >
        <button
          onClick={() => setReportForm(true)}
          className="absolute right-2 top-4"
        >
          <img className="max-w-[2rem]" src={report} alt="" />
        </button>
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 rounded-full flex justify-center items-center bg-[#F6F6F6]">
            <h4 className="text-primary">{first_name.charAt(0)}</h4>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[.75rem]">
              Szuka pracy w:{" "}
              <span className="font-medium text-primary">{profession}</span>
            </h3>
            <h3 className="font-medium text-sm">
              {first_name} {last_name}
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {abilities?.map((ab) => (
            <div className="flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#EBF0FE]">
              <h4 className="text-primary text-[.75rem] font-medium">{ab}</h4>
            </div>
          ))}
        </div>
      </Link>
      {reportForm && <ReportForm setReportForm={setReportForm} {...props} />}
    </>
  );
};

const ReportForm = ({
  id,
  first_name,
  last_name,
  setReportForm,
}: NonPercentageAbilitiesCandidateProps & { setReportForm: any }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.post(
      "/api/report",
      JSON.stringify({
        candidate: id,
        message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="inset-0 absolute bg-black/10">
      <div className="bg-white shadow-primaryBig rounded-3xl flex flex-col gap-4 relative">
        <h2 className="font-semibold">
          Zgłoś kandydata{" "}
          <span className="font-bold">
            {first_name} {last_name}
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className={inputStyles}
            onChange={(e) => setMessage(e.target.value)}
            name="report"
            id="message"
            placeholder="Opisz nam swój problem"
          ></textarea>
          <FilledButton>Prześlij</FilledButton>
        </form>
        <button
          className="text-[#F9F9F9] absolute right-4 top-4"
          onClick={() => setReportForm(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CandidatePurchased;
