import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../main";
import { addPoints } from "../reducers/login";
import Control, { Controller } from "react-control-js";
import { arrowRight, bcvToken } from "../assets/general";
import MorePointsForm from "../components/points/MorePointsForm";

interface PackageProps {
  points: number;
  price: number;
}

const packages: PackageProps[] = [
  {
    points: 10,
    price: 499,
  },
  {
    points: 15,
    price: 699,
  },
  {
    points: 20,
    price: 899,
  },
];

export default function Points() {
  const [chosen, setChosen] = useState<PackageProps | null>(null);
  const [days, setDays] = useState<30 | 90>(30);

  return (
    <>
      <section className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] flex flex-col items-center gap-16 2xl:pt-[1.8in] bg-white min-h-screen">
        <h2 className="font-semibold text-3xl md:text-4xl text-center leading-tight md:leading-tight max-w-[6.8in]">
          Doładuj swoje konto w tokeny{" "}
          <img className="inline-block max-h-[1.2em]" src={bcvToken} alt="" /> i{" "}
          <span className="font-bold">zdobądź pracowników!</span>
        </h2>
        <div className="flex flex-col gap-8 items-center self-stretch w-full">
          <div className="flex items-center gap-2 bg-[#F7FAFC] py-2 px-4 w-max rounded-full">
            <button
              className={`py-[14px] px-8 font-semibold flex items-center text-[.8rem] rounded-full ${
                days === 30 ? "text-white bg-primary" : "text-[5D7EAD]"
              }`}
              onClick={() => setDays(30)}
            >
              Plan 30 dniowy
            </button>
            <button
              className={`py-[14px] px-8 font-semibold flex items-center text-[.8rem] rounded-full ${
                days === 90 ? "text-white bg-primary" : "text-[5D7EAD]"
              }`}
              onClick={() => setDays(90)}
            >
              Plan 90 dniowy
            </button>
          </div>
          <p className="font-medium w-full text-center">
            1 token{" "}
            <img className="max-h-[1.2em] inline-block" src={bcvToken} alt="" />{" "}
            umożliwia dostęp do danych kontaktowych jednego kandydata
          </p>
          <Controller
            stagger={50}
            opacity={1}
            ease="ease-out"
            delay={500}
            className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap self-stretch gap-8 xl:grid grid-cols-3 mt-8"
          >
            {packages.map((pack) => (
              <Control
                className="control-package"
                element={
                  <Package
                    {...pack}
                    days={days}
                    setChosen={setChosen}
                    key={pack.points}
                  />
                }
              />
            ))}
          </Controller>
        </div>
      </section>
      <section className="padding bg-[#FAFCFE] py-[.7in] flex flex-col items-center gap-16 2xl:py-[.9in] xl:items-start xl:grid grid-cols-2">
        <div className="max-w-[min(6.8in,90%)] flex flex-col gap-8">
          <h2 className="font-semibold text-3xl md:text-4xl text-center xl:text-left leading-tight md:leading-tight">
            Chcesz kupić większą ilość tokenów?
          </h2>
          <p className="text-sm md:text-base text-[#3C4663] leading-relaxed md:leading-relaxed max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur. Nunc posuere eu a sem eget.
            Vel non nunc sit nibh consectetur blandit amet faucibus velit.
            Venenatis aliquam habitasse tempor magna vitae malesuada. Vel id
            pulvinar eget platea.
          </p>
        </div>
        <MorePointsForm />
      </section>
    </>
  );
}

const Package = ({
  setChosen,
  days,
  ...rest
}: PackageProps & {
  setChosen: Dispatch<SetStateAction<PackageProps | null>>;
  days: number;
}) => {
  const { points, price } = rest;
  return (
    <div className="flex flex-col self-stretch h-full justify-end gap-8 rounded-3xl relative items-center p-12 bg-white shadow-primaryBig flex-1">
      <h2 className="font-semibold text-4xl md:text-5xl w-max flex flex-col gap-4 items-center">
        {points}
        <span className="font-medium text-xl flex items-center">
          tokenów{" "}
          <img
            className="ml-2 max-h-[1.2em] inline-block"
            src={bcvToken}
            alt="bCV"
          />
        </span>
      </h2>
      <div className="h-[1px] self-stretch bg-[#ECF0F2]" />
      <h3 className="font-medium text-2xl">
        {price} zł{" "}
        <sup className="bg-clip-text text-transparent bg-[linear-gradient(90.04deg,#2F66F4_24.53%,#0D9AE9_82.58%)] font-medium">
          /netto
        </sup>
      </h3>
      <h3 className="font-medium text-[#5D7EAD] text-2xl">
        {(price / points).toFixed(2).toString()} zł{" "}
        <sup className="text-[#5D7EAD] font-medium">/1 token bCV</sup>
      </h3>
      <h4 className="text-[#5D7EAD] text-center">
        Okres ważności 3 tokenów - {days} dni
      </h4>
      <button
        className="bg-primary font-medium border-primary mt-8 justify-center text-white rounded-full w-full flex items-center text-[.75rem] py-[14px] px-8"
        onClick={() => setChosen(rest)}
      >
        Kup teraz!{" "}
        <img
          className="ml-2 max-h-[1em] inline-block"
          src={arrowRight}
          alt=""
        />
      </button>
    </div>
  );
};

const ChosenPackage = ({
  points,
  price,
  setChosen,
}: PackageProps & {
  setChosen: Dispatch<SetStateAction<PackageProps | null>>;
}) => {
  const { id } = useAppSelector((state) => state.login.data);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const handleSuccess = async (points: number) => {
    setLoading(true);
    const resp = await axios.post(
      "/api/points/purchase",
      JSON.stringify({ employer: id, amount: points, price }),
      { headers: { "Content-Type": "application/json" } }
    );
    if (resp.status === 201) dispatch(addPoints(points));
    setLoading(false);
    setStatus(resp.status);
  };

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span className="flex items-center gap-4">
          Przetwarzanie płatności <Loader />
        </span>
      </div>
    );

  if (status)
    return (
      <div className="h-full w-full flex items-center justify-center">
        {status === 201 ? (
          <h1 className="text-3xl">Dziękujemy za zakup!</h1>
        ) : (
          <span className="text-red">
            Wystąpił błąd. Skontaktuj się z obsługą.
          </span>
        )}
      </div>
    );

  return (
    <div className="flex flex-col gap-4 rounded items-center p-6 shadow">
      <h2>{points} kontaktów</h2>
      <h3 className="font-bold text-3xl">{price} zł</h3>
      <button onClick={() => setChosen(null)}>Cofnij</button>
    </div>
  );
};
