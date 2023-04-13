import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { descIcon, edit, infoFormButton } from "../../assets/profile/profile";
import { infoFormQuestions } from "../../constants/profile";
import { useAppSelector } from "../../main";

export default function InfoForm() {
  const auth = useAppSelector((state) => state.login);
  const { id, form_answers } = auth.data;
  const { access } = auth.tokens;
  const [hasBeenFilled, setHasBeenFilled] = useState(
    form_answers && form_answers.filter((answer) => answer).length === 3
  );
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(form_answers || ["", "", ""]);
  const { question } =
    activeQuestionIndex <= 2
      ? infoFormQuestions[activeQuestionIndex]
      : { question: "" };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveQuestionIndex((prev) => prev + 1);
  };

  const handleEdit = () => {
    setActiveQuestionIndex(0);
    setHasBeenFilled(false);
  };

  useEffect(() => {
    if (activeQuestionIndex > 2) setHasBeenFilled(true);
    const formData = new FormData();
    formData.append("form", JSON.stringify(answers));
    axios.patchForm("/api/user/update/" + id, formData, {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
  }, [activeQuestionIndex]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <h3 className="font-medium flex items-center">
          <img className="max-h-[1.4em] mr-3" src={descIcon} alt="" />
          Informacje
        </h3>
        {hasBeenFilled && (
          <button
            type="button"
            onClick={handleEdit}
            className="sm:text-sm text-[.8rem] flex items-center text-[#3C4663] font-medium"
          >
            <img className="max-h-[1em] mr-2" src={edit} alt="" />
            Edytuj
          </button>
        )}
      </div>
      {hasBeenFilled ? (
        <div className="flex justify-between flex-col sm:flex-row gap-4">
          {answers.map((ans, i) => (
            <AnswerRef
              answer={ans}
              question={infoFormQuestions[i].question}
              key={question}
            />
          ))}
        </div>
      ) : (
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={question}
            value={answers[activeQuestionIndex]}
            onChange={(e) =>
              setAnswers((prev) => {
                let newArr = [...prev];
                newArr[activeQuestionIndex] = e.target.value;
                return newArr;
              })
            }
            className="rounded-3xl bg-[#F8F9FB] text-[#3C4663] text-sm w-full font-medium placeholder:font-medium min-w-0 placeholder:text-[#3C4663] flex flex-col p-6"
          />
          <button className="rounded-full absolute right-4 h-8 w-8 bottom-[50%] translate-y-[50%] bg-[#DADFEB] flex items-center justify-center">
            <img className="max-h-[60%]" src={infoFormButton} alt="Dalej" />
          </button>
        </form>
      )}
    </div>
  );
}

type AnswerRefProps = {
  question: string;
  answer: string;
};

const AnswerRef = ({ question, answer }: AnswerRefProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#3C4663] font-medium text-[.75rem]">{question}</p>
      <p className="text-[#3C4663] font-medium text-sm">{answer}</p>
    </div>
  );
};
