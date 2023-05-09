import { useContext } from "react";
import { SurveyContext } from "../../../pages/Survey";
import { QuestionProps } from "../../../constants/findWork";
import { textInputStyles } from "../../../constants/workForm";

export default function BirthdateInput({
  name,
  question,
  placeholder,
}: QuestionProps) {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    if (selectedDate > eighteenYearsAgo) {
      setCandidateAnswers((prev) => ({
        ...prev,
        [name]: eighteenYearsAgo.toISOString().split("T")[0],
      }));
    } else {
      setCandidateAnswers((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    }
  };
  return (
    <input
      className={textInputStyles}
      autoComplete="off"
      required={true}
      type="date"
      value={candidateAnswers[name]}
      onChange={handleBirthdateChange}
      id={question}
      placeholder={placeholder}
    />
  );
}
