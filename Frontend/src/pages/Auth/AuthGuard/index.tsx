import { Navigate, Outlet } from "react-router-dom";
import Spin from "shared/components/Spin";
import useAuth from "shared/hooks/useAuth";

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
