import { MouseEvent, useContext, useState } from "react";
import FilledButton from "../FilledButton";
import axios from "axios";
import { PackageProps } from "../../constants/points";
import Loader from "../Loader";
import { PaymentContext } from "../../context/PaymentContext";

export default function PaymentButton() {
  const { loading } = useContext(PaymentContext);
  return loading ? (
    <Loader className="mx-auto" />
  ) : (
    <FilledButton
      form="payment-form"
      type="submit"
      className="w-full justify-center"
    >
      Zamawiam i płacę
    </FilledButton>
  );
}
