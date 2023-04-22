import { useEffect } from "react";
import { useAppSelector } from "../main";
import axios from "axios";

export default function AxiosProvider({ children }: { children: JSX.Element }) {
  const { access } = useAppSelector((state) => state.login.tokens);
  useEffect(() => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    access
      ? (axios.defaults.headers.common.Authorization = `Bearer ${access}`)
      : delete axios.defaults.headers.common.Authorization;
  }, [access]);
  return children;
}
