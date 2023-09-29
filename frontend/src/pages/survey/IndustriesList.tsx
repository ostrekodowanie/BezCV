import { FormEvent, useEffect, useState } from "react";
import { buttonArrow } from "../../assets/account/account";
import ProgressBar from "../../components/survey/ProgressBar";
import { Industry } from "../../types/candidate";
import axios from "axios";
import { RoleType } from "../../constants/workForm";
import Loader from "../../components/Loader";
import Badge from "../../components/candidate/Badge";
import { roleToTextMap } from "../../constants/candidate";
import { professionColorMap } from "../../constants/professionColorMap";

type Props = {
  profession: RoleType;
  industries: Industry[];
  changeIndustry: (industries: Industry) => void;
  submit: () => void;
};

export default function IndustryList({
  submit,
  profession,
  industries,
  changeIndustry,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [industriesToChoose, setIndustriesToChoose] = useState<Industry[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios
        .get(`/api/survey/industries?profession=${profession}`)
        .finally(() => setIsLoading(false));
      setIndustriesToChoose(data);
    })();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <ProgressBar progress={1 / 1} />
      <form
        className="flex flex-col flex-1 max-h-[80%] my-auto xl:justify-between gap-8 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-8 self-stretch w-full">
          <h2 className="text-3xl font-bold text-center w-full max-w-[8in] mx-auto">
            W których branżach najbardziej chciałbyś pracować?
          </h2>
          <div className="mt-4 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-lg font-bold">
                Wybierz branże dla{" "}
                <span
                  style={{
                    backgroundImage: professionColorMap[profession].gradient,
                  }}
                  className="text-transparent bg-clip-text"
                >
                  {roleToTextMap[profession].profession}
                </span>
              </h3>
              <span className="text-[.75rem]">
                {"(Możesz wybrać więcej niż jedną)"}
              </span>
            </div>
            <div className="flex w-full gap-4 flex-wrap justify-center min-h-max">
              {industriesToChoose.map((industry) => (
                <Badge
                  profession={profession}
                  industry={industry}
                  isChecked={
                    industries.findIndex((item) => item.id === industry.id) !==
                    -1
                  }
                  handleChange={changeIndustry}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={industries.length === 0}
          className="fixed bottom-0 right-0 left-0 sm:static justify-center text-[.75rem] w-full sm:w-max sm:rounded-full sm:text-[.8rem] text-white font-semibold py-[14px] disabled:opacity-40 px-8 bg-secondary sm:self-end flex items-center"
        >
          Następne pytanie
          <img className="ml-2 max-h-[.9em]" src={buttonArrow} alt="" />
        </button>
      </form>
    </>
  );
}
