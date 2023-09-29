import { useContext, useRef } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { SurveyContext } from "../../../pages/Survey";

export default function CheckboxInput({
  answers,
  question,
  type,
  name,
}: QuestionProps) {
  const inputRef = useRef<HTMLInputElement>();
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  return (
    <>
      {answers?.map((ans, i) => (
        <label
          className={`min-w-0 px-8 py-4 select-none text-sm shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] transition-colors border-[2px] rounded-2xl w-full font-semibold flex items-center gap-4 cursor-pointer ${
            candidateAnswers[name].includes(ans)
              ? "text-[#F9AE3D] border-[#F9AE3D] bg-[#FDEEDB]"
              : "bg-white text-font border-transparent"
          }`}
          htmlFor={ans}
          key={"label:" + ans}
        >
          <input
            className="absolute opacity-0 -z-50"
            value={ans}
            type={type}
            key={ans}
            id={ans}
            ref={(ref) => ref && i === 0 && (inputRef.current = ref)}
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
