import axios from "axios";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { xMark } from "../../../assets/general";
import { NonPercentageAbilitiesCandidateProps } from "../../../constants/candidate";
import useReportFormData from "../../../hooks/useReportFormData";
import { useAppSelector } from "../../../main";
import FilledButton from "../../FilledButton";
import Loader from "../../Loader";
import Intro from "./report-form/Intro";
import ReportFormProgressBar from "./report-form/ReportFormProgressBar";
import SuccessView from "./report-form/SuccessView";

export default function ReportForm({
  id,
  setReportForm,
}: NonPercentageAbilitiesCandidateProps & {
  setReportForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [formIndex, setFormIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState<boolean | undefined>();
  const { title } = useReportFormData(formIndex);
  const { access } = useAppSelector((state) => state.login.tokens);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOk(undefined);
    if (formIndex < 5) {
      setFormIndex((prev) => prev + 1);
      return;
    }
    setLoading(true);
    axios
      .post(
        "/api/report",
        JSON.stringify({
          message,
          candidate: id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        }
      )
      .then(() => setIsOk(true))
      .catch(() => setIsOk(false))
      .finally(() => setLoading(false));
  };

  return (
    <div className="inset-0 fixed bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white shadow-primaryBig sm:rounded-3xl xl:rounded-[2rem] overflow-y-scroll sm:overflow-y-auto overflow-x-auto flex flex-col xl:w-[8in] gap-8 md:gap-10 relative px-[8vw] sm:px-[.8in] py-[1in] sm:py-16">
        {isOk === true ? (
          <SuccessView setReportForm={setReportForm} />
        ) : (
          <>
            <ReportFormProgressBar formIndex={formIndex} />
            <div className="flex justify-between items-center gap-4">
              <h2 className="font-semibold text-xl sm:text-2xl">{title}</h2>
              <button
                className="text-[#F9F9F9]"
                onClick={() => setReportForm(false)}
              >
                <img className="max-w-[3rem]" src={xMark} alt="X" />
              </button>
            </div>
            {formIndex < 5 && <FormComponent formIndex={formIndex} />}
            <form
              className="flex flex-col gap-8 sm:grid grid-cols-2 self-stretch"
              onSubmit={handleSubmit}
            >
              {formIndex === 5 && (
                <div className="flex flex-col gap-2 col-span-2">
                  <label
                    className="font-semibold text-[.8rem]"
                    htmlFor="report-message"
                  >
                    Treść wiadomości
                  </label>
                  <textarea
                    className="min-h-[2in] py-3 px-6 resize-none rounded-3xl border-[#CCCFD4] border-[1px] bg-[#FCFCFC] min-w-0 w-full max-w-full"
                    onChange={(e) => setMessage(e.target.value)}
                    name="report"
                    id="report-message"
                  ></textarea>
                </div>
              )}
              <div className="flex flex-col items-end sm:flex-row sm:items-center gap-8 mt-4 col-span-2 sm:justify-end">
                {loading && <Loader />}
                <button
                  className="font-semibold hover:text-[#2F66F4] transition-colors text-[.8rem] min-w-max"
                  onClick={() => setReportForm(false)}
                >
                  Nie, wszystko w porządku
                </button>
                <FilledButton type="submit">
                  {formIndex === 5
                    ? "Wyślij zgłoszenie"
                    : "Rozumiem, idę dalej"}
                </FilledButton>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const FormComponent = ({ formIndex }: { formIndex: number }) => {
  switch (formIndex) {
    case 0:
      return <Intro />;
    default:
      return <ReportFormInfo formIndex={formIndex} />;
  }
};

const ReportFormInfo = ({ formIndex }: { formIndex: number }) => {
  const { paragraph } = useReportFormData(formIndex);
  return <p className="text-[#3C4663] leading-relaxed">{paragraph}</p>;
};
