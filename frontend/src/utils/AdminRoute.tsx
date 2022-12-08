import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const auth = useAppSelector(state => state.login)
    const { type } = auth.data
    const { isLoading } = auth
    if(isLoading) return <></>
    return type === 'admin' ? children : <Navigate to='/profil' />
}