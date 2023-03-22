import { useAppSelector } from "../../main";
import { inputStyles } from "../../pages/Contact";

const OrderInfo = () => {
  const { first_name, last_name, phone, email } = useAppSelector(
    (state) => state.login.data
  );
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 font-semibold text-xl md:text-2xl">
        Dane do zamówienia
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[.8rem]" htmlFor="summary-names">
            Imię i nazwisko
          </label>
          <input
            className={inputStyles.input}
            defaultValue={`${first_name} ${last_name}`}
            id="summary-names"
            name="summary"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[.8rem] cursor-pointer"
            htmlFor="summary-names"
          >
            Adres e-mail
          </label>
          <input
            className={inputStyles.input}
            defaultValue={email}
            id="summary-names"
            name="summary"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[.8rem] cursor-pointer"
            htmlFor="summary-names"
          >
            Numer telefonu
          </label>
          <input
            className={inputStyles.input}
            defaultValue={`+48 ${phone}`}
            id="summary-names"
            name="summary"
            type="text"
          />
        </div>
        <div className="flex items-start gap-3">
          <input className="mt-1" type="checkbox" id="offers-accept" />
          <label
            className="jakarta text-[.75rem] text-[#3C4663]"
            htmlFor="offers-accept"
          >
            Zgadzam się na otrzymywanie informacji, specjalnych ofert i promocji
            od bezCV.
          </label>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
