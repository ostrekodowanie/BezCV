import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../main";
import { addPoints } from "../reducers/login";
import { PackageProps } from "../constants/points";
import Summary from "./points/Summary";
import { Route, Routes } from "react-router";
import Packages from "./points/Packages";

export default function Points() {
  return (
    <Routes>
      <Route path="/" element={<Packages />} />
      <Route path="/podsumowanie" element={<Summary />} />
    </Routes>
  );
}

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
