import { payu } from "../../assets/points/points";
import { useContext } from "react";
import { inputStyles } from "../../constants/general";
import { PaymentDataType } from "../../constants/points";
import { PaymentContext } from "../../context/PaymentContext";

const BuyerInfo = () => {
  const { paymentData, setPaymentData } = useContext(PaymentContext);
  return (
    <div className="flex flex-col gap-12 self-stretch">
      <div className="flex flex-col gap-4">
        <h2 className="mb-6 font-semibold text-xl md:text-2xl">
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
              required
              value={paymentData.full_name}
              onChange={(e) =>
                setPaymentData((prev) => ({
                  ...prev,
                  full_name: e.target.value,
                }))
              }
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
              required
              value={paymentData.email}
              onChange={(e) =>
                setPaymentData((prev) => ({ ...prev, email: e.target.value }))
              }
              id="summary-names"
              name="summary"
              type="email"
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
              required
              value={paymentData.phone}
              onChange={(e) =>
                setPaymentData((prev) => ({ ...prev, phone: e.target.value }))
              }
              id="summary-names"
              name="summary"
              type="tel"
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
        <h2 className="mb-6 font-semibold text-xl md:text-2xl">
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
