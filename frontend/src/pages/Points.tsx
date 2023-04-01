import axios from "axios";
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
