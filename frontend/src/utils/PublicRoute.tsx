import { useAppSelector } from "../main";
import { Navigate } from "react-router";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { logged, isLoading } = useAppSelector(state => state.login)
    if(isLoading) return <></>
    return logged ? <Navigate to='/skp' /> : children
}