import axios from "axios";
import { FormEvent, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import { inputStyles } from "../Contact";
import Loader from "../../components/Loader";
import { reportSuccessMan } from "../../assets/profile/profile";
import { passwordNotVisible, passwordVisible } from "../../assets/general";

export default function Form() {
  const [confPassword, setConfPassword] = useState("");
  const [status, setStatus] = useState<boolean | undefined | string>(undefined);
  const [passwordShown, setPasswordShown] = useState(false);
  const [accepts, setAccepts] = useState({
    statute: false,
    policy: false,
  });
  const [employerDetails, setEmployerDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    nip: "",
    password: "",
  });

  const handleSubmit = (e?: FormEvent) => {
    e && e.preventDefault();
    setStatus("loading");
    if (employerDetails.nip.length !== 10)
      return setStatus("NIP powinien posiadać 10 cyfr!");
    if (confPassword !== employerDetails.password)
      return setStatus("Hasła się nie zgadzają!");
    if (employerDetails.password.length < 6)
      return setStatus("Hasło musi posiadać co najmniej 6 znaków!");
    axios
      .post("/api/signup", JSON.stringify(employerDetails), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => setStatus(true))
      .catch((err) =>
        setStatus(
          typeof err.response.data[0] === "string"
            ? err.response.data[0]
            : "Wystąpił błąd!"
        )
      );
  };

  return (
    <div className="flex flex-col text-center md:shadow-boxPrimary items-center xl:flex-1 xl:max-w-[10in] bg-white py-[1in] px-[8vw] md:py-10 md:px-16 md:rounded-3xl xl:px-24 xl:py-12 xl:self-start">
      {status === true ? (
        <div className="flex flex-col text-center items-center gap-4">
          <img
            className="max-w-[1.4in] w-full mb-6"
            src={reportSuccessMan}
            alt=""
          />
          <h2 className="font-semibold text-xl sm:text-2xl">
            Sprawdź pocztę i aktywuj konto!
          </h2>
          <p className="text-[#3C4663] flex flex-col items-center gap-2 text-[.8rem]">
            Link aktywacyjny wysłaliśmy na adres:
            <span className="text-sm font-medium">{employerDetails.email}</span>
          </p>
          <div className="flex flex-col items-end sm:flex-row sm:items-center gap-8 mt-6 sm:justify-end">
            <span className="font-semibold transition-colors text-[.8rem] min-w-max">
              Wiadomość nie dotarła?
            </span>
            <FilledButton onClick={handleSubmit}>
              Prześlij ponownie link aktywacyjny
            </FilledButton>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-[2.4rem] mb-8 xl:mb-10 w-full">
            Zarejestruj się
          </h2>
          <form
            className="flex flex-col gap-4 w-full font-medium relative"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col max-w-full sm:grid grid-cols-2 gap-6 xl:gap-8">
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="firstName">
                  Imię
                </label>
                <input
                  className={inputStyles.input}
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={employerDetails.first_name}
                  onChange={(e) =>
                    setEmployerDetails((prev) => {
                      return { ...prev, first_name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="lastName">
                  Nazwisko
                </label>
                <input
                  className={inputStyles.input}
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={employerDetails.last_name}
                  onChange={(e) =>
                    setEmployerDetails((prev) => {
                      return { ...prev, last_name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  className={inputStyles.input}
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={employerDetails.email}
                  onChange={(e) =>
                    setEmployerDetails((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="nip">
                  NIP
                </label>
                <input
                  className={inputStyles.input}
                  required
                  type="text"
                  name="nip"
                  id="nip"
                  value={employerDetails.nip}
                  onChange={(e) =>
                    setEmployerDetails((prev) => {
                      return { ...prev, nip: e.target.value };
                    })
                  }
                />
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="password">
                  Hasło
                </label>
                <div className="relative self-stretch">
                  <input
                    className={inputStyles.input}
                    required
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
                    value={employerDetails.password}
                    onChange={(e) =>
                      setEmployerDetails((prev) => {
                        return { ...prev, password: e.target.value };
                      })
                    }
                  />
                  <button
                    type="button"
                    onMouseDown={() => setPasswordShown(true)}
                    onMouseUp={() => setPasswordShown(false)}
                    onMouseLeave={() => setPasswordShown(false)}
                    className="absolute top-[50%] translate-y-[-50%] right-6"
                  >
                    {passwordShown ? (
                      <img src={passwordVisible} alt="Show" />
                    ) : (
                      <img src={passwordNotVisible} alt="Show" />
                    )}
                  </button>
                </div>
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-sm" htmlFor="confPassword">
                  Powtórz hasło
                </label>
                <input
                  className={inputStyles.input}
                  required
                  type="password"
                  name="confPassword"
                  id="confPassword"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-between my-4">
              <div className="flex flex-col gap-4">
                <div className="relative flex gap-4 items-center justify-start mt-6">
                  <input
                    type="checkbox"
                    required
                    id="statute"
                    name="signup"
                    onChange={(e) =>
                      setAccepts((prev) => ({
                        ...prev,
                        statute: e.target.checked,
                      }))
                    }
                  />
                  <label className="text-sm" htmlFor="statute">
                    Akceptuję regulamin
                  </label>
                </div>
                <div className="relative flex gap-4 items-center justify-start">
                  <input
                    type="checkbox"
                    required
                    id="policy"
                    name="signup"
                    onChange={(e) =>
                      setAccepts((prev) => ({
                        ...prev,
                        policy: e.target.checked,
                      }))
                    }
                  />
                  <label className="text-sm" htmlFor="policy">
                    Akceptuję politykę prywatności
                  </label>
                </div>
              </div>
              <div className="flex flex-row-reverse sm:flex-row items-center gap-4">
                {status === "loading" && <Loader />}
                {status && status !== "loading" && (
                  <span className="text-red-400 font-medium">{status}</span>
                )}
                <FilledButton type="submit">Załóż konto</FilledButton>
              </div>
            </div>
            <div className="relative flex items-center mt-4 mb-2">
              <span className="relative mx-auto bg-white px-6 xl:px-10 py-3 z-10">
                Już posiadasz konto?{" "}
                <Link
                  className="text-[#2F66F4] font-semibold hover:text-darkPrimary transition-colors"
                  to="/logowanie"
                >
                  Zaloguj się
                </Link>
              </span>
              <div className="bg-[#DFDFDF] absolute left-0 right-0 h-[2px]" />
            </div>
          </form>
        </>
      )}
    </div>
  );
}
