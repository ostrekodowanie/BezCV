import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import { arrowRight } from "../assets/general";
import { Link } from "react-router-dom";

export default function FixedButton() {
  const { account } = useContext(AccountContext);
  return (
    <Link
      to={account === "employer" ? "/rejestracja" : "/ankieta"}
      className={`sm:mx-0 fixed sm:hidden bottom-0 right-0 left-0 ${
        account === "employer" ? "bg-primary" : "bg-secondary"
      } font-semibold text-white flex items-center hover:scale-100 justify-center no-anim text-[.8rem] py-[14px] z-20`}
    >
      {account === "employer"
        ? "Zarejestruj się za darmo!"
        : "Wypełnij ankietę!"}
      <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </Link>
  );
}
