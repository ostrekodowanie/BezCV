import { useAppSelector } from "../main";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../reducers/AccountProvider";
import Loader from "../components/Loader";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { account } = useContext(AccountContext)
    const { logged, isLoading } = useAppSelector(state => state.login)
    if(!account || account === 'worker') return <Navigate to='/' />
    if(isLoading) return <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>
    return logged ? <Navigate to='/profil' /> : children
}