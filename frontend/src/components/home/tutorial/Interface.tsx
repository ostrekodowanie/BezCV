import { useContext, useState } from "react";
import {
  candidateAnswers,
  employerAnswers,
  TutorialAnswerProps,
} from "../../../constants/tutorialMenu";
import { AccountContext } from "../../../reducers/AccountProvider";
import {
  tutorialCustomerService,
  tutorialOfficeAdministration,
  tutorialSales,
} from "../../../assets/home/home";
import { RoleStateContext } from "../TutorialMenu";

const InterfaceImage = () => {
  const imageClassName = "w-full rounded-3xl object-cover h-[5in]";
  const { role } = useContext(RoleStateContext);
  switch (role.name) {
    case "sales":
      return <img className={imageClassName} src={tutorialSales} alt="" />;
    case "customer_service":
      return (
        <img className={imageClassName} src={tutorialCustomerService} alt="" />
      );
    case "office_administration":
      return (
        <img
          className={imageClassName}
          src={tutorialOfficeAdministration}
          alt=""
        />
      );
  }
};

export default function TutorialInterface() {
  const { account } = useContext(AccountContext);

  return (
    <div className="relative">
      <InterfaceImage />
      {account === "worker"
        ? candidateAnswers.map((ans) => <AnswerButton {...ans} />)
        : employerAnswers.map((ans) => <AnswerButton {...ans} />)}
    </div>
  );
}

const AnswerButton = ({ title, desc, position }: TutorialAnswerProps) => {
  const { account } = useContext(AccountContext);
  const [active, setActive] = useState(false);

  return (
    <div className={`absolute ${position}`}>
      <button
        onClick={() => setActive((prev) => !prev)}
        className={`${
          account === "worker" ? "bg-primary" : "bg-secondary"
        } rounded-full text-xl font-semibold hidden sm:flex items-center justify-center h-12 w-12`}
      >
        {active ? "-" : "+"}
      </button>
      {active && (
        <div
          className={`absolute left-[140%] items-start text-left -top-8 flex flex-col gap-4 rounded-xl bg-white py-6 px-8 max-w-[10in] ${
            account === "worker"
              ? "shadow-secondarySmall"
              : "shadow-primarySmall"
          }`}
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
