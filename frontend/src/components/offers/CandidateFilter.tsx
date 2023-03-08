import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import { filtersMenuArrow } from "../../assets/offers/offers";
import { roleToTextMap } from "../../constants/candidate";
import { RoleType } from "../../constants/workForm";
import { FilterProps as FilterStateProps } from "../../pages/Offers";

interface FilterProps {
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
}

export default function CandidateFilter({ setFilter }: FilterProps) {
  const [mobileActive, setMobileActive] = useState(false);
  const [isActive, setIsActive] = useState({
    availability: false,
    salary: false,
  });
  const [allFilters, setAllFilters] = useState<FilterStateProps>({
    professions: [],
    availability: [],
    salary: [],
  });

  useEffect(() => {
    axios
      .get("/api/candidate/filters")
      .then((res) => res.data)
      .then((data) =>
        setAllFilters({
          professions: data.professions,
          availability: ["cały etat", "pół etatu", "¼ etatu"],
          salary: data.salary,
        })
      );
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileActive((prev) => !prev)}
        className="lg:hidden font-medium mb-4 text-left ml-[8vw] sm:ml-0"
      >
        {!mobileActive ? "Filtruj" : "Zamknij"}
      </button>
      <div
        className={`flex-col gap-8 px-8 py-6 mb-4 lg:mb-0 lg:self-start transition-all bg-white shadow-primaryBig sm:rounded-3xl min-h-[80vh] relative ${
          mobileActive ? "flex" : "hidden lg:flex"
        }`}
      >
        <div>
          {allFilters.professions.length > 0 ? (
            <h4 className="font-semibold mb-6">Stanowiska</h4>
          ) : (
            <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />
          )}
          <div className="flex flex-col gap-4">
            {allFilters.professions.length > 0 ? (
              allFilters.professions.map((role) => (
                <RoleCheckBox role={role} setFilter={setFilter} key={role} />
              ))
            ) : (
              <>
                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
              </>
            )}
          </div>
        </div>
        <HorizontalLine />
        {/* <div>
                    {allFilters.abilities.length > 0 ? <h4 className="font-semibold mb-6">Umiejętności</h4> : <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />}
                    <div className="flex flex-col gap-4">
                        {allFilters.abilities.length > 0 ? allFilters.abilities.map(ability => <AbilityCheckBox ability={ability} setFilter={setFilter} key={ability} />) :
                        <>
                            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                            <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                        </>}
                    </div>
                </div> */}
        <div>
          {allFilters.professions.length > 0 ? (
            <button
              onClick={() =>
                setIsActive((prev) => ({
                  ...prev,
                  availability: !prev.availability,
                }))
              }
              className="flex items-center mb-6"
            >
              <img
                className={`${
                  isActive.availability ? "rotate-0" : "-rotate-90"
                } transition-transform max-h-[.9em] mr-2`}
                src={filtersMenuArrow}
                alt=""
              />
              <h4 className="font-medium text-[14px]">Dyspozycyjność</h4>
            </button>
          ) : (
            <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />
          )}
          <div className="flex flex-col gap-4">
            {allFilters.availability.length > 0 ? (
              <div className="flex flex-col gap-4">
                {isActive.availability &&
                  allFilters.availability.map((availability) => (
                    <AvailabilityCheckBox
                      availability={availability}
                      setFilter={setFilter}
                      key={availability}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
              </div>
            )}
          </div>
        </div>
        <HorizontalLine />
        <div>
          {allFilters.salary.length > 0 && (
            <button
              onClick={() =>
                setIsActive((prev) => ({
                  ...prev,
                  salary: !prev.salary,
                }))
              }
              className="flex items-center mb-6"
            >
              <img
                className={`${
                  isActive.salary ? "rotate-0" : "-rotate-90"
                } transition-transform max-h-[.9em] mr-2`}
                src={filtersMenuArrow}
                alt=""
              />
              <h4 className="font-medium text-[14px]">Oczekiwania finansowe</h4>
            </button>
          )}
          <div className="flex flex-col gap-4">
            {allFilters.salary.length > 0 &&
              isActive.salary &&
              allFilters.salary.map((salary) => (
                <SalaryCheckBox
                  salary={salary}
                  setFilter={setFilter}
                  key={salary}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

// const AbilityCheckBox = ({ ability, setFilter }: { ability: string, setFilter: Dispatch<SetStateAction<FilterStateProps>> }) => {
//     const location = useLocation()
//     const [checked, setChecked] = useState(false)

//     useLayoutEffect(() => {
//         const decodedSearch = decodeURIComponent(location.search);
//         setChecked(decodedSearch.includes(ability))
//     }, [])

//     const handleChange = () => {
//         setFilter(prev => ({ ...prev, abilities: checked ? prev.abilities.filter(ab => ab !== ability) : [...prev.abilities, ability] }))
//         setChecked(prev => !prev)
//     }

//     return (
//         <div className='flex items-center text-[.75rem] font-medium'>
//             <input type='checkbox' onChange={handleChange} checked={checked} name="abilities" id={ability}/>
//             <label className="ml-4" htmlFor={ability}>{ability}</label>
//         </div>
//     )
// }

const AvailabilityCheckBox = ({
  availability,
  setFilter,
}: {
  availability: string;
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
}) => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    const decodedSearch = decodeURIComponent(location.search);
    setChecked(decodedSearch.includes(availability));
  }, []);

  const handleChange = () => {
    setFilter((prev) => ({
      ...prev,
      availability: checked
        ? prev.availability.filter((ab) => ab !== availability)
        : [...prev.availability, availability],
    }));
    setChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center text-[14px] font-medium">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        name="availability-filter"
        id={availability}
      />
      <label className="ml-4" htmlFor={availability}>
        {availability}
      </label>
    </div>
  );
};

const SalaryCheckBox = ({
  salary,
  setFilter,
}: {
  salary: string;
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
}) => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    const decodedSearch = decodeURIComponent(location.search);
    setChecked(decodedSearch.includes(salary));
  }, []);

  const handleChange = () => {
    setFilter((prev) => ({
      ...prev,
      salary: checked
        ? prev.salary.filter((ab) => ab !== salary)
        : [...prev.salary, salary],
    }));
    setChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center text-[14px] font-medium">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        name="salary-filter"
        id={salary}
      />
      <label className="ml-4" htmlFor={salary}>
        {salary}
      </label>
    </div>
  );
};

const RoleCheckBox = ({
  role,
  setFilter,
}: {
  role: RoleType;
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
}) => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    const decodedSearch = decodeURIComponent(location.search);
    setChecked(decodedSearch.includes(role));
  }, []);

  const handleChange = () => {
    setFilter((prev) => ({
      ...prev,
      professions: checked
        ? prev.professions.filter((r) => r !== role)
        : [...prev.professions, role],
    }));
    setChecked((prev) => !prev);
  };

  return (
    <div className="flex items-center text-[14px] font-medium">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        name="profession-filter"
        id={role}
      />
      <label className="ml-4" htmlFor={role}>
        {roleToTextMap[role].profession}
      </label>
    </div>
  );
};

const HorizontalLine = () => {
  return <div className="h-[1px] bg-[#EDEDED]" />;
};
