import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import { arrowRight } from "../assets/general";
import { Link } from "react-router-dom";

export default function FixedButton() {
  const { account } = useContext(AccountContext);
  return (
    <Link
      to={account === "employer" ? "/rejestracja" : "/praca"}
      className={`sm:mx-0 fixed sm:hidden bottom-8 right-[8vw] left-[8vw] ${
        account === "employer" ? "bg-primary" : "bg-secondary"
      } font-semibold text-white rounded-full flex items-center hover:scale-100 justify-center no-anim text-[.8rem] py-[14px] z-20`}
    >
      {account === "employer"
        ? "Zarejestruj się za darmo!"
        : "Wypełnij ankietę!"}
      <img className="max-h-[1.2em] ml-2" src={arrowRight} alt="" />
    </Link>
  );
}
