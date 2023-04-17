import { useEffect, useRef, useState } from "react";
import { bcvToken } from "../../assets/general";
import { PackageProps, packages } from "../../constants/points";
import FilledButton from "../FilledButton";
import { filtersMenuArrow } from "../../assets/offers/offers";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function OrderInfo({ days, points, price }: PackageProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 font-semibold text-xl md:text-2xl">Podsumowanie</h2>
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-sm">Wybrana ilość tokenów</h4>
        <DropdownMenu points={points} />
      </div>
      <div className="my-8 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm font-semibold">
          <h4>Cena netto:</h4>
          <h4>{price} zł</h4>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <h4>Podatek VAT:</h4>
          <h4>23%</h4>
        </div>
        <div className="flex items-center justify-between text-xl font-semibold">
          <h4>Cena brutto:</h4>
          <h4 className="text-primary">{price * 1.23} zł</h4>
        </div>
      </div>
      <FilledButton className="w-full justify-center">
        Zamawiam i płacę
      </FilledButton>
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

  useEffect(() => {
    window.addEventListener("click", handleFocus);
    return () => {
      window.removeEventListener("click", handleFocus);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
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
            dropdownActive ? "rotate-90" : "rotate-0"
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
