import axios from "axios";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { arrowRight } from "../../assets/general";
import { textInputStyles } from "../../constants/workForm";
import { SurveyContext } from "../../pages/Survey";
import Loader from "../Loader";

type PhoneCodePopupProps = {
  setActiveQuestionIndex: Dispatch<SetStateAction<number>>;
  setPhoneCodePopupActive: Dispatch<SetStateAction<boolean>>;
};

export default function PhoneCodePopup({
  setActiveQuestionIndex,
  setPhoneCodePopupActive,
}: PhoneCodePopupProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const { setStep, setIsSurveyFilled, candidateAnswers } =
    useContext(SurveyContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/api/survey/phone/verify",
        JSON.stringify({
          phone:
            typeof candidateAnswers.phone === "string"
              ? candidateAnswers.phone.split(" ").join("")
              : candidateAnswers.phone,
          code,
        }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        switch (res.status) {
          case 204:
            setPhoneCodePopupActive(false);
            return setActiveQuestionIndex((prev) => prev + 1);
          case 200:
            setPhoneCodePopupActive(false);
            setIsSurveyFilled(res.data);
            return setStep("role");
        }
      })
      .catch(() => setError("Błędny kod!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <form
        className="max-w-[4in] w-full bg-white shadow-secondaryBig rounded-3xl px-6 sm:px-12 py-12 flex flex-col gap-8 animate-opacity"
        onSubmit={handleSubmit}
      >
        <p className="font-semibold text-center">
          Przesłaliśmy SMS z kodem weryfikacyjnym na podany przez Ciebie numer
          telefonu.
        </p>
        <input
          className={textInputStyles}
          onChange={(e) => setCode(e.target.value)}
          required
          autoComplete="off"
          type="text"
          name="phone_code"
          id="phone_code"
          placeholder="Tutaj wpisz swój kod"
        />
        <div className="flex items-center justify-end gap-4 mt-4">
          {loading && <Loader />}
          {error && <p className="text-red-400">{error}</p>}
          <button className="bg-secondary transition-colors font-medium border-primary text-white rounded-full flex items-center text-[.8rem] py-3 px-8 max-w-max">
            Prześlij
            <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}
