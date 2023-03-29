import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { infoFormButton } from "../../assets/profile/profile";
import { infoFormQuestions } from "../../constants/profile";
import { useAppSelector } from "../../main";

export default function InfoForm() {
  const [hasBeenFilled, setHasBeenFilled] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const { question } = infoFormQuestions[activeQuestionIndex];
  const auth = useAppSelector((state) => state.login);
  const { id } = auth.data;
  const { access } = auth.tokens;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveQuestionIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (activeQuestionIndex === 3) setHasBeenFilled(true);
    const formData = new FormData();
    formData.append("form", JSON.stringify(answers));
    axios.patchForm("/api/user/update/" + id, formData, {
      headers: {
        Authorization: "Bearer " + access,
      },
    });
  }, [activeQuestionIndex]);

  return hasBeenFilled ? (
    <div className="flex flex-col gap-4">
      {answers.map((ans) => (
        <AnswerRef answer={ans} question={question} key={question} />
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
