import { useContext } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { SurveyContext } from "../../../pages/Survey";
import { radioInputStyles } from "../../../constants/workForm";

export default function RadioInput({
  answers,
  question,
  type,
  name,
}: QuestionProps) {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  return (
    <>
      {answers?.map((ans) => (
        <label className={radioInputStyles} htmlFor={ans} key={"label:" + ans}>
          <input
            value={ans}
            type={type}
            key={ans}
            id={ans}
            name={question}
            required
            checked={candidateAnswers[name] === ans}
            onChange={(e) =>
              setCandidateAnswers((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
          />
          {ans}
        </label>
      ))}
    </>
  );
}
