import { MapTextToRoleType, RoleTextsType } from "../../constants/candidate";
import { professionColorMap } from "../../constants/professionColorMap";
import { RoleType } from "../../constants/workForm";

const CategoryPercantageBox = ({
  offersCategoryPercantageBox,
  profession,
  percentage,
  role,
}: RoleTextsType & { percentage: number; role?: RoleType }) => {
  const isActive = role === profession;
  const { gradient } = role ? professionColorMap[role] : { gradient: "" };
  return (
    <div
      className={`${
        isActive ? "order-first" : "order-last"
      } flex items-center gap-2 w-max rounded-full py-2 px-4 bg-[#F5F5F5]`}
    >
      <h4 className="text-[.75rem] font-medium">
        Umiejętności{" "}
        {isActive ? (
          <span
            style={{ backgroundImage: gradient }}
            className="bg-clip-text text-transparent"
          >{`${offersCategoryPercantageBox} ${percentage}%`}</span>
        ) : (
          `${offersCategoryPercantageBox} ${percentage}%`
        )}
      </h4>
    </div>
  );
};

export default CategoryPercantageBox;
