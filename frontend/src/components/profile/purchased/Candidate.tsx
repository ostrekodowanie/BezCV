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
import { useAppSelector } from "../../../main";
import { inputStyles } from "../../../pages/Contact";
import FilledButton from "../../FilledButton";
import Loader from "../../Loader";

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

const ReportForm = ({
  id,
  first_name,
  last_name,
  setReportForm,
}: NonPercentageAbilitiesCandidateProps & { setReportForm: any }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState<boolean | undefined>();
  const { access } = useAppSelector((state) => state.login.tokens);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/api/report",
        JSON.stringify({
          candidate: id,
          message,
        }),
        {
          headers: {
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
      <div className="bg-white shadow-primaryBig sm:rounded-3xl overflow-y-scroll sm:overflow-y-auto overflow-x-auto flex flex-col items-center xl:max-w-[50vw] gap-8 relative px-[8vw] md:px-[12vw] xl:px-[1in] py-[1in] sm:py-12">
        <h2 className="font-semibold text-xl sm:text-2xl text-center">
          Napotkałeś problem z kandydatem
          <br />
          <span className="font-bold">
            {first_name} {last_name}
          </span>
          ?
        </h2>
        <p className="text-[#3C4663] hidden sm:block text-sm sm:text-base font-medium max-w-[6in] text-center w-full">
          Skorzystaj z formularza kontaktowego, prześlij nam wiadomość a my
          odpowiemy w przeciągu 48h i postaramy się rozwiązać Twój problem
        </p>
        <form
          className="flex flex-col gap-8 sm:grid grid-cols-2 self-stretch mt-6"
          onSubmit={handleSubmit}
        >
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
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-8 mt-4">
            <FilledButton>Wyślij wiadomość</FilledButton>
            <button
              className="font-semibold text-[.8rem] min-w-max"
              onClick={() => setReportForm(false)}
            >
              Nie, wszystko w porządku
            </button>
            {isOk === false && (
              <span className="text-red-400 font-medium">
                Wystąpił błąd, spróbuj ponownie później
              </span>
            )}
            {isOk === true && (
              <span className="text-green-400 font-medium">
                Zgłoszenie pomyślnie przesłane, odpowiedź otrzymasz na swój
                email!
              </span>
            )}
            {loading && <Loader />}
          </div>
        </form>
        <button
          className="text-[#F9F9F9] absolute right-[.5in] top-12"
          onClick={() => setReportForm(false)}
        >
          <img className="max-w-[4rem]" src={xMark} alt="X" />
        </button>
      </div>
    </div>
  );
};

export default CandidatePurchased;
