import axios from "axios";
import { FormEvent, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import { inputStyles } from "../../constants/general";
import Loader from "../../components/Loader";
import { reportSuccessMan } from "../../assets/profile/profile";
import { passwordNotVisible, passwordVisible } from "../../assets/general";
import PolicyAccept from "../../components/survey/PolicyAccept";
import Banner from "../../components/signup/Banner";
import { checkmark } from "../../assets/points/points";

const initialPolicy = {
  statute: false,
  policy: false,
};

export default function Form() {
  const [confPassword, setConfPassword] = useState("");
  const [status, setStatus] = useState<boolean | undefined | string>(undefined);
  const [codeStatus, setCodeStatus] = useState<boolean | undefined | string>(
    undefined
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [policyActive, setPolicyActive] = useState(initialPolicy);
  const [accepts, setAccepts] = useState(initialPolicy);
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
    if (!accepts.policy || !accepts.statute)
      return setStatus("Wymagana akceptacja regulaminu i polityki prywatności");
    if (employerDetails.nip.length !== 10)
      return setStatus("NIP powinien posiadać 10 cyfr!");
    if (confPassword !== employerDetails.password)
      return setStatus("Hasła się nie zgadzają!");
    if (employerDetails.password.length < 6)
      return setStatus("Hasło musi posiadać co najmniej 6 znaków!");

    axios
      .post("/api/signup", JSON.stringify(employerDetails))
      .then(() => setStatus(true))
      .catch((err) =>
        setStatus(
          typeof err.response.data[0] === "string"
            ? err.response.data[0]
            : "Wystąpił błąd!"
        )
      );
  };

  const handleCodeResend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCodeStatus("loading");
    axios
      .post(
        "/api/signup/resend",
        JSON.stringify({
          email: employerDetails.email,
          first_name: employerDetails.first_name,
        })
      )
      .then(() => setCodeStatus(true));
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
            {codeStatus === undefined ? (
              <FilledButton onClick={handleCodeResend}>
                Prześlij ponownie link aktywacyjny
              </FilledButton>
            ) : codeStatus === "loading" ? (
              <Loader />
            ) : (
              codeStatus === true && (
                <span className="text-green-400 font-medium">
                  Kod został wysłany
                </span>
              )
            )}
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
                    onTouchStart={() => setPasswordShown(true)}
                    onTouchEnd={() => setPasswordShown(false)}
                    onTouchCancel={() => setPasswordShown(false)}
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
            <div className="flex items-start gap-2 my-4">
              <div className="relative mt-[2px] min-w-[1em] w-[1em] h-[1em] bg-green-500 rounded-full flex justify-center items-center">
                <img className="max-h-[50%]" src={checkmark} alt="" />
              </div>
              <small className="font-medium text-left">
                Dzięki rejestracji otrzymasz możliwość kontaktu z 3 wybranymi
                kandydatami za darmo!
              </small>
            </div>
            <div className="relative flex gap-4 items-start justify-start mt-4">
              <input
                className="relative top-0.5"
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
              <label
                className="text-sm cursor-pointer text-left"
                htmlFor="policy"
              >
                Zapoznałem/am się z{" "}
                <Link
                  to="/docs/umowa-powierzenia-przetwarzania-danych-osobowych"
                  className="text-[#2F66F4] hover:text-darkPrimary transition-colors text-left"
                >
                  Umową powierzenia przetwarzania danych osobowych
                </Link>{" "}
                i akceptuję jej warunki
              </label>
            </div>
            <div className="flex items-end gap-8 flex-wrap justify-between mb-4">
              <div className="flex flex-col gap-3">
                <div className="relative flex gap-4 items-center justify-start">
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
                  <label className="text-sm cursor-pointer" htmlFor="statute">
                    Akceptuję{" "}
                    <button
                      type="button"
                      className="text-[#2F66F4] hover:text-darkPrimary transition-colors"
                      onClick={() =>
                        setPolicyActive({ policy: true, statute: false })
                      }
                    >
                      regulamin
                    </button>
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
                  <label className="text-sm cursor-pointer" htmlFor="policy">
                    Akceptuję{" "}
                    <button
                      type="button"
                      className="text-[#2F66F4] hover:text-darkPrimary transition-colors"
                      onClick={() =>
                        setPolicyActive({ policy: true, statute: false })
                      }
                    >
                      politykę prywatności
                    </button>
                  </label>
                </div>
              </div>
              <div className="flex flex-row-reverse sm:flex-row items-center gap-4">
                {status === "loading" ? (
                  <Loader />
                ) : (
                  <FilledButton type="submit">Załóż konto</FilledButton>
                )}
                {status && status !== "loading" && (
                  <span className="text-red-400 font-medium">{status}</span>
                )}
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-4 w-full font-medium">
            <div className="relative flex items-center mt-4 mb-2">
              <span className="relative mx-auto bg-white px-6 xl:px-10 py-3 z-10 font-medium">
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
            <Banner />
            {(policyActive.policy || policyActive.statute) && (
              <PolicyAccept
                hide={() => setPolicyActive(initialPolicy)}
                onAccept={() => setPolicyActive(initialPolicy)}
                isForAccept={false}
                initialFormIndex={policyActive.policy ? 0 : 1}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
