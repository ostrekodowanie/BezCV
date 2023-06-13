import { useContext } from "react";
import {
  AgeIcon,
  CashIcon,
  DriversLicenseIcon,
  EducationIcon,
} from "../../../assets/candidate/icons/icons";
import { Details } from "../../../constants/candidate";
import { Loading } from "../../../types/candidate";
import FollowButton from "../../candidate/FollowButton";
import { ColorSchemeContext } from "../../../pages/Candidate";

export default function SideBar({
  id,
  birth_date,
  education,
  salary_expectation,
  is_followed,
  drivers_license,
  ...loading
}: { id: string } & Details & Loading) {
  const colorScheme = useContext(ColorSchemeContext);
  return (
    <div className="flex flex-col gap-8 row-[2/4] col-[1/2] print:row-[1/4] bg-white sm:rounded-3xl shadow-primaryBig px-[8vw] print:py-6 print:sm:py-6 py-10 sm:p-10 print:flex-row print:flex-wrap">
      <div className="md:hidden print:hidden">
        <FollowButton id={id ? parseInt(id) : -1} is_followed={is_followed} />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
          <AgeIcon {...colorScheme} />
        </div>
        <div className="flex flex-col gap-1">
          {loading.page ? (
            <>
              <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
              <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            </>
          ) : (
            <>
              <h4 className="text-sm">Wiek</h4>
              <h3 className="font-semibold text-sm">{birth_date}</h3>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
          <EducationIcon {...colorScheme} />
        </div>
        <div className="flex flex-col gap-1">
          {loading.page ? (
            <>
              <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
              <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            </>
          ) : (
            <>
              <h4 className="text-sm">Wykształcenie</h4>
              <h3 className="font-semibold text-sm">
                {education?.split("(")[0]}
              </h3>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
          <CashIcon {...colorScheme} />
        </div>
        <div className="flex flex-col gap-1">
          {loading.page ? (
            <>
              <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
              <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            </>
          ) : (
            <>
              <h4 className="text-sm">Oczekiwania finansowe</h4>
              <h3 className="font-semibold text-sm">{salary_expectation}</h3>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-[#F8F8F8] rounded-full flex items-center justify-center">
          <DriversLicenseIcon {...colorScheme} />
        </div>
        <div className="flex flex-col gap-1">
          {loading.page ? (
            <>
              <div className="w-[1in] h-[1em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
              <div className="w-[1.4in] h-[1.2em] rounded-full py-2 px-6 bg-[#f8f8f8]" />
            </>
          ) : (
            <>
              <h4 className="text-sm">Prawo jazdy kat. B</h4>
              <h3 className="font-semibold text-sm">
                {drivers_license ? "Tak" : "Nie"}
              </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
