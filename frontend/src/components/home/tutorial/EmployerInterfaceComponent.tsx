import { useContext, useEffect, useState } from "react";
import CircleChart from "../../candidate/CircleChart";
import { RoleStateContext } from "../TutorialMenu";
import { professionColorMap } from "../../../constants/professionColorMap";
import AgeIcon from "../../../assets/candidate/icons/AgeIcon";
import EducationIcon from "../../../assets/candidate/icons/EducationIcon";
import {
  AvailabilityIcon,
  CashIcon,
  DriversLicenseIcon,
  JobPositionIcon,
  ProfessionIcon,
} from "../../../assets/candidate/icons/icons";
import { roleToTextMap } from "../../../constants/candidate";
import { RoleType } from "../../../constants/workForm";
import { bcvToken } from "../../../assets/general";

const generateJobPosition = (role: RoleType) => {
  switch (role) {
    case "sales":
      return "Sprzedawca sklepowy";
    case "customer_service":
      return "Recepcjonista";
    case "office_administration":
      return "Księgowa";
  }
};

const EmployerInterfaceComponent = () => {
  const { role } = useContext(RoleStateContext);
  const [percentage, setPercentage] = useState(37);
  const colorScheme = professionColorMap[role.name];
  const { gradient } = colorScheme;
  const jobPosition = generateJobPosition(role.name);

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
    <div className="bg-white py-10 px-[8vw] sm:rounded-3xl flex flex-col items-center gap-8 text-font">
      <div className="flex sm:justify-center self-stretch flex-wrap gap-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center font-semibold">
            <span
              style={{ backgroundImage: gradient }}
              className="bg-clip-text text-transparent"
            >
              KM
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Kandydat</h4>
            <h3 className="font-semibold text-sm">K**** M*******</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <ProfessionIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Szuka pracy w</h4>
            <h3
              style={{ backgroundImage: gradient }}
              className="font-semibold text-sm bg-clip-text text-transparent"
            >
              {roleToTextMap[role.name].profession}
            </h3>
          </div>
        </div>
        <div className="items-center gap-4 hidden sm:flex">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <JobPositionIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Poprzednie stanowisko</h4>
            <h3 className="font-semibold text-sm">{jobPosition}</h3>
          </div>
        </div>
        <div className="items-center gap-4 hidden sm:flex">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <AvailabilityIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Dyspozycyjność</h4>
            <h3 className="font-semibold text-sm">Cały etat</h3>
          </div>
        </div>
      </div>
      <button
        type="button"
        style={{ backgroundImage: gradient }}
        className={`rounded-full cursor-default max-w-max justify-center xl:max-w-[4in] w-full text-white text-[.8rem] font-semibold flex items-center py-4 px-10`}
      >
        Wykupiono za 1 token{" "}
        <img className="max-h-[1.4em] ml-2" src={bcvToken} alt="bCV" />
      </button>
      <div className="flex sm:justify-center self-stretch flex-wrap gap-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <AgeIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Wiek</h4>
            <h3 className="font-semibold text-sm">24 lata</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <EducationIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Wykształcenie</h4>
            <h3 className="font-semibold text-sm">Wykształcenie wyższe</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <CashIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Oczekiwania finansowe</h4>
            <h3 className="font-semibold text-sm">od 5000 zł do 5999 zł</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
            <DriversLicenseIcon {...colorScheme} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm">Prawo jazdy kat. B</h4>
            <h3 className="font-semibold text-sm">Tak</h3>
          </div>
        </div>
      </div>
      <CircleChart
        profession={role.name}
        percentage={percentage}
        isFirst={false}
      />
    </div>
  );
};

export default EmployerInterfaceComponent;
