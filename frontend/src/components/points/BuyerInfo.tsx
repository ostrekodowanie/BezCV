import { payu } from "../../assets/points/points";
import { useAppSelector } from "../../main";
import { inputStyles } from "../../pages/Contact";

const BuyerInfo = () => {
  const { first_name, last_name, email } = useAppSelector(
    (state) => state.login.data
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="mb-8 font-semibold text-xl md:text-2xl">
          Dane do zamówienia
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label
              className="font-semibold text-[.8rem]"
              htmlFor="summary-names"
            >
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
              Zgadzam się na otrzymywanie informacji, specjalnych ofert i
              promocji od bezCV.
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mb-8 font-semibold text-xl md:text-2xl">
          Sposób płatności
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Domyślnie</h3>
          <button className="flex items-center w-max py-3 px-6 border-[2px] border-[#2F66F4] rounded-2xl">
            <img className="h-[1.5rem]" src={payu} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo;
