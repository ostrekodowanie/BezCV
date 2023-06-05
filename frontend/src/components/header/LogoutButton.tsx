import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../main";
import { logout } from "../../providers/login";
import { useState } from "react";
import Loader from "../Loader";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { refresh } = useAppSelector((state) => state.login.tokens);
  const handleLogout = async () => {
    setIsLoading(true);
    const resp = await axios
      .post("/api/logout", refresh, {
        headers: { "Content-Type": "application/json" },
      })
      .finally(() => setIsLoading(false));
    if (resp.status === 200) dispatch(logout());
  };
  return isLoading ? (
    <Loader />
  ) : (
    <button
      className="font-medium w-max ml-[8vw] sm:ml-0 transition-colors text-negative hover:text-darkNegative"
      onClick={handleLogout}
    >
      Wyloguj się
    </button>
  );
}
