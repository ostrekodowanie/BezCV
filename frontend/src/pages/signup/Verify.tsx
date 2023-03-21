import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import Loader from "../../components/Loader";

export default function Verify() {
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
      <div className="flex flex-col gap-4 text-center items-center xl:items-start xl:w-max">
        {status.ok ? (
          <>
            <h1 className="font-semibold text-3xl md:text-4xl">
              Konto założone, gratulacje!
            </h1>
            <p className="text-[#74788D]">
              Możesz teraz w pełni korzystać z naszego serwisu
            </p>
            <Link to="/logowanie">
              <FilledButton>Ok, zaczynajmy!</FilledButton>
            </Link>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
