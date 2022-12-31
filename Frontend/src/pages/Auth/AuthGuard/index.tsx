import Spin from "components/Spin";
import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  redirectTo: string;
}

export const AuthGuard = ({ redirectTo }: AuthGuardProps) => {
  const { isLoggedin, fetching } = useAuth();

  if (fetching) {
    return <Spin />;
  }

  return isLoggedin ? <Outlet /> : <Navigate to={redirectTo} />;
};
