import { useContext } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { textInputStyles } from "../../../constants/workForm";
import { SurveyContext } from "../../../pages/Survey";

export default function DefaultInput({
  name,
  question,
  placeholder,
  type,
}: QuestionProps) {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  return (
    <input
      className={textInputStyles}
      autoComplete="off"
      required={true}
      value={candidateAnswers[name]}
      onChange={(e) =>
        setCandidateAnswers((prev) => ({ ...prev, [name]: e.target.value }))
      }
      id={question}
      placeholder={placeholder}
      type={type}
    />
  );
}
