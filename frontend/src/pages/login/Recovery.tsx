import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import Loader from "../../components/Loader";
import { inputStyles } from "../../constants/general";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<boolean | "loading" | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const response = await axios.post("/api/login/reset-password", email, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) return setStatus(true);
    return setStatus(false);
  };

  return (
    <div className="flex flex-col text-center items-center xl:flex-1 xl:max-w-[7in] md:shadow-boxPrimary bg-white py-[1in] px-[8vw] md:py-10 md:px-16 md:rounded-3xl xl:px-24 xl:py-12 xl:self-start">
      <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-8 w-full">
        Zresetuj hasło
      </h2>
      {status === true ? (
        <h3 className="text-xl mt-2 mb-6">
          Wiadomość została wysłana na podany email.
        </h3>
      ) : (
        <form
          className="flex flex-col gap-4 w-full font-medium relative"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row justify-center max-w-full gap-6 xl:gap-8">
            <div className="relative flex flex-col gap-2 items-start w-full">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                className={inputStyles.input}
                required
                autoCorrect="off"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-between mt-6 mb-4">
            <span className="text-left">
              Pamiętasz hasło?{" "}
              <Link
                className="text-[#2F66F4] font-medium hover:text-darkPrimary transition-colors"
                to="/logowanie"
              >
                Zaloguj się
              </Link>
            </span>
            <div className="flex flex-row-reverse md:flex-row items-center gap-6">
              {status === "loading" ? (
                <Loader />
              ) : (
                <FilledButton type="submit">Wyślij email</FilledButton>
              )}
              {status === false && (
                <span className="text-red-400 font-medium">Wystąpił błąd</span>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
