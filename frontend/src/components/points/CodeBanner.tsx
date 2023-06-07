import { FormEvent, useState } from "react";
import { arrow, checkmark } from "../../assets/points/points";
import axios from "axios";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { addPoints } from "../../providers/login";

export default function CodeBanner() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    axios
      .post("/api/code", JSON.stringify({ code: code.toLowerCase() }))
      .then((res) => {
        const addedPoints = res.data;
        dispatch(addPoints(parseInt(addedPoints)));
        setHasAdded(true);
      })
      .catch((err) => setError(err.response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="py-[1in] sm:px-[8vw] md:px-[12vw] 2xl:px-[17vw] flex flex-col gap-4">
      <div className="bg-[linear-gradient(84.74deg,#2F66F4_15.81%,#0D9AE9_80.36%)] p-16 px-[8vw] sm:px-[10%] flex flex-col gap-8 xl:flex-row justify-between xl:items-center sm:rounded-3xl">
        <h2 className="flex flex-col gap-4 text-white">
          <span className="font-semibold text-3xl md:text-4xl 2xl:text-[2.75rem] md:leading-tight 2xl:leading-tight">
            Wpisz kod rabatowy z kampanii bezCV
          </span>
          <span className="opacity-[.8] text-lg">
            i zaproś na rozmowę jednego z kandydatów.
          </span>
        </h2>
        <img className="w-[1in] 2xl:w-[2in]" src={arrow} alt="" />
        <form className="flex flex-col gap-2" onSubmit={handleCodeSubmit}>
          <h3 className="text-white font-semibold text-[.8rem]">
            Masz kod rabatowy?
          </h3>
          <div className="relative flex items-center min-w-[3in]">
            <input
              className={`py-3 px-6 bg-white border-[1px] border-[#CCCFD4] placeholder:text-[#9CA5C0] text-sm rounded-xl w-full ${
                hasAdded ? "text-green-400" : "text-font"
              }`}
              placeholder="Wpisz go tutaj"
              type="text"
              readOnly={!!(isLoading || hasAdded)}
              value={hasAdded ? "Punkty poprawnie dodane!" : code}
              onChange={(e) => setCode(e.target.value)}
            />
            {isLoading ? (
              <div className="absolute right-4">
                <Loader />
              </div>
            ) : (
              <button className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center absolute right-4">
                <img className="max-h-[80%]" src={checkmark} alt="" />
              </button>
            )}
          </div>
          {error && (
            <div className="bg-red-400 border-red-500 border-[2px] px-4 py-2">
              <span className="text-white font-medium text-[.75rem]">
                {error}
              </span>
            </div>
          )}
        </form>
      </div>
      <small className="self-center text-[.8rem] text-[#3C4663] mx-[8vw] sm:mx-0">
        <span className="font-semibold">Uwagi:</span> wielkość liter nie ma
        znaczenia, kody bezterminowe, natomiast można użyć 1 kodu do jednego
        konta, kody się ze sobą nie sumują.
      </small>
    </section>
  );
}
