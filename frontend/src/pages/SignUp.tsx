import { Route, Routes } from "react-router-dom";
import Form from "./signup/Form";
import Verify from "./signup/Verify";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function SignUp() {
  useDocumentTitle("Rejestracja | bezCV - innowacyjny portal pracy");
  return (
    <section className="md:px-[12vw] xl:px-0 xl:flex justify-center md:pt-[1.5in] min-h-[120vh] bg-[#FCFCFC] md:pb-16">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/verify/*" element={<Verify />} />
      </Routes>
    </section>
  );
}
