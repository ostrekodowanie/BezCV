import { BadgeListProps } from "../../types/candidate";
import Badge from "./Badge";

export default function BadgeList({
  isLoading,
  industries,
  profession,
}: BadgeListProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap px-[8vw] sm:px-0 mb-2">
      {isLoading ? (
        <>
          <div className="bg-[#f8f8f8] w-[2in] h-12 rounded-full" />
          <div className="bg-[#f8f8f8] w-[1.5in] h-12 rounded-full" />
          <div className="bg-[#f8f8f8] w-[1.8in] h-12 rounded-full" />
        </>
      ) : (
        industries &&
        industries.map((industry) => (
          <Badge
            industry={industry}
            profession={profession}
            key={industry.id}
          />
        ))
      )}
    </div>
  );
}
