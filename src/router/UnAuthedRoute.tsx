import { Navigate, Outlet } from "react-router-dom";

const UnAuthedRoute = ({ user }: any) => {
  return user == null || undefined ? <Outlet /> : <Navigate to='/' />;
};

export default UnAuthedRoute;
