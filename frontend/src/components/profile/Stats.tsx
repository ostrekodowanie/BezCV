import { StatsProps } from "../../constants/profile";
import { useAppSelector } from "../../main";

const Stats = ({
  followed_count,
  purchased_count,
  loading,
}: StatsProps & { loading: boolean }) => {
  const { points } = useAppSelector((state) => state.login.data);
  return (
    <div className="px-[8vw] py-10 sm:p-10 shadow-primaryBig flex flex-col gap-8 md:gap-12 sm:rounded-3xl col-[2/3] row-[1/2]">
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Dostępne tokeny</h3>
        <h4
          className={`text-4xl font-bold ${
            loading
              ? "text-[#f4f4f4]"
              : "text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] bg-clip-text"
          }`}
        >
          {loading ? "24" : points}
        </h4>
      </div>
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Obserwowane kontakty</h3>
        <h4
          className={`text-4xl font-bold ${
            loading
              ? "text-[#f4f4f4]"
              : "text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] bg-clip-text"
          }`}
        >
          {loading ? "12" : followed_count}
        </h4>
      </div>
      <div className="flex gap-2 justify-between">
        <h3 className="font-semibold w-min">Zakupione kontakty</h3>
        <h4
          className={`text-4xl font-bold ${
            loading
              ? "text-[#f4f4f4]"
              : "text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] bg-clip-text"
          }`}
        >
          {loading ? "5" : purchased_count}
        </h4>
      </div>
    </div>
  );
};

export default Stats;
