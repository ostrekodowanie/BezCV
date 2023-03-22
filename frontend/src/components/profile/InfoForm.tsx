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
  const { access } = useAppSelector((state) => state.login.tokens);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveQuestionIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (answers.filter((ans) => ans).length === 3) setHasBeenFilled(true);
    axios.post("/api/profile/form", JSON.stringify(answers), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
    });
  }, [answers]);

  return hasBeenFilled ? (
    <div className="flex flex-wrap items-center gap-4 justify-between">
      <p className="text-[#3C4663] font-medium text-sm">
        Wypełniłeś/aś formularz, gratulacje!
      </p>
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
