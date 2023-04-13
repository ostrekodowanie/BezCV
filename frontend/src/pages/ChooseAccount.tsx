import Control, { Controller } from "react-control-js";
import {
  accountCand,
  accountEmp,
  buttonArrow,
  candUnderline,
  empUnderline,
} from "../assets/account/account";
import { AccountType } from "../reducers/AccountProvider";

export const inputStyles =
  "py-3 px-6 rounded shadow-[0px_6px_132px_rgba(76,101,234,0.08)] bg-white placeholder:text-[#B4BFF7] font-medium text-primary";

const pros = {
  employer: [
    "w naszej bazie znajdziesz wyselekcjonowanych pracowników gotowych do pracy od zaraz",
    "wstępnie przygotowujemy kandydatów, określając ich kompetencje miękkie",
    "nie musisz tworzyć ogłoszenia o pracę",
    "wybierasz osoby, które spełniają Twoje oczekiwania względem pracy na stanowisku: Sprzedaż, Administracja oraz Obsług Klienta",
    "zmniejszysz koszt pozyskania pracownika i skrócisz czas trwania rekrutacji",
  ],
  candidate: [
    "znajdziesz pracę, która wykorzystuje Twoje mocne strony",
    "uzyskasz większą satysfakcję z pracy, dzięki bardziej precyzyjnemu dopasowaniu swoich umiejętności do stanowiska",
    "nie będziesz musiał tworzyć swojego CV, przygotujemy profil dla Ciebie zupełnie za darmo",
    "sprawdzisz swoje kompetencje, porównując je do innych osób na rynku",
    "będziesz dostawać oferty pracy zgodne z Twoimi oczekiwaniami finansowymi",
  ],
};

export default function ChooseAccount({
  setAccount,
}: {
  setAccount: (account: AccountType) => void;
}) {
  return (
    <section className="px-[8vw] md:px-[16vw] 2xl:px-[20vw] py-[8vw] xl:py-0 min-h-screen xl:flex items-center relative">
      <Controller
        className="md:items-center flex flex-col-reverse xl:items-stretch xl:grid gap-8 grid-cols-2 mt-[15vh]"
        opacity={1}
        stagger={100}
        ease="ease-out"
      >
        <Control
          element={
            <div className="relative mt-[2in] xl:mt-0 flex flex-col items-stretch justify-end h-full gap-8 bg-white shadow-primaryBig rounded-t-3xl rounded-b after:bg-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[4px] after:rounded-full px-8 py-10 md:p-12">
              <img
                className="absolute max-w-[90%] -translate-y-[80%] top-0 sm:max-w-[70%] left-[50%] -translate-x-[50%] -z-10"
                src={accountEmp}
                alt=""
              />
              <h2 className="font-bold text-center text-2xl">
                Jestem <span className="text-primary">pracodawcą!</span>
              </h2>
              <h3 className="max-w-[80%] text-xl font-medium">
                Dlaczego{" "}
                <div className="relative inline-block">
                  <span className="relative z-10">warto</span>{" "}
                  <img
                    className="absolute -bottom-1"
                    src={empUnderline}
                    alt=""
                  />
                </div>{" "}
                <span className="font-semibold">rekrutować</span> za pomocą{" "}
                <span className="font-semibold">bezCV?</span>
              </h3>
              <ul className="flex flex-col gap-6 text-[.95rem] text-[#3C4663] font-medium list-accEmp">
                {pros.employer.map((pro) => (
                  <li key={pro}>
                    <span className="ml-2 block" key={"pro:" + pro}>
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setAccount("employer")}
                className="bg-primary w-full rounded-full mt-6 py-4 text-[.8rem] font-bold text-white flex items-center justify-center"
              >
                Jestem pracodawcą{" "}
                <img className="ml-2" src={buttonArrow} alt="" />
              </button>
            </div>
          }
        />
        <Control
          element={
            <div className="relative flex flex-col items-stretch justify-end gap-8 bg-white shadow-secondaryBig rounded-t-3xl rounded-b after:bg-secondary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[4px] after:rounded-full px-8 py-10 md:p-12">
              <img
                className="absolute max-w-[80%] sm:max-w-[58%] left-[50%] -translate-x-[60%] -translate-y-[85%] top-0 -z-10"
                src={accountCand}
                alt=""
              />
              <h2 className="font-bold text-center text-2xl">
                Chcę <span className="text-secondary">znaleźć pracę!</span>
              </h2>
              <h3 className="sm:max-w-[80%] text-xl font-medium">
                Dlaczego{" "}
                <div className="relative inline-block">
                  <span className="relative z-10">warto</span>{" "}
                  <img
                    className="absolute -bottom-1"
                    src={candUnderline}
                    alt=""
                  />
                </div>{" "}
                <span className="font-semibold">znaleźć pracę</span> za pomocą{" "}
                <span className="font-semibold">bezCV?</span>
              </h3>
              <ul className="flex flex-col gap-6 text-[.95rem] text-[#3C4663] font-medium list-accCand">
                {pros.candidate.map((pro) => (
                  <li key={pro}>
                    <span className="ml-2 block" key={"pro:" + pro}>
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setAccount("worker")}
                className="bg-secondary w-full rounded-full mt-6 py-4 text-[.8rem] font-bold text-white flex items-center justify-center"
              >
                Jestem kandydatem do pracy{" "}
                <img className="ml-2" src={buttonArrow} alt="" />
              </button>
            </div>
          }
        />
      </Controller>
    </section>
  );
}
