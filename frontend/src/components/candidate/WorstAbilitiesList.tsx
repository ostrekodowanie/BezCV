import { AbilitiesListType } from "../../constants/candidate";
import AbilityRange from "./AbilityRange";

export default function WorstAbilitiesList({
  sales,
  customer_service,
  office_administration,
}: AbilitiesListType) {
  return (
    <div className="flex-col w-full hidden sm:flex">
      <h2 className="font-bold text-lg mb-6">
        Na co zwrócić uwagę przy kontakcie z kandydatem
      </h2>
      <div className="flex flex-col gap-8 sm:grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {sales.length > 0 &&
          sales.map((ab) => (
            <AbilityRange
              {...ab}
              color="linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)"
              key={ab.name}
            />
          ))}
        {office_administration.length > 0 &&
          office_administration.map((ab) => (
            <AbilityRange
              {...ab}
              color="linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)"
              key={ab.name}
            />
          ))}
        {customer_service.length > 0 &&
          customer_service.map((ab) => (
            <AbilityRange
              {...ab}
              color="linear-gradient(180deg, #DF1B5C 0%, #DF1B32 100%)"
              key={ab.name}
            />
          ))}
      </div>
    </div>
  );
}

export const WorstAbilitiesLoader = () => {
  return (
    <div className="flex flex-col gap-8 sm:grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
      <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
      <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
      <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
      <div className="w-[1in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
      <div className="w-[1.4in] h-[1.6em] rounded-full bg-[#f8f8f8]" />
    </div>
  );
};
