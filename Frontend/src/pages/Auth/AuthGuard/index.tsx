import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  redirectTo: string;
}

export const AuthGuard = ({ redirectTo }: AuthGuardProps) => {
  //  const { isLoggedin, fetching } = useAuth();

  //if (fetching) {
  //return <div>loading...</div>;
  //}

  return true ? <Outlet /> : <Navigate to={redirectTo} />;
};
