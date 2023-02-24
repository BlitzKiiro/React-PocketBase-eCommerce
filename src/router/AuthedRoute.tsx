import { Navigate, Outlet } from "react-router-dom";

const AuthedRoute = ({ user }: any) => {
  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthedRoute;
