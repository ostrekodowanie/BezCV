import { useEffect, useRef, useState, FormEvent } from "react";
import { bcvToken } from "../../assets/general";
import { PackageProps, PromoCode, packages } from "../../constants/points";
import { filtersMenuArrow } from "../../assets/offers/offers";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import { checkmark } from "../../assets/points/points";
import axios from "axios";
import toast from "react-hot-toast";
import { inputStyles } from "../../constants/general";

type ComponentProps = {
  salePercentage: number | null;
  addPromoCode: (code: PromoCode) => void;
};

export default function OrderInfo(props: PackageProps & ComponentProps) {
  const [codeData, setCodeData] = useState({
    isLoading: false,
    value: "",
    isAdded: false,
    isError: false,
  });
  const { points, price, salePercentage, addPromoCode } = props;
  const finalPrice = salePercentage
    ? (price * (100 - salePercentage)) / 100
    : price;

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const promise = axios.post(
        "/api/discounts",
        JSON.stringify({ code: codeData.value })
      );
      const { data } = await toast.promise(promise, {
        loading: "Wczytywanie",
        success: "Kod został prawidłowo dodany!",
        error: "Kod jest nieprawidłowy lub został już wykorzystany",
      });
      addPromoCode(data);
      setCodeData((prev) => ({ ...prev, isAdded: true }));
    } catch (err) {
      setCodeData((prev) => ({ ...prev, isError: true }));
    }
  };

  return (
    <div className="flex flex-col gap-4 self-stretch">
      <h2 className="mb-6 font-semibold text-xl md:text-2xl">Podsumowanie</h2>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-sm">Wybrana ilość tokenów</h4>
        <DropdownMenu points={points} />
      </div>

      <div className="my-8 flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between text-sm font-semibold">
          <h4>Cena netto:</h4>
          <h4 className="flex items-center gap-2">
            {salePercentage && (
              <s className="decoration-red-400 decoration-[2px]">{price} zł</s>
            )}
            <span>{finalPrice.toFixed(2)} zł</span>
          </h4>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <h4>Podatek VAT:</h4>
          <h4>23%</h4>
        </div>
        <div className="flex items-center justify-between text-xl font-semibold">
          <h4>Cena brutto:</h4>
          <h4 className="text-primary">{(finalPrice * 1.23).toFixed(2)} zł</h4>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <h3 className="text-font font-semibold text-[.8rem]">
          Masz kod rabatowy?
        </h3>
        <div className="relative flex items-center min-w-[3in]">
          <input
            className={`${inputStyles.input} ${
              codeData.isError
                ? "text-red-500"
                : codeData.isAdded
                ? "text-primary"
                : "text-font"
            }`}
            placeholder="Wpisz go tutaj"
            type="text"
            readOnly={!!(codeData.isLoading || codeData.isAdded)}
            value={codeData.value}
            onChange={(e) =>
              setCodeData((prev) => ({ ...prev, value: e.target.value }))
            }
          />
          <button
            onClick={handleCodeSubmit}
            className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center absolute right-4"
          >
            <img className="max-h-[80%]" src={checkmark} alt="" />
          </button>
        </div>
      </div>
      <PaymentButton />
    </div>
  );
}

const DropdownMenu = ({ points }: Omit<PackageProps, "days" | "price">) => {
  const menuRef = useRef<HTMLDivElement>(null!);
  const button = useRef<HTMLButtonElement>(null!);
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    setDropdownActive(false);
  }, [points]);

  useEffect(() => {
    const handleFocus = (e: MouseEvent) => {
      if (button.current && button.current.contains(e.target as Node)) {
        return setDropdownActive((prev) => !prev);
      }
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        setDropdownActive(true);
      } else {
        setDropdownActive(false);
      }
    };
    window.addEventListener("click", handleFocus);
    return () => {
      window.removeEventListener("click", handleFocus);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        ref={button}
        className="flex justify-between items-center w-full py-3 px-6 border-[2px] border-[#2F66F4] rounded-2xl"
      >
        <span className="font-medium">
          {points} tokenów
          <img
            className="inline-block max-h-[1.2em] ml-[1ch]"
            src={bcvToken}
            alt=""
          />
        </span>
        <img
          className={`max-h-[1.2em] transition-transform ${
            dropdownActive ? "rotate-0" : "-rotate-90"
          }`}
          src={filtersMenuArrow}
          alt=""
        />
      </button>
      {dropdownActive && (
        <div className="absolute left-0 right-0 top-full overflow-hidden rounded-2xl shadow-primarySmall bg-white flex flex-col">
          {packages
            .filter((pack) => pack.points !== points)
            .map((pack) => (
              <DropdownPackageRef {...pack} key={pack.points} />
            ))}
        </div>
      )}
    </div>
  );
};

const DropdownPackageRef = ({ points }: PackageProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleChange = () => {
    searchParams.set("points", points.toString());
    navigate({ search: searchParams.toString() });
  };

  return (
    <button
      onClick={handleChange}
      className="flex justify-between items-center w-full px-6 py-3 rounded-2xl transition-colors bg-white hover:bg-[#FCFCFC]"
    >
      <span className="font-medium">
        {points} tokenów
        <img
          className="inline-block max-h-[1.2em] ml-[1ch]"
          src={bcvToken}
          alt=""
        />
      </span>
    </button>
  );
};
