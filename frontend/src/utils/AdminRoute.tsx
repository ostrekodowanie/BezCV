import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const auth = useAppSelector(state => state.login)
    const { is_staff } = auth.data
    const { isLoading } = auth
    if(isLoading) return <></>
    return is_staff ? children : <Navigate to='/profil' />
}