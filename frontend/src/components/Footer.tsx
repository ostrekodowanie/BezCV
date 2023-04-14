import { useContext } from "react";
import { Route, Routes } from "react-router";
import { AccountContext } from "../reducers/AccountProvider";
import { logoHorizontal } from "../assets/general";
import { fbIcon } from "../assets/footer/footer";
import HomeHashLink from "./header/HomeHashLink";
import CustomLink from "./header/CustomLink";
import { useAppSelector } from "../main";
import { Link } from "react-router-dom";

export default function Footer() {
  const { logged } = useAppSelector((state) => state.login);
  const { account, setAccount } = useContext(AccountContext);

  return (
    <Routes>
      <Route path="/ankieta" element={<></>} />
      <Route
        path="*"
        element={
          <footer className="bg-[#F4F6FA] padding pt-16 pb-8 flex flex-col gap-8 items-center">
            <div className="flex items-center gap-6 text-sm">
              {account === "employer" && !logged && (
                <button
                  onClick={() => setAccount("worker")}
                  className="text-[#F98D3D] hover:text-darkSecondary font-medium md:mr-2"
                >
                  Widok kandydata
                </button>
              )}
              {account === "worker" && (
                <button
                  onClick={() => setAccount("employer")}
                  className="text-[#2F66F4] hover:text-darkPrimary font-medium md:mr-2"
                >
                  Widok pracodawcy
                </button>
              )}
              <HomeHashLink className="text-sm h-max" />
              {account === "employer" && (
                <CustomLink to="/oferty">Wyszukiwarka kandydatów</CustomLink>
              )}
            </div>
            <div className="bg-[#E3E8F7] self-stretch h-[1px] w-full" />
            <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap w-full justify-between items-center self-stretch">
              <Link to="/">
                <strong className="font-medium text-xl">
                  bez<span className="text-primary">CV</span>
                </strong>
              </Link>
              <p className="text-[#3C4663] text-center max-w-[4in] text-sm font-medium">
                {account === "employer"
                  ? "Bez problemu rekrutujesz, bez problemu pracujesz. Zwiększamy satysfakcję z pracy i pracownika."
                  : "Bez problemu pracujesz, bez problemu rekrutujesz. Zwiększamy satysfakcję z pracy i pracownika."}
              </p>
              <button className="bg-white h-12 w-12 flex items-center justify-center shadow-[0px_12px_45px_rgba(47,102,244,0.06)] rounded-xl">
                <img className="max-h-[60%]" src={fbIcon} alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap self-stretch mt-4">
              <small className="font-medium">&copy; 2023 - bezCV</small>
              <div className="flex items-center gap-4 font-medium">
                <Link to="/">
                  <small>Regulamin</small>
                </Link>
                <Link to="/">
                  <small>Polityka prywatności</small>
                </Link>
              </div>
            </div>
          </footer>
        }
      />
    </Routes>
  );
}
