import { useAppSelector } from "../main";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { account } = useContext(AccountContext)
    const { logged, isLoading } = useAppSelector(state => state.login)
    if(!account || account === 'worker') return <Navigate to='/' />
    if(isLoading) return <></>
    return logged ? <Navigate to='/profil' /> : children
}