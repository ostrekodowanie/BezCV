import { ChangeEvent, useContext } from "react";
import { textInputStyles } from "../../../constants/workForm";
import { SurveyContext } from "../../../pages/Survey";

export default function PostalCodeInput() {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/[^\d]/g, "");
    value.length > 2 &&
      !value.includes("-") &&
      (value = value.slice(0, 2) + "-" + value.slice(2));

    value = value.slice(0, 6);
    setCandidateAnswers((prev) => ({ ...prev, postal_code: value }));
  };
  return (
    <input
      className={textInputStyles}
      autoComplete="off"
      required={true}
      value={candidateAnswers["postal_code"]}
      onChange={handleChange}
      maxLength={6}
      id="postal-code-input"
      placeholder="Tutaj wpisz swój kod pocztowy"
      type="text"
    />
  );
}
