import { BadgeListProps } from "../../types/candidate";
import Badge from "./Badge";

export default function BadgeList({ industries, profession }: BadgeListProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap px-[8vw] sm:px-0 mb-2">
      {industries &&
        industries.map((industry) => (
          <Badge
            industry={industry}
            profession={profession}
            key={industry.id}
          />
        ))}
    </div>
  );
}
