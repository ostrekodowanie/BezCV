import { useContext, useEffect, useState } from "react";
import {
  employerAnswers,
  TutorialAnswerProps,
} from "../../../constants/tutorialMenu";
import { AccountContext } from "../../../reducers/AccountProvider";
import CandidateInterfaceComponent from "./CandidateInterfaceComponent";
import EmployerInterfaceComponent from "./EmployerInterfaceComponent";
import { RoleStateContext } from "../TutorialMenu";

export default function TutorialInterface() {
  const { account } = useContext(AccountContext);
  return (
    <div className="relative">
      {account === "employer" ? (
        <EmployerInterfaceComponent />
      ) : (
        <CandidateInterfaceComponent />
      )}
      {account === "employer" &&
        employerAnswers.map((ans) => <AnswerButton {...ans} />)}
    </div>
  );
}

const AnswerButton = ({ title, desc, position }: TutorialAnswerProps) => {
  const { role } = useContext(RoleStateContext);
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(false);
  }, [role.name]);
  return (
    <div className={`absolute ${position}`}>
      <button
        onClick={() => setActive((prev) => !prev)}
        className={`bg-secondary rounded-full text-xl font-semibold hidden sm:flex items-center justify-center h-12 w-12`}
      >
        {active ? "-" : "+"}
      </button>
      {active && (
        <div
          className={`absolute left-[140%] items-start text-left -top-8 flex flex-col gap-4 rounded-xl bg-white py-6 px-8 max-w-[10in] shadow-primarySmall`}
        >
          <h3 className="font-semibold text-lg text-font">{title}</h3>
          <p className="text-[#3C4663] text-[.75rem] font-medium w-[3in]">
            {desc}
          </p>
        </div>
      )}
    </div>
  );
};
