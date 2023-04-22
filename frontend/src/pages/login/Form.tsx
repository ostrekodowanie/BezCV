import axios from "axios";
import jwtDecode from "jwt-decode";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import Loader from "../../components/Loader";
import { useAppDispatch } from "../../main";
import { login } from "../../providers/login";
import getUserInfo from "../../utils/getUserInfo";
import { inputStyles } from "../Contact";
import { User } from "../Login";

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState({
    ok: false,
    message: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({
      ok: false,
      message: "loading",
    });
    try {
      axios
        .post("/api/login", JSON.stringify(credentials), {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          let tokens = res.data;
          let user: User = jwtDecode(tokens.access);
          localStorage.setItem("user", JSON.stringify(tokens));
          const userInfo = await getUserInfo(user.id, tokens.access);
          if (userInfo) {
            dispatch(
              login({
                data: { ...userInfo, id: user.id },
                tokens,
              })
            );
            return navigate("/profil");
          }
        })
        .catch((err) =>
          setStatus({
            ok: false,
            message: err.response.data.detail
              ? err.response.data.detail
              : "Wystąpił błąd!",
          })
        );
    } catch (err) {
      setStatus({
        ok: false,
        message: "Wystąpił błąd",
      });
    }
  };

  return (
    <div className="flex flex-col text-center items-center xl:flex-1 xl:max-w-[10in] bg-white py-[1in] px-[8vw] md:shadow-boxPrimary md:py-10 md:px-16 md:rounded-3xl xl:px-24 xl:py-12 xl:self-start">
      <h2 className="font-semibold text-[2.4rem] mb-4 xl:mb-8 w-full">
        Zaloguj się
      </h2>
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
              onChange={(e) =>
                setCredentials((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </div>
          <div className="relative flex flex-col gap-2 items-start w-full">
            <label className="text-sm" htmlFor="password">
              Hasło
            </label>
            <input
              className={inputStyles.input}
              required
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setCredentials((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap justify-between mt-8 mb-4">
          <span className="text-left">
            Zapomniałeś hasła?{" "}
            <Link
              className="text-[#2F66F4] font-medium hover:text-darkPrimary transition-colors"
              to="/logowanie/odzyskiwanie"
            >
              Zresetuj hasło
            </Link>
          </span>
          <div className="flex items-center flex-row-reverse sm:flex-row gap-4">
            {status.message === "loading" && <Loader />}
            {!status.ok && status.message && status.message !== "loading" && (
              <span className="text-red-400 font-medium">{status.message}</span>
            )}
            <FilledButton type="submit">Zaloguj się</FilledButton>
          </div>
        </div>
        <p className="text-[rgba(23,26,35,0.6)] text-left text-sm max-w-[4in]">
          Logując się do bezCV akceptujesz regulamin oraz politykę prywatności
          serwisu
        </p>
        <div className="relative flex items-center mt-4 mb-2">
          <span className="relative mx-auto bg-white px-6 xl:px-10 py-3 z-10">
            Nie posiadasz konta?{" "}
            <Link
              className="text-[#2F66F4] font-medium hover:text-darkPrimary transition-colors"
              to="/rejestracja"
            >
              Zarejestruj się
            </Link>
          </span>
          <div className="bg-[#DFDFDF] absolute left-0 right-0 h-[2px]" />
        </div>
      </form>
    </div>
  );
}
