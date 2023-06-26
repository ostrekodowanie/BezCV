import { FormEvent, useEffect, useState } from "react";
import { arrow } from "../../assets/points/points";

type Props = {
  onChange: (code: string, phone: string) => void;
};

export default function Banner({ onChange }: Props) {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    onChange(code, phone);
  }, [code, phone]);

  return (
    <div className="bg-[linear-gradient(84.74deg,#2F66F4_15.81%,#0D9AE9_80.36%)] p-16 px-[8vw] sm:px-[10%] flex flex-col gap-8 rounded-3xl">
      <h2 className="flex flex-col gap-2 text-white">
        <span className="font-semibold text-3xl md:leading-tight 2xl:leading-tight">
          Wpisz kod rabatowy z kampanii bezCV
        </span>
        <span className="opacity-[.8] font-medium text-lg">
          i zaproś na rozmowę jednego z kandydatów.
        </span>
      </h2>
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-left text-[.8rem]">
            Masz kod rabatowy?
          </h3>
          <div className="relative flex items-center min-w-[3in]">
            <input
              className={`py-3 px-6 bg-white border-[1px] border-[#CCCFD4] placeholder:text-[#9CA5C0] text-sm rounded-xl w-full text-font`}
              placeholder="Wpisz go tutaj"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setPhone("");
              }}
            />
          </div>
        </div>
        <span className="text-sm self-center font-medium text-white">lub</span>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-left text-[.8rem]">
            Nie masz kodu rabatowego?
          </h3>
          <div className="relative flex items-center min-w-[3in]">
            <input
              className={`py-3 px-6 bg-white border-[1px] border-[#CCCFD4] placeholder:text-[#9CA5C0] text-sm rounded-xl w-full text-font`}
              placeholder="Wpisz numer telefonu"
              type="text"
              maxLength={11}
              value={phone}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, "");
                value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
                setPhone(value);
                setCode("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
