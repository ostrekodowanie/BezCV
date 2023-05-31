import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../providers/AccountProvider";
import { arrowRight } from "../assets/general";
import { Link } from "react-router-dom";
import { useAppSelector } from "../main";

export default function FixedButton() {
  const [isVisible, setIsVisible] = useState(true);
  const { account } = useContext(AccountContext);
  const { logged } = useAppSelector((state) => state.login);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const offset = 100; // Adjust this value to set the offset from the bottom
      if (windowHeight + scrollTop >= scrollHeight - offset) {
        setIsVisible(false);
      } else {
        !isVisible && setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !logged ? (
    <Link
      to={account === "employer" ? "/rejestracja" : "/ankieta"}
      className={`sm:mx-0 fixed sm:hidden bottom-0 right-0 left-0 ${
        account === "employer" ? "bg-primary" : "bg-secondary"
      } ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity font-semibold text-white flex items-center hover:scale-100 justify-center no-anim text-[.8rem] py-[14px] z-20`}
    >
      {account === "employer"
        ? "Zarejestruj się za darmo!"
        : "Wypełnij ankietę!"}
      <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </Link>
  ) : (
    <></>
  );
}
