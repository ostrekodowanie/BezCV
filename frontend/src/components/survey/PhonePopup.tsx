import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { arrowRight, xMark } from "../../assets/general";
import axios from "axios";
import Loader from "../Loader";
import { textInputStyles } from "../../constants/workForm";
import { SurveyContext } from "../../pages/Survey";
import ReactGA from "react-ga";

export default function PhonePopup({
  setPhonePopupActive,
}: {
  setPhonePopupActive: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isOk, setIsOk] = useState<boolean | undefined>();
  const {
    setStep,
    setCandidateAnswers,
    setIsIntroduced,
    setIsSurveyFilled,
    setRole,
    setRoleAnswers,
    setActiveQuestionIndex,
  } = useContext(SurveyContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isOk) {
      setStep("role");
      setRole(null);
      setCandidateAnswers((prev) => ({
        ...prev,
        phone: phone.split(" ").join(""),
      }));
      setIsSurveyFilled({
        office_administration: false,
        sales: false,
        customer_service: false,
      });
      setIsIntroduced(true);
      axios
        .post(
          "/api/survey/phone/verify",
          JSON.stringify({
            phone: phone.split(" ").join(""),
            code,
          })
        )
        .then((res) => {
          ReactGA.event({
            category: "Ankieta",
            action: "Start",
          });
          setStep("role");
          setRole(null);
          setRoleAnswers([]);
          setActiveQuestionIndex(0);
          setCandidateAnswers((prev) => ({
            ...prev,
            phone: phone.split(" ").join(""),
          }));
          setIsSurveyFilled(res.data);
          setIsIntroduced(true);
        })
        .catch(() => setError("Nieprawidłowy kod!"))
        .finally(() => setLoading(false));
    } else {
      axios
        .post(
          "/api/survey/continue",
          JSON.stringify({
            phone: phone.split(" ").join(""),
          })
        )
        .then(() => setIsOk(true))
        .catch((err) => setError(err.response.data))
        .finally(() => setLoading(false));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (isOk) {
      setCode(value);
    } else {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
      value = value.slice(0, 11);
      setPhone(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div
        onClick={() => setPhonePopupActive(false)}
        className="absolute inset-0 bg-black/40"
      />
      <div className="bg-white z-10 shadow-primaryBig sm:rounded-3xl xl:rounded-[2rem] overflow-y-scroll sm:overflow-y-auto overflow-x-auto flex flex-col xl:w-[8in] gap-8 md:gap-10 relative px-[8vw] sm:px-[.8in] py-[1in] sm:py-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-xl sm:text-2xl text-center">
            {isOk ? "Zweryfikuj numer telefonu" : "Witaj z powrotem!"}
          </h2>
          <p className="text-[#3C4663] font-semibold text-sm text-center w-full jakarta leading-relaxed max-w-[6in]">
            {isOk
              ? "Podaj kod weryfikacyjny, który wysłaliśmy na twój numer telefonu za pośrednictwem SMS"
              : "Podaj numer telefonu, którym rejestrowałeś się wcześniej do naszego portalu."}
          </p>
          <button
            className="text-[#F9F9F9] absolute right-12 top-8"
            onClick={() => setPhonePopupActive(false)}
          >
            <img className="max-w-[3rem]" src={xMark} alt="X" />
          </button>
        </div>
        <form
          className="flex flex-col gap-8 self-stretch"
          onSubmit={handleSubmit}
        >
          {isOk ? (
            <>
              <input
                className={textInputStyles}
                autoComplete="off"
                required={true}
                value={code}
                onChange={handleChange}
                placeholder={"Tutaj wpisz swój kod"}
                type="text"
              />
            </>
          ) : (
            <>
              <div className="grid grid-cols-[max-content_1fr] gap-4 self-stretch items-center">
                <span className="font-semibold text-sm">+48</span>
                <input
                  className={textInputStyles}
                  autoComplete="off"
                  required={true}
                  value={phone}
                  onChange={handleChange}
                  placeholder={"Tutaj wpisz swój numer telefonu"}
                  type={"tel"}
                />
              </div>
            </>
          )}
          <div className="flex items-center gap-6 mt-4 col-span-2 justify-end">
            {loading && <Loader />}
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              className='className="justify-center bg-secondary w-max transition-colors font-semibold border-primary text-white rounded-full flex items-center text-[.8rem] py-[14px] px-8 self-start max-w-max"'
              type="submit"
            >
              Prześlij
              <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
