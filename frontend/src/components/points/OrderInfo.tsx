import { bcvToken } from "../../assets/general";
import { PackageProps } from "../../constants/points";

export default function OrderInfo({ days, points, price }: PackageProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 font-semibold text-xl md:text-2xl">Kupujesz:</h2>
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-sm">Wybrana ilość tokenów</h3>
        <div className="flex justify-center items-center w-full py-3 font-medium border-[2px] border-[#2F66F4] rounded-2xl">
          {points} tokenów{" "}
          <img className="inline-block max-h-[1.2em]" src={bcvToken} alt="" />
        </div>
      </div>
    </div>
  );
}
