import { ChangeEvent, useContext, useEffect, useState } from "react";
import { textInputStyles } from "../../../constants/workForm";
import { SurveyContext } from "../../../pages/Survey";

const PhoneInput = () => {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  const [input, setInput] = useState(
    String(candidateAnswers.phone).replace(/(\d{3})(?=\d)/g, "$1 ")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
    value = value.slice(0, 11);
    setInput(value);
  };

  useEffect(() => {
    setCandidateAnswers((prev) => ({
      ...prev,
      phone: input.split(" ").join(""),
    }));
  }, [input]);

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4 self-stretch items-center">
      <span className="font-semibold text-sm">+48</span>
      <input
        className={textInputStyles}
        autoComplete="off"
        required={true}
        value={input}
        onChange={handleChange}
        id={"Pod jakim numerem pracodawca będzie mógł się z Tobą skontaktować?"}
        placeholder={"Tutaj wpisz swój numer telefonu"}
        type={"tel"}
      />
    </div>
  );
};

export default PhoneInput;
