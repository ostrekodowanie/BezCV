import { useContext, useEffect, useState } from "react";
import { professionColorMap } from "../../../constants/professionColorMap";
import { exampleAbilities } from "../../../constants/tutorialMenu";
import AbilityRange from "../../candidate/AbilityRange";
import CircleChart from "../../candidate/CircleChart";
import { RoleStateContext } from "../TutorialMenu";

const CandidateInterfaceComponent = () => {
  const [percentage, setPercentage] = useState(37);
  const { role } = useContext(RoleStateContext);

  useEffect(() => {
    switch (role.name) {
      case "customer_service":
        setPercentage(43);
        break;
      case "office_administration":
        setPercentage(37);
        break;
      case "sales":
        setPercentage(67);
        break;
    }
  }, [role.name]);

  return (
    <div className="bg-white py-10 px-[8vw] sm:rounded-3xl flex flex-col items-center gap-4">
      <CircleChart profession={role.name} percentage={percentage} isFirst />
      <div className="flex flex-col gap-6 self-stretch max-w-[5in] w-full mx-auto mt-8">
        {exampleAbilities[role.name].map((ab) => (
          <AbilityRange
            {...ab}
            color={professionColorMap[role.name].gradient}
            key={ab.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateInterfaceComponent;
