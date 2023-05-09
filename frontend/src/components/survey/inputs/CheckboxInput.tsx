import { useContext } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { SurveyContext } from "../../../pages/Survey";
import { radioInputStyles } from "../../../constants/workForm";

export default function CheckboxInput({
  answers,
  type,
  question,
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
            checked={candidateAnswers[name].includes(ans)}
            name={question}
            onChange={(e) => {
              if (e.target.checked)
                return setCandidateAnswers((prev) => ({
                  ...prev,
                  [name]: [...prev[name], e.target.value],
                }));
              return setCandidateAnswers((prev) => {
                let old = prev[name];
                if (typeof old === "string") return prev;
                let newArr = old.filter((item) => item != e.target.value);
                return { ...prev, [name]: newArr };
              });
            }}
          />
          {ans}
        </label>
      ))}
    </>
  );
}
