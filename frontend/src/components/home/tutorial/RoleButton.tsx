import { useContext } from "react";
import { RoleProps } from "../../../constants/workForm";
import { AccountContext } from "../../../reducers/AccountProvider";
import { RoleStateContext } from "../TutorialMenu";

export default function RoleButton(props: RoleProps) {
  const { role, setRole } = useContext(RoleStateContext);
  const { account } = useContext(AccountContext);
  return (
    <button
      className={`py-3 px-6 font-semibold text-sm rounded-full ${
        role.name === props.name
          ? (account === "worker"
              ? "bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)]"
              : "bg-[linear-gradient(289.36deg,#F98D3D_9.9%,#F9AE3D_62.28%)]") +
            " text-white"
          : account === "worker"
          ? "text-[#FEE9CB]"
          : "text-[#D2E4FD]"
      }`}
      onClick={() => setRole(props)}
    >
      {props.title}
    </button>
  );
}
