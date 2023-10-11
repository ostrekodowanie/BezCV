import { Link, useSearchParams } from "react-router-dom";
import FilledButton from "../../components/FilledButton";
import InvoiceInfo from "../../components/points/InvoiceInfo";
import BuyerInfo from "../../components/points/BuyerInfo";
import {
  PaymentDataType,
  PromoCode,
  initialPaymentData,
  packages,
} from "../../constants/points";
import OrderInfo from "../../components/points/OrderInfo";
import { FormEvent, useMemo, useState, useEffect } from "react";
import {
  PaymentContext,
  PaymentContextType,
} from "../../context/PaymentContext";
import { useAppSelector } from "../../main";
import axios from "axios";

export default function Summary() {
  const [searchParams] = useSearchParams();
  const searchParamPoints = searchParams.get("points") || "";
  const foundPackage = packages.find(
    (p) => p.points === parseInt(searchParamPoints)
  );
  if (!foundPackage) return <NotFound />;
  const [loading, setLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const theBestCode =
    promoCodes.length > 0
      ? promoCodes.reduce(
          (prev, curr) => (curr.value > prev.value ? curr : prev),
          promoCodes[0]
        )
      : null;
  const { first_name, last_name, email, phone, nip } = useAppSelector(
    (state) => state.login.data
  );
  const [paymentData, setPaymentData] = useState<PaymentDataType>({
    ...initialPaymentData,
    full_name: `${first_name} ${last_name}`,
    email,
    phone,
    nip,
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/discounts");
      setPromoCodes(data);
    })();
  }, []);

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const taxedPrice = foundPackage.price * 1.23;
    const finalPrice = theBestCode
      ? foundPackage.price * ((100 - theBestCode.value) / 100) * 1.23
      : taxedPrice;
    axios
      .post(
        "/api/points/purchase",
        JSON.stringify({
          amount: foundPackage.points,
          price: finalPrice,
          expiry: foundPackage.days,
          email: paymentData.email,
          phone: paymentData.phone,
          street: paymentData.address,
          postal_code: paymentData.postal_code,
          city: paymentData.address,
          ...(theBestCode && { code_id: theBestCode.id }),
        })
      )
      .then((res) => (window.location.href = res.data))
      .finally(() => setLoading(false));
  };

  const contextValue = useMemo<PaymentContextType>(
    () => ({
      loading,
      setLoading,
      paymentData,
      setPaymentData,
    }),
    [paymentData, loading, setLoading, setPaymentData]
  );

  return (
    <section className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] 2xl:pt-[1.8in] bg-white">
      <form
        onSubmit={handlePayment}
        className="flex flex-col xl:grid grid-cols-[1fr_1px_1fr_1px_1fr] items-center xl:items-start gap-16 min-h-screen"
        id="payment-form"
      >
        <PaymentContext.Provider value={contextValue}>
          <BuyerInfo />
          <div className="h-[1px] w-full bg-[#EDEDED] xl:h-full self-stretch" />
          <InvoiceInfo />
          <div className="h-[1px] w-full bg-[#EDEDED] xl:h-full self-stretch" />
          <OrderInfo
            {...foundPackage}
            salePercentage={theBestCode ? theBestCode.value : null}
            addPromoCode={(code) => setPromoCodes((prev) => [...prev, code])}
          />
        </PaymentContext.Provider>
      </form>
    </section>
  );
}

const NotFound = () => {
  return (
    <div className="padding pt-[1.4in] pb-[.7in] 2xl:pb-[.9in] flex flex-col items-center gap-4 2xl:pt-[1.8in]">
      <h2 className="font-semibold text-xl md:text-2xl text-center">
        Nie znaleziono!
      </h2>
      <p className="text-center text-[#3C4663] jakarta font-medium text-sm max-w-[5in]">
        Pakiet punktów, którego szukałeś nie został znaleziony, spróbuj wykupić
        jeden z pakietów dostępnych w naszej ofercie!
      </p>
      <Link className="mt-4" to="/punkty">
        <FilledButton>Kup punkty</FilledButton>
      </Link>
    </div>
  );
};
