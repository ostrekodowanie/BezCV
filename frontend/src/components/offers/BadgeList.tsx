import { BadgeListProps } from "../../types/candidate";
import Badge from "../candidate/Badge";

export default function BadgeList({ industries, profession }: BadgeListProps) {
  return industries ? (
    <div className="flex items-center gap-3 flex-wrap">
      {industries.map((industry) => (
        <Badge
          industry={industry}
          profession={profession}
          size="small"
          key={industry.id}
        />
      ))}
    </div>
  ) : (
    <span>Nie znaleziono branży</span>
  );
}
