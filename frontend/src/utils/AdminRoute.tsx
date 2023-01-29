import { useAppSelector } from "../main";
import { Navigate } from "react-router";
import Loader from "../components/Loader";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const auth = useAppSelector(state => state.login)
    const { is_staff } = auth.data
    const { isLoading } = auth
    if(isLoading) return <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>
    return is_staff ? children : <Navigate to='/profil' />
}