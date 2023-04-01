import { Dispatch, SetStateAction, createContext } from "react";
import { PaymentDataType } from "../constants/points";

export type PaymentContextType = {
  paymentData: PaymentDataType;
  setPaymentData: Dispatch<SetStateAction<PaymentDataType>>;
};

export const PaymentContext = createContext<PaymentContextType>(null!);
