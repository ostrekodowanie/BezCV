import { Link } from "react-router-dom";
import {
  useResolvedPath,
  useMatch,
  useLocation,
  useNavigate,
} from "react-router";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../main";
import { AccountContext } from "../reducers/AccountProvider";
import { arrowRight } from "../assets/general";

export default function Header() {
  const [down, setDown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("ankieta")) return;
    const cb = () => setDown(window.scrollY > 100);
    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

  if (location.pathname.includes("ankieta")) return <></>;

  return (
    <header
      className={`flex items-center justify-between min-h-[5rem] padding fixed left-0 right-0 z-30 top-0 transition-all bg-white ${
        down ? "shadow-primarySmall md:min-h-[5rem]" : "md:min-h-[6rem]"
      }`}
    >
      <Logo />
      <Nav />
    </header>
  );
}

const Logo = () => (
  <Link className="font-medium text-xl" to="/">
    Bez<span className="text-primary">CV</span>
  </Link>
);

const lineStyle = "h-[3px] w-full transition rounded-xl";

const Nav = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [active, setActive] = useState(false);
  const auth = useAppSelector((state) => state.login);
  const location = useLocation();
  const { logged } = auth;
  const { first_name, points } = auth.data;

  useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <>
      <div
        className={`flex flex-col md:flex-row justify-center items-center bg-white gap-4 text-sm font-medium absolute top-0 md:relative left-full transition-transform ${
          active && "-translate-x-full"
        } md:left-auto h-screen md:h-full w-screen md:w-max`}
      >
        {account === "employer" && !logged && (
          <button
            onClick={() => setAccount("worker")}
            className="text-[#F98D3D] hover:text-darkSecondary font-medium md:mr-2"
          >
            Przełącz na widok kandydata
          </button>
        )}
        {account === "worker" && (
          <button
            onClick={() => setAccount("employer")}
            className="text-[#2F66F4] hover:text-darkPrimary font-medium md:mr-2"
          >
            Przełącz na widok pracodawcy
          </button>
        )}
        <HashLink />
        {account === "employer" &&
          (logged ? (
            <>
              <CustomLink to="/oferty">Wyszukiwarka kandydatów</CustomLink>
              <CustomLink
                className="font-semibold text-base md:ml-2"
                to="/profil"
              >
                {first_name}
              </CustomLink>
              <CustomLink className="font-semibold text-base" to="/punkty">
                {points + " pkt."}
              </CustomLink>
            </>
          ) : (
            <>
              <Link
                className="mt-4 md:mt-0 md:ml-4 font-medium transition-colors flex items-center p-2 text-[#2F66F4] hover:text-darkPrimary"
                to="/logowanie"
              >
                Zaloguj się
              </Link>
              <Link
                className="bg-primary transition-colors font-medium border-primary text-white rounded-full flex items-center text-[.8rem] py-3 px-8"
                to="/rejestracja"
              >
                Zarejestruj się za darmo!
                <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
              </Link>
            </>
          ))}
        {account === "worker" && (
          <Link
            className="rounded-full max-w-max text-white text-[.8rem] font-semibold flex items-center py-3 px-8 bg-secondary md:mt-0 md:ml-4"
            to="/praca"
          >
            Wypełnij formularz{" "}
            <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
          </Link>
        )}
      </div>
      <div
        onClick={() => setActive((prev) => !prev)}
        className="burger flex flex-col relative z-50 md:hidden h-5 w-8 justify-between cursor-pointer"
      >
        <div
          style={
            active
              ? {
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                  maxWidth: "100%",
                }
              : { maxWidth: "60%" }
          }
          className={`${
            account === "worker" ? "bg-secondary" : "bg-primary"
          } ${lineStyle}`}
        ></div>
        <div
          style={active ? { opacity: 0 } : {}}
          className={`${
            account === "worker" ? "bg-secondary" : "bg-primary"
          } ${lineStyle}`}
        ></div>
        <div
          style={
            active
              ? {
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%) rotate(-45deg)",
                  maxWidth: "100%",
                }
              : { maxWidth: "60%", marginLeft: "auto" }
          }
          className={`${
            account === "worker" ? "bg-secondary" : "bg-primary"
          } ${lineStyle}`}
        ></div>
      </div>
    </>
  );
};

type CustomLink = {
  children: JSX.Element | string;
  to: string;
  className?: string;
};

const CustomLink = ({ children, to, className }: CustomLink) => {
  const { account } = useContext(AccountContext);
  const activePath = useResolvedPath(to);
  const isActive = useMatch({ path: `${activePath.pathname}/*`, end: true });
  return (
    <Link
      to={to}
      className={`${className && className} transition-colors font-medium ${
        isActive
          ? account === "employer"
            ? "text-[#2F66F4]"
            : "text-[#F98D3D]"
          : account === "employer"
          ? "hover:text-[#2F66F4]"
          : "hover:text-[#F98D3D]"
      }`}
    >
      {children}
    </Link>
  );
};

const HashLink = () => {
  const { account } = useContext(AccountContext);
  const navigate = useNavigate();
  const handleScroll = () => {
    navigate("/");
    const section = document.querySelector("#jzp");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`transition-colors font-medium ${
        account === "worker" ? "hover:text-[#F98D3D]" : "hover:text-[#2F66F4]"
      }`}
      onClick={handleScroll}
    >
      {account === "worker"
        ? "Co muszę zrobić, aby dostać pracę?"
        : "Jak wygląda nasza baza?"}
    </button>
  );
};
