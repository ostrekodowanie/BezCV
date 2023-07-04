import axios from "axios";
import { FormEvent, useState } from "react";
import Loader from "../Loader";

export default function Banner() {
  const [phone, setPhone] = useState("");
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    axios
      .post("/api/contact", JSON.stringify({ phone }))
      .then(() => setHasBeenSent(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="bg-[linear-gradient(84.74deg,#2F66F4_15.81%,#0D9AE9_80.36%)] py-12 md:px-16 px-[8vw] sm:px-[10%] flex flex-col gap-8 rounded-3xl">
      <h2 className="flex flex-col gap-2 text-white text-center">
        <span className="font-semibold text-3xl md:leading-tight 2xl:leading-tight">
          Chcesz z nami porozmawiać?
        </span>
        <span className="opacity-[.8] font-medium text-lg">
          Umów się na rozmowę ze specjalistą HR.
        </span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex sm:items-center justify-between gap-4 sm:gap-8 flex-col sm:flex-row items-end"
      >
        <div className="flex flex-col gap-2 xl:max-w-[5in] w-full">
          <h3 className="text-white font-semibold text-left text-[.8rem]">
            Numer telefonu
          </h3>
          <div className="relative flex items-center">
            <input
              className={`py-3 px-6 bg-white border-[1px] border-[#CCCFD4] min-w-0 placeholder:text-[#9CA5C0] text-sm rounded-xl w-full ${
                hasBeenSent ? "text-green-400" : "text-font"
              }`}
              placeholder="Wpisz numer telefonu"
              type="text"
              maxLength={11}
              value={
                hasBeenSent
                  ? "Specjalista HR niedługo się z Tobą skontaktuje!"
                  : phone
              }
              readOnly={hasBeenSent}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/\D/g, "");
                value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
                setPhone(value);
              }}
            />
          </div>
        </div>
        {!hasBeenSent && (
          <button className="py-2 px-6 rounded-full bg-white mt-4">
            {isLoading ? (
              <Loader />
            ) : (
              <span className="text-primary font-medium text-sm">Prześlij</span>
            )}
          </button>
        )}
      </form>
      {isError && (
        <div className="bg-red-400 border-red-500 border-[2px] px-4 py-2">
          <span className="text-white font-medium text-[.75rem]">
            Wystąpił błąd
          </span>
        </div>
      )}
    </div>
  );
}
