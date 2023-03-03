import axios from "axios";
import { FormEvent, useState } from "react";
import Loader from "../components/Loader";
import FilledButton from "../components/FilledButton";
import { contactMain } from "../assets/contact/contact";

export const inputStyles = {
  input:
    "peer rounded-lg bg-[#FAFAFA] border-[#F5F5F6] border-[1px] focus:bg-[#F1F4FC] py-3 px-6 w-full transition-colors",
};

export default function Contact() {
  const [status, setStatus] = useState<number | string | null>(null);
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    axios
      .post("/api/contact", JSON.stringify(details), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => setStatus(res.status))
      .catch(() => setStatus(500));
  };

  return (
    <section className="padding py-[1.4in] md:py-[1.8in] xl:py-[2in] flex flex-col sm:gap-16 xl:grid xl:gap-32 xl:items-center grid-cols-[1fr_1fr]">
      <div className="flex flex-col">
        <h1 className="flex flex-col gap-2 mb-12">
          <span className="font-semibold text-[0.95rem]">
            Skontaktuj się z nami
          </span>
          <span className="text-3xl md:text-4xl font-bold">
            za pomocą <span className="text-primary">formularza</span>
          </span>
        </h1>
        <div className="bg-white rounded-xl xl:self-start w-full flex flex-col gap-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:grid grid-cols-2 gap-8 max-w-full font-medium"
          >
            <div className="relative flex flex-col gap-2 items-start w-full">
              <label className="text-sm" htmlFor="firstName">
                Imię
              </label>
              <input
                className={inputStyles.input}
                required
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div className="relative flex flex-col gap-2 items-start w-full">
              <label className="text-sm" htmlFor="lastName">
                Nazwisko{" "}
                <span className="text-[#171A2380]">{"(opcjonalnie)"}</span>
              </label>
              <input
                className={inputStyles.input}
                required
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, last_name: e.target.value }))
                }
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
            <div className="relative flex flex-col gap-2 items-start w-full">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                className={inputStyles.input}
                required
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="relative flex flex-col gap-2 items-start w-full">
              <label className="text-sm" htmlFor="phone">
                Numer telefonu
              </label>
              <input
                className={inputStyles.input}
                required
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, phone: e.target.value }))
                }
                type="tel"
                name="phone"
                id="phone"
              />
            </div>
            <div className="relative flex flex-col gap-2 items-start w-full col-span-2">
              <label className="text-sm" htmlFor="message">
                Wiadomość
              </label>
              <textarea
                className={`${inputStyles.input} min-h-[1in]`}
                onChange={(e) =>
                  setDetails((prev) => ({ ...prev, message: e.target.value }))
                }
                name="message"
                id="message"
              ></textarea>
            </div>
            <div className="col-span-2 flex justify-between mt-2">
              <FilledButton>Wyślij wiadomość</FilledButton>
              {status && status !== "loading" && (
                <span
                  className={`font-medium ${
                    status === 200 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status === 200
                    ? "Wiadomość została wysłana!"
                    : "Wystąpił błąd"}
                </span>
              )}
              {status === "loading" && <Loader />}
            </div>
          </form>
        </div>
      </div>
      <img
        className="mt-24 mx-[12vw] xl:mx-0 xl:mt-0"
        src={contactMain}
        alt=""
      />
    </section>
  );
}
