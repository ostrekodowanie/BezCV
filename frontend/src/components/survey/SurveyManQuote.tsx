import { useContext, useEffect, useState } from "react";
import { surveyManQuotes } from "../../constants/findWork";
import { SurveyContext } from "../../pages/survey/Survey";

export default function SurveyManQuote() {
  const { activeQuestionIndex, step, role } = useContext(SurveyContext);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    console.log(activeQuestionIndex);
    if (step === "role" && !role) return setQuote(surveyManQuotes.chooseRole);
    if (activeQuestionIndex % 5 === 0)
      return setQuote(
        role ? surveyManQuotes[role][activeQuestionIndex / 5] || "" : ""
      );
    setQuote("");
  }, [activeQuestionIndex]);

  return quote ? (
    <q className="text-white text-center text-xl font-semibold">{quote}</q>
  ) : (
    <></>
  );
}
