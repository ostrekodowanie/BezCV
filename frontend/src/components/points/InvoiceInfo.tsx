import { useContext, useState } from "react";
import { inputStyles } from "../../pages/Contact";
import { PaymentContext } from "../../context/PaymentContext";

export default function InvoiceInfo() {
  const { paymentData, setPaymentData } = useContext(PaymentContext);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 font-semibold text-xl md:text-2xl">Faktura VAT</h2>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-3">
          <label
            className="font-semibold text-[.8rem]"
            htmlFor="summary-address"
          >
            Adres
          </label>
          <input
            className={inputStyles.input}
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
            id="summary-city"
            name="summary"
            type="text"
            value={paymentData.address}
            onChange={(e) =>
              setPaymentData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
