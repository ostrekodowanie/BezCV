import { ChangeEvent, useContext } from "react";
import { inputStyles } from "../../constants/general";
import { PaymentContext } from "../../context/PaymentContext";

export default function InvoiceInfo() {
  const { paymentData, setPaymentData } = useContext(PaymentContext);

  const changeNIP = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, "").slice(0, 6);
    value = value.replace(/(\d{2})(\d{3})/, "$1-$2");
    setPaymentData((prev) => ({ ...prev, nip: value }));
  };

  return (
    <div className="flex flex-col gap-4 self-stretch">
      <h2 className="mb-6 font-semibold text-xl md:text-2xl">Faktura VAT</h2>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[.8rem]" htmlFor="summary-nip">
            NIP
          </label>
          <input
            className={inputStyles.input}
            required
            id="summary-nip"
            name="summary"
            type="text"
            value={paymentData.nip}
            onChange={changeNIP}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[.8rem]"
            htmlFor="summary-address"
          >
            Adres
          </label>
          <input
            className={inputStyles.input}
            required
            id="summary-address"
            name="summary"
            type="text"
            value={paymentData.address}
            onChange={(e) =>
              setPaymentData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[.8rem]"
            htmlFor="summary-postal-code"
          >
            Kod pocztowy
          </label>
          <input
            className={inputStyles.input}
            required
            id="summary-postal-code"
            name="summary"
            type="text"
            value={paymentData.postal_code}
            onChange={(e) =>
              setPaymentData((prev) => ({
                ...prev,
                postal_code: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[.8rem]" htmlFor="summary-city">
            Miejscowość
          </label>
          <input
            className={inputStyles.input}
            required
            id="summary-city"
            name="summary"
            type="text"
            value={paymentData.city}
            onChange={(e) =>
              setPaymentData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
