import { Route, Routes } from "react-router";
import ChangePassword from "./login/ChangePassword";
import Form from "./login/Form";
import Recovery from "./login/Recovery";
import useDocumentTitle from "../hooks/useDocumentTitle";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
}

export default function Login() {
  useDocumentTitle("Logowanie | bezCV - innowacyjny portal pracy");
  return (
    <section className="md:px-[12vw] xl:px-0 xl:flex justify-center md:pt-[1.5in] min-h-screen bg-[#FCFCFC] md:pb-16">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/odzyskiwanie" element={<Recovery />} />
        <Route path="/reset-password/*" element={<ChangePassword />} />
      </Routes>
    </section>
  );
}
