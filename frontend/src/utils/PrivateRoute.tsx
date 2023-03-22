import { useAppSelector } from "../main";
import { Navigate } from "react-router";
import Loader from "../components/Loader";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { logged, isLoading } = useAppSelector((state) => state.login);
  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  return logged ? children : <Navigate to="/rejestracja" />;
}
