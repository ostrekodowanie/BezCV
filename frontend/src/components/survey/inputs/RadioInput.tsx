import { useContext } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { SurveyContext } from "../../../pages/Survey";

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
        <label
          className={`min-w-0 select-none px-8 py-4 text-sm shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] transition-colors border-[2px] rounded-2xl w-full font-semibold flex items-center gap-4 cursor-pointer ${
            candidateAnswers[name] === ans
              ? "text-[#F9AE3D] border-[#F9AE3D] bg-[#FDEEDB]"
              : "bg-white text-font border-transparent"
          }`}
          htmlFor={ans}
          key={"label:" + ans}
        >
          <input
            className="absolute -z-50 opacity-0"
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
