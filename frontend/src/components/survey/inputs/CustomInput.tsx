import { useContext } from "react";
import { QuestionProps } from "../../../constants/findWork";
import { SurveyContext } from "../../../pages/Survey";
import { textInputStyles } from "../../../constants/workForm";

export default function CustomInput({ customInputs }: QuestionProps) {
  const { candidateAnswers, setCandidateAnswers } = useContext(SurveyContext);
  return (
    <>
      {customInputs?.map((input) => {
        switch (input.type) {
          case "checkbox":
            return (
              <label
                className="flex items-center gap-4 ml-4 text-sm self-stretch w-max"
                htmlFor={"checkbox:" + input.name}
              >
                <input
                  className="font-medium"
                  checked={candidateAnswers[input.name] === input.placeholder}
                  type={input.type}
                  value={input.placeholder}
                  id={"checkbox:" + input.name}
                  onChange={(e) =>
                    e.target.checked
                      ? setCandidateAnswers((prev) => ({
                          ...prev,
                          [input.name]: e.target.value,
                        }))
                      : setCandidateAnswers((prev) => ({
                          ...prev,
                          [input.name]: "",
                        }))
                  }
                />
                {input.placeholder}
              </label>
            );
          case "number":
            return (
              <div className="flex flex-col gap-4 self-stretch">
                {input.label && (
                  <label className="text-sm font-medium" htmlFor={input.name}>
                    {input.label}:
                  </label>
                )}
                <input
                  className={textInputStyles}
                  required
                  type={"text"}
                  autoComplete="off"
                  value={candidateAnswers[input.name]}
                  placeholder={input.placeholder}
                  id={input.name}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.startsWith("0")) value = value.substring(1);
                    setCandidateAnswers((prev) => ({
                      ...prev,
                      [input.name]: value.replace(/\D/g, "") || 0,
                    }));
                  }}
                />
              </div>
            );
          default:
            return (
              <div className="flex flex-col gap-4 self-stretch">
                {input.label && (
                  <label className="text-sm font-medium" htmlFor={input.name}>
                    {input.label}:
                  </label>
                )}
                <input
                  className={textInputStyles}
                  required
                  type={input.type}
                  autoComplete="off"
                  value={candidateAnswers[input.name]}
                  placeholder={input.placeholder}
                  id={input.name}
                  onChange={(e) => {
                    setCandidateAnswers((prev) => ({
                      ...prev,
                      [input.name]: e.target.value,
                    }));
                  }}
                />
              </div>
            );
        }
      })}
    </>
  );
}
