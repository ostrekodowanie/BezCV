import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../main";
import { AccountContext } from "../providers/AccountProvider";
import { arrowRight, bcvToken, logo, logoHorizontal } from "../assets/general";
import { profileIcon } from "../assets/profile/profile";
import SurveyLink from "./header/SurveyLink";
import PointsHashLink from "./header/PointsHashLink";
import HomeHashLink from "./header/HomeHashLink";
import CustomLink from "./header/CustomLink";

export default function Header() {
  const [down, setDown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const cb = () => setDown(window.scrollY > 100);
    window.addEventListener("scroll", cb);
    return () => window.removeEventListener("scroll", cb);
  }, []);

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
  <Link to="/">
    <strong className="font-medium text-xl">
      bez<span className="text-primary">CV</span>
    </strong>
  </Link>
);

const lineStyle = "h-[3px] w-full transition rounded-xl";

const Nav = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [active, setActive] = useState(false);
  const auth = useAppSelector((state) => state.login);
  const location = useLocation();
  const { logged } = auth;
  const { points } = auth.data;

  useEffect(() => {
    setActive(false);
  }, [location]);

  return (
    <>
      <div
        className={`bg-[#000000] absolute inset-0 w-screen h-screen md:hidden transition-opacity ${
          active
            ? "opacity-40 z-10 md:-z-50 md:pointer-events-none"
            : "opacity-0 -z-50 pointer-events-none"
        }`}
      />
      <div
        className={`flex flex-col md:flex-row items-end bg-white gap-4 pt-[1.4in] md:pt-0 text-sm font-medium z-50 absolute px-[8vw] md:px-0 top-0 md:relative left-full transition-transform ${
          active && "-translate-x-full md:translate-x-0"
        } md:left-auto h-screen md:h-full md:items-center w-max`}
      >
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
        <HomeHashLink />
        {account === "employer" &&
          (logged ? (
            <>
              <CustomLink to="/oferty">Wyszukiwarka kandydatów</CustomLink>
              <CustomLink className="md:ml-2" to="/profil">
                <img className="max-h-[1.1em] mr-2" src={profileIcon} alt="" />
                Mój profil
              </CustomLink>
              <CustomLink
                className="font-semibold flex items-center text-base"
                to="/punkty"
              >
                {points.toString()}
                <img className="max-h-[1em] ml-2" src={bcvToken} alt="" />
              </CustomLink>
            </>
          ) : (
            <>
              <PointsHashLink />
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
                Zarejestruj się
                <img className="ml-2 max-h-[1.2em]" src={arrowRight} alt="" />
              </Link>
            </>
          ))}
        {account === "worker" && <SurveyLink />}
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
