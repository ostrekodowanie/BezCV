import { useContext } from "react";
import { RoleProps } from "../../../constants/workForm";
import { AccountContext } from "../../../reducers/AccountProvider";
import { RoleStateContext } from "../TutorialMenu";

export default function RoleButton(props: RoleProps) {
  const { role, setRole } = useContext(RoleStateContext);
  const { account } = useContext(AccountContext);
  return (
    <button
      className={`py-3 px-6 font-medium text-sm rounded-full transition-colors ${
        role.name === props.name
          ? (account === "worker" ? "bg-[#2F66F4]" : "bg-[#F98D3D]") +
            " text-white"
          : account === "worker"
          ? "text-[#FEE9CB] hover:bg-[#2F66F4]/20"
          : "text-[#D2E4FD] hover:bg-[#F98D3D]/20"
      }`}
      onClick={() => setRole(props)}
    >
      {props.title}
    </button>
  );
}
