import { useContext } from "react";
import { Route, Routes } from "react-router";
import { AccountContext } from "../reducers/AccountProvider";
import { logoHorizontal } from "../assets/general";

export default function Footer() {
  const { account } = useContext(AccountContext);

  return (
    <Routes>
      <Route path="/praca/*" element={<></>} />
      <Route
        path="*"
        element={
          <footer className="bg-[#F6F7F9] padding py-16 flex flex-wrap 2xl:flex md:grid-cols-2 md:grid gap-8 justify-between">
            <div className="flex flex-col gap-6">
              <img
                className="h-[2rem] mr-auto"
                src={logoHorizontal}
                alt="bezCV"
              />
              <p className="text-[#3C4663] 2xl:max-w-[3in] text-sm">
                {account === "employer"
                  ? "Bez problemu rekrutujesz, bez problemu pracujesz. Zwiększamy satysfakcję z pracy i pracownika."
                  : "Bez problemu pracujesz, bez problemu rekrutujesz. Zwiększamy satysfakcję z pracy i pracownika."}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <strong className="font-medium uppercase">Linki 1</strong>
              <ul className="text-[#3C4663] text-sm flex flex-col gap-3">
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <strong className="font-medium uppercase">Linki 2</strong>
              <ul className="text-[#3C4663] text-sm flex flex-col gap-3">
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <strong className="font-medium uppercase">Linki 3</strong>
              <ul className="text-[#3C4663] text-sm flex flex-col gap-3">
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
                <li>Link 5</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <button className="bg-white shadow-[0px_12px_45px_rgba(47,102,244,0.06)] rounded-xl px-6 py-3 text-sm font-medium">
                Facebook
              </button>
              <button className="bg-white shadow-[0px_12px_45px_rgba(47,102,244,0.06)] rounded-xl px-6 py-3 text-sm font-medium">
                Instagram
              </button>
              <button className="bg-white shadow-[0px_12px_45px_rgba(47,102,244,0.06)] rounded-xl px-6 py-3 text-sm font-medium">
                Twitter
              </button>
            </div>
          </footer>
        }
      />
    </Routes>
  );
}
