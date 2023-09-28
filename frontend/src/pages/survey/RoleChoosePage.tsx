import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { buttonArrow } from "../../assets/account/account";
import { roles, RoleType } from "../../constants/workForm";
import { SurveyContext } from "../Survey";
import ProgressBar from "../../components/survey/ProgressBar";

export default function RoleChoosePage({
  setRole,
}: {
  setRole: Dispatch<SetStateAction<RoleType | null>>;
}) {
  const { isSurveyFilled, setActiveQuestionIndex } = useContext(SurveyContext);
  const [chosen, setChosen] = useState<RoleType | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActiveQuestionIndex(0);
    setRole(chosen);
  };

  return (
    <>
      <ProgressBar progress={1 / 1} />
      <form
        className="flex flex-col flex-1 max-h-[80%] my-auto xl:justify-between gap-8 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-8 self-stretch w-full">
          <h2 className="text-3xl font-bold text-center w-full max-w-[8in] mx-auto">
            W której branży chciałbyś pracować?
          </h2>
          <div className="flex flex-col w-full gap-4 sm:grid grid-cols-3">
            {roles
              .filter((role) => !isSurveyFilled[role.name])
              .map((role) => (
                <label
                  className={`py-6 px-12 sm:p-12 w-full text-center transition-colors border-[2px] flex flex-col cursor-pointer font-semibold gap-4 sm:gap-8 sm:max-w-[4in] mx-auto relative bg-white rounded-3xl items-center ${
                    chosen === role.name
                      ? "text-[#F9AE3D] shadow-[0px_56px_114px_rgba(250,175,62,0.25)] border-[#F9AE3D]"
                      : "shadow-secondaryBig border-transparent"
                  }`}
                  htmlFor={role.name}
                  key={"label:" + role.name}
                >
                  <input
                    className="-z-50 absolute opacity-0"
                    value={role.name}
                    type="radio"
                    key={role.name}
                    id={role.name}
                    onChange={(e) => e.target.checked && setChosen(role.name)}
                    name="role"
                  />
                  <img
                    className="max-w-[30%] sm:max-w-[1.6in] max-h-[1.2in]"
                    src={role.image}
                    alt=""
                  />
                  {role.title}
                </label>
              ))}
          </div>
        </div>
        <button
          type="submit"
          className="fixed bottom-0 right-0 left-0 sm:static justify-center text-[.75rem] w-full sm:w-max sm:rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] px-8 bg-secondary sm:self-end flex items-center"
        >
          Rozpocznij ankietę{" "}
          <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" />
        </button>
      </form>
    </>
  );
}
