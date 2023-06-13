import { useContext } from "react";
import { Route, Routes, useMatch } from "react-router";
import { AccountContext } from "../providers/AccountProvider";
import { igIcon } from "../assets/footer/footer";
import CustomLink from "./header/CustomLink";
import { useAppSelector } from "../main";
import { Link } from "react-router-dom";
import HashLink from "./header/HashLink";

export default function Footer() {
  const isSignup = useMatch({ path: `/rejestracja/*`, end: true });
  const isLogin = useMatch({ path: `/logowanie/*`, end: true });
  const isAuth = isLogin || isSignup;
  const { logged } = useAppSelector((state) => state.login);
  const { account, setAccount } = useContext(AccountContext);

  return (
    <Routes>
      <Route path="/ankieta" element={<></>} />
      <Route
        path="*"
        element={
          <footer className="bg-[#F4F6FA] padding pt-16 pb-8 flex flex-col gap-8 items-center print:mt-[1in]">
            {!isAuth && (
              <div className="flex items-center gap-6 text-sm">
                {account === "employer" && !logged && (
                  <button
                    onClick={() => setAccount("worker")}
                    className="text-[#F98D3D] hover:text-darkSecondary font-medium md:mr-2 text-center"
                  >
                    Widok kandydata
                  </button>
                )}
                {account === "worker" && (
                  <button
                    onClick={() => setAccount("employer")}
                    className="text-[#2F66F4] hover:text-darkPrimary font-medium md:mr-2 text-center"
                  >
                    Widok pracodawcy
                  </button>
                )}
                {!logged && (
                  <HashLink to={"jzp"} route="/">
                    {account === "worker"
                      ? "Jak dostać pracę?"
                      : "Jak znaleźć pracownika?"}
                  </HashLink>
                )}
                {account === "employer" && (
                  <CustomLink to="/oferty">Znajdź pracownika</CustomLink>
                )}
              </div>
            )}
            <div className="bg-[#E3E8F7] self-stretch h-[1px] w-full" />
            <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap w-full justify-between items-center self-stretch">
              <Link to="/">
                <strong className="font-medium text-xl">
                  bez
                  <span className="text-primary print:text-fontPrimary">
                    CV
                  </span>
                </strong>
              </Link>
              <p className="text-[#3C4663] text-center max-w-[4in] text-sm font-medium">
                {account === "employer"
                  ? "Bez problemu rekrutujesz, bez problemu pracujesz. Zwiększamy satysfakcję z pracy i pracownika."
                  : "Bez problemu pracujesz, bez problemu rekrutujesz. Zwiększamy satysfakcję z pracy i pracownika."}
              </p>
              <a
                href="https://instagram.com/bezcv?igshid=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white h-12 w-12 flex items-center justify-center shadow-[0px_12px_45px_rgba(47,102,244,0.06)] rounded-xl"
              >
                <img className="max-h-[60%]" src={igIcon} alt="Instagram" />
              </a>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap self-stretch mt-4">
              <small className="font-medium">&copy; 2023 - bezCV</small>
              <div className="flex items-center gap-4 font-medium">
                <Link to="/docs/regulamin">
                  <small className="hover:text-[#2F66F4] transition-colors">
                    Regulamin
                  </small>
                </Link>
                <Link to="/docs/polityka-prywatnosci">
                  <small className="hover:text-[#2F66F4] transition-colors">
                    Polityka prywatności
                  </small>
                </Link>
              </div>
            </div>
          </footer>
        }
      />
    </Routes>
  );
}
