import { FormEvent, useState } from "react";
import { infoFormButton } from "../../assets/profile/profile";
import { infoFormQuestions } from "../../constants/profile";

export default function InfoForm() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const { question } = infoFormQuestions[activeQuestionIndex];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveQuestionIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
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
