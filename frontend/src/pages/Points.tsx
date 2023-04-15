import Summary from "./points/Summary";
import { Route, Routes } from "react-router";
import Packages from "./points/Packages";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Points() {
  useDocumentTitle("Tokeny | bezCV - innowacyjny portal pracy");
  return (
    <Routes>
      <Route path="/" element={<Packages />} />
      <Route path="/podsumowanie" element={<Summary />} />
    </Routes>
  );
}
