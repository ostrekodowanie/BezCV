import axios from "axios";
import { FormEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { xMark } from "../../../assets/general";
import { report } from "../../../assets/profile/profile";
import {
  NonPercentageAbilitiesCandidateProps,
  roleToTextMap,
} from "../../../constants/candidate";
import { professionColorMap } from "../../../constants/professionColorMap";
import ReportForm from "./ReportForm";

const CandidatePurchased = (props: NonPercentageAbilitiesCandidateProps) => {
  const { id, first_name, last_name, profession, phone } = props;
  const [reportForm, setReportForm] = useState(false);

  const handleReportForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setReportForm(true);
  };

  if (!profession) return <></>;

  return (
    <>
      <Link
        to={"/oferty/" + id}
        className="flex flex-col gap-6 w-full px-3 py-6 hover:bg-[#FAFAFA] border-b-[1px] border-[#E6E7EA] transition-colors relative"
      >
        <button onClick={handleReportForm} className="absolute right-2 top-4">
          <img className="max-w-[2rem]" src={report} alt="" />
        </button>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full flex justify-center items-center bg-[#F6F6F6]">
            <h4
              style={{
                backgroundImage: professionColorMap[profession].gradient,
              }}
              className="bg-clip-text text-transparent"
            >
              {first_name.charAt(0) + last_name.charAt(0)}
            </h4>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-[.75rem]">Nr kontaktowy: +48 {phone}</h4>
            <h3 className="text-[.75rem] flex items-center">
              Szuka pracy w:
              <span
                style={{
                  backgroundImage: professionColorMap[profession].gradient,
                }}
                className="text-[.75rem] font-medium bg-clip-text text-transparent ml-1"
              >
                {roleToTextMap[profession].profession}
              </span>
            </h3>
            <h3 className="font-medium text-sm">
              {first_name} {last_name}
            </h3>
          </div>
        </div>
      </Link>
      {reportForm && <ReportForm setReportForm={setReportForm} {...props} />}
    </>
  );
};

export default CandidatePurchased;
