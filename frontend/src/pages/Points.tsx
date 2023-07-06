import Summary from "./points/Summary";
import { Route, Routes } from "react-router";
import Packages from "./points/Packages";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Success from "./points/Success";

export default function Points() {
  useDocumentTitle("Doładuj swoje konto | bezCV - innowacyjny portal pracy");
  return (
    <Routes>
      <Route path="/" element={<Packages />} />
      <Route path="/podsumowanie" element={<Summary />} />
      <Route path="/sukces" element={<Success />} />
    </Routes>
  );
}
