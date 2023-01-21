import { createContext, useState } from "react"
import ChooseAccount from "../pages/ChooseAccount"
import { useAppSelector } from "../main"

export type AccountType = 'employer' | 'worker' | null

export const AccountContext = createContext<{ account: AccountType, setAccount?: (account: AccountType) => void }>({
    account: null,
    setAccount: undefined
})

const accountFromStorage = localStorage.getItem('account')
const defaultAccount: AccountType | null = accountFromStorage ? accountFromStorage as AccountType : null

export default function AccountProvider({ children }: { children: JSX.Element }) {
    const { logged } = useAppSelector(state => state.login)
    const [account, setAccount] = useState<AccountType>(logged ? 'employer' : defaultAccount)

    const changeAccount = (account: AccountType) => {
        if(account) localStorage.setItem('account', account)
        setAccount(account)
    }
    
    return !account ? 
        <ChooseAccount setAccount={changeAccount} /> : 
        <AccountContext.Provider value={{ account, setAccount: changeAccount }}>
            {children}
        </AccountContext.Provider>
}