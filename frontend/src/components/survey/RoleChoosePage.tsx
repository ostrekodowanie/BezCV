import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { buttonArrow } from "../../assets/account/account";
import { roles, RoleType } from "../../constants/workForm";
import { SurveyContext } from "../../pages/survey/Survey";

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
                  className={`py-6 px-12 sm:p-12 w-full text-center transition-all flex flex-col cursor-pointer font-semibold gap-8 sm:max-w-[4in] mx-auto relative bg-white rounded-3xl shadow-secondaryBig items-center ${
                    chosen === role.name
                      ? "text-secondary shadow-[0px_56px_114px_rgba(250,175,62,0.25)]"
                      : "shadow-secondaryBig"
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
                    className="max-w-[50%] sm:max-w-[1.6in] max-h-[1.2in]"
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
          className="fixed sm:static sm:rounded-full right-0 left-0 bottom-0 text-[.8rem] text-white ml-auto self-end font-bold py-4 px-8 bg-secondary flex items-center mt-8 xl:mt-0"
        >
          Rozpocznij ankietę{" "}
          <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" />
        </button>
      </form>
    </>
  );
}
