import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import Loader from "../../components/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { reportSuccessMan } from "../../assets/profile/profile";

export default function Verify() {
  useDocumentTitle("Zweryfikuj konto | bezCV - innowacyjny portal pracy");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState({
    ok: false,
    message: "",
  });

  useEffect(() => {
    if (!token) return;
    axios
      .get(`/api/signup/verify?token=${token}`)
      .then(() => setStatus({ ...status, ok: true }))
      .catch((err) =>
        setStatus({
          ok: false,
          message:
            typeof err.response.data === "string"
              ? err.response.data
              : "Wystąpił błąd!",
        })
      );
  }, [token]);

  return (
    <section className="padding py-[1.4in] flex items-center justify-center">
      {status.ok ? (
        <div className="flex flex-col text-center items-center gap-4">
          <img
            className="max-w-[1.4in] w-full mb-6"
            src={reportSuccessMan}
            alt=""
          />
          <h2 className="font-semibold text-xl sm:text-2xl">
            Konto założone, gratulacje!
          </h2>
          <p className="text-[#3C4663] flex flex-col items-center gap-2 text-[.8rem]">
            Możesz teraz w pełni korzystać z naszego serwisu
          </p>
          <FilledButton>
            <Link to="/login">Ok, zaczynajmy!</Link>
          </FilledButton>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
}
