import { createContext, useEffect, useState } from "react";
import ChooseAccount from "../pages/ChooseAccount";
import { useAppSelector } from "../main";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export type AccountType = "employer" | "worker" | null;

export const AccountContext = createContext<{
  account: AccountType;
  setAccount: (account: AccountType) => void;
}>(null!);

const accountFromStorage = localStorage.getItem("account");
const defaultAccount: AccountType | null = accountFromStorage
  ? (accountFromStorage as AccountType)
  : null;

export default function AccountProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [searchParams] = useSearchParams();
  const { logged } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountType>(
    logged ? "employer" : defaultAccount
  );

  const changeAccount = (account: AccountType) => {
    if (account) localStorage.setItem("account", account);
    navigate("/");
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setAccount(account);
  };

  useEffect(() => {
    const queryAccount = searchParams.get("account");
    queryAccount && changeAccount(queryAccount as AccountType);
  }, []);

  return !account ? (
    <ChooseAccount setAccount={changeAccount} />
  ) : (
    <AccountContext.Provider value={{ account, setAccount: changeAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
