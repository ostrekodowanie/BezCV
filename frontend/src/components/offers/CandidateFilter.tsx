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
import { provinces, roleToTextMap } from "../../constants/candidate";
import { RoleType } from "../../constants/workForm";
import { FilterProps as FilterStateProps } from "../../pages/Offers";

type FilterProps = {
  displayPurchased: boolean;
  setDisplayPurchased: Dispatch<SetStateAction<boolean>>;
  filter: FilterStateProps;
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
};

export default function CandidateFilter({
  displayPurchased,
  setDisplayPurchased,
  filter,
  setFilter,
}: FilterProps) {
  const [mobileActive, setMobileActive] = useState(false);
  const [isActive, setIsActive] = useState({
    availability: false,
    salary: false,
    province: false,
  });
  const [allFilters, setAllFilters] = useState<
    Omit<FilterStateProps, "purchased">
  >({
    professions: [],
    availability: [],
    salary: [],
    province: provinces,
  });

  useEffect(() => {
    axios
      .get("/api/candidate/filters")
      .then((res) => res.data)
      .then((data) =>
        setAllFilters((prev) => ({
          professions: data.professions,
          availability: ["cały etat", "pół etatu", "¼ etatu"],
          salary: data.salary,
          province: prev.province,
        }))
      );
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileActive((prev) => !prev)}
        className="lg:hidden font-medium mb-6 text-left ml-[8vw] sm:ml-0 w-8 h-6 justify-between flex flex-col"
      >
        <div
          className={`h-1 w-full bg-primary rounded-full ${
            mobileActive ? "rotate-45" : "rotate-0"
          } transition-transform origin-top-left`}
        />
        <div
          className={`h-1 w-full bg-primary rounded-full ${
            mobileActive ? "scale-x-0" : "scale-x-75 origin-center"
          } transition-transform origin-top-left`}
        />
        <div
          className={`h-1 w-full bg-primary rounded-full ${
            mobileActive
              ? "scale-x-100 origin-bottom-left translate-y-[1px] -rotate-45"
              : "rotate-0 scale-x-50 origin-center"
          } transition-transform`}
        />
      </button>
      <div
        className={`flex-col gap-8 px-8 py-6 mb-4 lg:mb-0 lg:self-start transition-all bg-white shadow-primaryBig sm:rounded-3xl lg:min-h-[80vh] relative ${
          mobileActive ? "flex" : "hidden lg:flex"
        }`}
      >
        <div className="flex flex-col gap-6">
          {allFilters.professions.length > 0 ? (
            <h4 className="font-semibold">Stanowiska</h4>
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
        <div className="flex flex-col gap-6">
          {allFilters.availability.length > 0 ? (
            <button
              onClick={() =>
                setIsActive((prev) => ({
                  ...prev,
                  availability: !prev.availability,
                }))
              }
              className="flex items-center relative w-fit"
            >
              {filter.availability.length > 0 && (
                <FilterLength length={filter.availability.length} />
              )}
              <img
                className={`${
                  isActive.availability ? "rotate-0" : "-rotate-90"
                } transition-transform max-h-[.9em] mr-2`}
                src={filtersMenuArrow}
                alt=""
              />
              <h4 className="font-medium text-[14px] w-fit">Dyspozycyjność</h4>
            </button>
          ) : (
            <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />
          )}
          {isActive.availability && (
            <div className="flex flex-col gap-4">
              {allFilters.availability.length > 0 ? (
                allFilters.availability.map((availability) => (
                  <AvailabilityCheckBox
                    availability={availability}
                    setFilter={setFilter}
                    key={availability}
                  />
                ))
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                  <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                  <div className="w-[90%] bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                  <div className="bg-[#f8f8f8] rounded-full min-h-[2rem]" />
                </div>
              )}
            </div>
          )}
        </div>
        <HorizontalLine />
        <div className="flex flex-col gap-6">
          {allFilters.salary.length > 0 ? (
            <button
              onClick={() =>
                setIsActive((prev) => ({
                  ...prev,
                  salary: !prev.salary,
                }))
              }
              className="flex items-center relative w-fit"
            >
              {filter.salary.length > 0 && (
                <FilterLength length={filter.salary.length} />
              )}
              <img
                className={`${
                  isActive.salary ? "rotate-0" : "-rotate-90"
                } transition-transform max-h-[.9em] mr-2`}
                src={filtersMenuArrow}
                alt=""
              />
              <h4 className="font-medium text-left text-[14px] w-fit">
                Oczekiwania finansowe
              </h4>
            </button>
          ) : (
            <div className="w-[60%] bg-[#f8f8f8] mb-4 rounded-full min-h-[2rem]" />
          )}
          {allFilters.salary.length > 0 && isActive.salary && (
            <div className="flex flex-col gap-4">
              {allFilters.salary.map((salary) => (
                <SalaryCheckBox
                  salary={salary}
                  setFilter={setFilter}
                  key={salary}
                />
              ))}
            </div>
          )}
        </div>
        <HorizontalLine />
        <div className="flex flex-col gap-6">
          <button
            onClick={() =>
              setIsActive((prev) => ({
                ...prev,
                province: !prev.province,
              }))
            }
            className="flex items-center relative w-fit"
          >
            {filter.province.length > 0 && (
              <FilterLength length={filter.province.length} />
            )}
            <img
              className={`${
                isActive.province ? "rotate-0" : "-rotate-90"
              } transition-transform max-h-[.9em] mr-2`}
              src={filtersMenuArrow}
              alt=""
            />
            <h4 className="font-medium text-left text-[14px] w-fit">
              Województwo
            </h4>
          </button>
          {isActive.province && (
            <div className="flex flex-col gap-4">
              {allFilters.province.map((province) => (
                <ProvinceCheckBox
                  province={province}
                  setFilter={setFilter}
                  key={province}
                />
              ))}
            </div>
          )}
        </div>
        <HorizontalLine />
        <div className="flex items-start gap-2">
          <input
            id="purchased"
            type="checkbox"
            checked={displayPurchased}
            onChange={(e) => setDisplayPurchased(e.target.checked)}
          />
          <label
            className="text-[14px] text-left font-medum w-fit -mt-1"
            htmlFor="purchased"
          >
            Wyświetlaj zakupione kontakty
          </label>
        </div>
      </div>
    </>
  );
}

const FilterLength = ({ length }: { length: number }) => {
  return (
    <div className="bg-primary text-white font-medium text-[.75rem] h-5 w-5 rounded-full flex items-center justify-center absolute -right-6 -top-1">
      {length}
    </div>
  );
};

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

const ProvinceCheckBox = ({
  province,
  setFilter,
}: {
  province: string;
  setFilter: Dispatch<SetStateAction<FilterStateProps>>;
}) => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    const decodedSearch = decodeURIComponent(location.search);
    setChecked(decodedSearch.includes(province));
  }, []);

  const handleChange = () => {
    setFilter((prev) => ({
      ...prev,
      province: checked
        ? prev.province.filter((r) => r !== province)
        : [...prev.province, province],
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
        id={province}
      />
      <label className="ml-4" htmlFor={province}>
        {province}
      </label>
    </div>
  );
};

const HorizontalLine = () => {
  return <div className="h-[1px] bg-[#EDEDED]" />;
};
