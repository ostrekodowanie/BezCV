import { useContext, useEffect, useState } from "react";
import { surveyManQuotes } from "../../constants/findWork";
import { SurveyContext } from "../../pages/Survey";

export default function SurveyManQuote() {
  const { activeQuestionIndex, step, role, isSurveyFilled } =
    useContext(SurveyContext);
  const surveyCount = Object.values(isSurveyFilled).filter(
    (item) => item
  ).length;
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (step === "role") {
      if (!role) {
        return setQuote(surveyManQuotes.chooseRole);
      } else {
        return (activeQuestionIndex + 1) % 5 === 0
          ? setQuote(
              surveyManQuotes.role[surveyCount][
                (activeQuestionIndex + 1) / 5 - 1
              ] || ""
            )
          : setQuote("");
      }
    } else {
      return (activeQuestionIndex + 1) % 5 === 0
        ? setQuote(
            surveyManQuotes.candidateStep[(activeQuestionIndex + 1) / 5 - 1] ||
              ""
          )
        : setQuote("");
    }
  }, [activeQuestionIndex]);

  return quote ? (
    <p className="text-white text-center text-xl font-semibold px-4 mx-auto">
      {quote}
    </p>
  ) : (
    <></>
  );
}
