import { Link } from "react-router-dom";
import { arrowRight, bcvToken } from "../../assets/general";
import { PackageProps } from "../../constants/points";

const Package = ({ points, price, days }: PackageProps) => {
  return (
    <div className="flex flex-col self-stretch h-full justify-end gap-8 rounded-3xl relative items-center p-12 bg-white shadow-primaryBig flex-1">
      <h2 className="font-semibold text-4xl md:text-5xl w-max flex flex-col gap-4 items-center">
        {points}
        <span className="font-medium text-xl flex items-center">
          tokenów{" "}
          <img
            className="ml-2 max-h-[1.2em] inline-block"
            src={bcvToken}
            alt="bCV"
          />
        </span>
      </h2>
      <div className="h-[1px] self-stretch bg-[#ECF0F2]" />
      <h3 className="font-medium text-2xl">
        {price} zł{" "}
        <sup className="bg-clip-text text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] font-medium">
          /netto
        </sup>
      </h3>
      <h3 className="font-medium text-[#5D7EAD] text-2xl">
        {(price / points).toFixed(2).toString()} zł{" "}
        <sup className="text-[#5D7EAD] font-medium">/1 token bCV</sup>
      </h3>
      <h4 className="text-[#5D7EAD] text-center">
        {days === 30
          ? "Okres ważności tokenów - 30 dni"
          : `Co miesiąc masz do wykorzystania ${points / 3} tokenów`}
      </h4>
      <Link
        to={`/punkty/podsumowanie?points=${points}`}
        className="bg-primary font-medium border-primary mt-8 justify-center text-white rounded-full w-full flex items-center text-[.75rem] py-[14px] px-8"
      >
        Kup teraz!{" "}
        <img
          className="ml-2 max-h-[1em] inline-block"
          src={arrowRight}
          alt=""
        />
      </Link>
    </div>
  );
};

export default Package;
