import { useState } from "react";
import { inputStyles } from "../../pages/Contact";

export default function InvoiceInfo() {
  const [invoice, setInvoice] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 font-semibold text-xl md:text-2xl">Faktura</h2>
      {invoice && (
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
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              className="font-semibold text-[.8rem]"
              htmlFor="summary-city"
            >
              Miejscowość
            </label>
            <input
              className={inputStyles.input}
              id="summary-city"
              name="summary"
              type="text"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-sm">Wybierz formę faktury</h3>
        <div className="flex items-center gap-2 bg-[#F7FAFC] py-2 px-4 w-max rounded-full">
          <label
            htmlFor="no-invoice"
            className={`py-3 px-6 font-semibold cursor-pointer flex items-center text-[.75rem] rounded-full ${
              !invoice ? "text-white bg-primary" : "text-[5D7EAD]"
            }`}
          >
            Bez faktury
          </label>
          <input
            className="absolute opacity-0 -z-50"
            onChange={() => setInvoice(false)}
            type="radio"
            id="no-invoice"
            name="summary"
          />
          <label
            htmlFor="invoice"
            className={`py-3 px-6 font-semibold cursor-pointer flex items-center text-[.75rem] rounded-full ${
              invoice ? "text-white bg-primary" : "text-[5D7EAD]"
            }`}
          >
            Faktura na imię
          </label>
          <input
            className="absolute opacity-0 -z-50"
            onChange={() => setInvoice(true)}
            type="radio"
            id="invoice"
            name="summary"
          />
        </div>
      </div>
    </div>
  );
}
