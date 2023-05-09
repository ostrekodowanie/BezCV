import { useContext } from "react";
import Select from "react-select";
import { SurveyContext } from "../../../pages/Survey";
import { QuestionProps } from "../../../constants/findWork";

export default function SelectInput({ name, answers }: QuestionProps) {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  return (
    <Select
      className="self-stretch bg-white text-sm shadow-[0px_2px_43px_-2px_rgba(215,105,23,0.08)] font-semibold placeholder:font-medium"
      placeholder="Wybierz województwo"
      value={
        candidateAnswers[name]
          ? {
              label: candidateAnswers[name],
              value: candidateAnswers[name],
            }
          : ""
      }
      options={answers?.map((ans) => ({ label: ans, value: ans }))}
      onChange={(e) =>
        setCandidateAnswers((prev) => ({
          ...prev,
          [name]: typeof e === "string" ? e : e?.value,
        }))
      }
    />
  );
}
