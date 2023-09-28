import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import Control from "react-control-js";
import {
  tutorialUnderline,
  underline,
} from "../../assets/home/candidate/candidate";
import { RoleProps, roles } from "../../constants/workForm";
import { AccountContext, AccountType } from "../../providers/AccountProvider";
import RoleButton from "./tutorial/RoleButton";
import EmployerInterfaceComponent from "./tutorial/EmployerInterfaceComponent";
import CandidateInterfaceComponent from "./tutorial/CandidateInterfaceComponent";

type RoleStateContextType = {
  setRole: Dispatch<SetStateAction<RoleProps>>;
  role: RoleProps;
};

export const RoleStateContext = createContext<RoleStateContextType>(null!);

const Title = ({ account }: { account: AccountType }) => {
  switch (account) {
    case "employer":
      return (
        <h2 className="px-10 sm:p-0 text-3xl md:text-4xl font-semibold leading-snug md:leading-snug relative max-w-[6.2in]">
          Jak wygląda{" "}
          <div className="relative inline-block">
            <span className="relative z-10">profil kandydata</span>
            <Control
              onScroll
              x={-30}
              opacity={1}
              className="absolute bottom-0 w-full"
              element={<img className="max-w-full" src={underline} alt="" />}
            />
          </div>{" "}
          i czego mogę się o nim dowiedzieć?
        </h2>
      );
    case "worker":
      return (
        <h2 className="px-10 sm:p-0 text-3xl md:text-4xl font-semibold leading-snug md:leading-snug relative max-w-[6.2in]">
          Jak będzie wyglądał{" "}
          <div className="relative inline-block">
            <span className="relative z-10">Twój profil</span>
            <Control
              onScroll
              x={-30}
              opacity={1}
              className="absolute left-0 right-0 bottom-0 w-full"
              element={
                <img className="w-full" src={tutorialUnderline} alt="" />
              }
            />
          </div>{" "}
          i czego pracodawca będzie mógł się o Tobie dowiedzieć?
        </h2>
      );
    default:
      return <></>;
  }
};

export default function TutorialMenu() {
  const [role, setRole] = useState<RoleProps>(roles[0]);
  const { account } = useContext(AccountContext);

  const contextValue = useMemo(
    () => ({
      role,
      setRole,
    }),
    [role, setRole]
  );

  return (
    <section className="sm:px-[8vw] md:px-[12vw] 2xl:px-[16vw] pb-[1in] md:pb-[1.4in] 2xl:pb-[1.8in] text-white">
      <RoleStateContext.Provider value={contextValue}>
        <div
          className={`${
            account === "worker" ? "bg-secondary" : "bg-primary"
          } sm:rounded-3xl px-2 py-10 sm:p-10 md:p-16 flex flex-col xl:max-w-[90%] sm:mx-auto gap-4`}
        >
          <Title account={account} />
          <div
            className={`flex flex-col lg:flex-row lg:items-center gap-2 py-2 min-w-0 px-4 mx-10 sm:mx-0 ${
              account === "worker"
                ? "bg-[rgba(249,191,123,0.61)]"
                : "bg-[rgba(255,255,255,0.3)]"
            } my-8 sm:w-max rounded-3xl lg:rounded-full`}
          >
            {roles.map((role) => (
              <RoleButton {...role} />
            ))}
          </div>
          <div className="relative">
            {account === "employer" ? (
              <EmployerInterfaceComponent />
            ) : (
              <CandidateInterfaceComponent />
            )}
          </div>
        </div>
      </RoleStateContext.Provider>
    </section>
  );
}
