import { useAppSelector } from "../../main";
import { inputStyles } from "../../pages/Contact";
import FilledButton from "../FilledButton";
import Loader from "../Loader";
import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

export default function MorePointsForm() {
  const auth = useAppSelector((state) => state.login);
  const { first_name } = auth.data;
  const { access } = auth.tokens;
  const [data, setData] = useState({
    first_name: first_name,
    points_quantity: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.post("/api/more-points", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
    });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(?=\d)/g, "$1 ");
    value = value.slice(0, 11);
    setData((prev) => ({
      ...prev,
      phone_number: value,
    }));
  };

  return (
    <form
      className="bg-white sm:rounded-3xl shadow-primaryBig flex flex-col gap-8 px-[8vw] py-12 sm:p-12 sm:min-w-[5in] xl:min-w-0 self-stretch"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <label
          className="text-sm font-semibold"
          htmlFor="more_points_first_name"
        >
          Twoje imię
        </label>
        <input
          className={inputStyles.input}
          type="text"
          id="more_points_first_name"
          name="more_points"
          value={data.first_name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, first_name: e.target.value }))
          }
          defaultValue={first_name}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label
          className="text-sm font-semibold"
          htmlFor="more_points_phone_number"
        >
          Numer telefonu
        </label>
        <input
          className={inputStyles.input}
          type="text"
          value={data.phone_number}
          id="more_points_phone_number"
          name="more_points"
          onChange={handlePhoneChange}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label
          className="text-sm font-semibold"
          htmlFor="more_points_phone_number"
        >
          Ilość tokenów
        </label>
        <input
          className={inputStyles.input}
          type="text"
          value={data.points_quantity}
          id="more_points_points_quantity"
          name="more_points"
          onChange={(e) =>
            setData((prev) => ({ ...prev, points_quantity: e.target.value }))
          }
        />
      </div>
      <div className="flex items-center gap-6">
        <FilledButton className="mt-4">Wyślij zgłoszenie</FilledButton>
        {loading && <Loader />}
      </div>
    </form>
  );
}
