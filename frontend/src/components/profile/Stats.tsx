import { useContext } from "react";
import { ProfileDataContext, StatsProps } from "../../constants/profile";
import { useAppSelector } from "../../main";

const Stats = ({
  followed_count,
  purchased_count,
  loading,
}: StatsProps & { loading: boolean }) => {
  const { points } = useAppSelector((state) => state.login.data);
  return (
    <div className="p-10 shadow-primaryBig flex flex-col gap-8 md:gap-12 rounded-3xl col-[2/3] row-[1/2]">
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Dostępne tokeny</h3>
        <h4
          className={`text-4xl font-bold ${
            loading ? "text-[#f4f4f4]" : "text-primary"
          }`}
        >
          {loading ? "24" : points}
        </h4>
      </div>
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Obserwowane kontakty</h3>
        <h4
          className={`text-4xl font-bold ${
            loading ? "text-[#f4f4f4]" : "text-primary"
          }`}
        >
          {loading ? "12" : followed_count}
        </h4>
      </div>
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Zakupione kontakty</h3>
        <h4
          className={`text-4xl font-bold ${
            loading ? "text-[#f4f4f4]" : "text-primary"
          }`}
        >
          {loading ? "5" : purchased_count}
        </h4>
      </div>
    </div>
  );
};

export default Stats;
