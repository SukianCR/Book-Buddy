import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const token = useSelector((state) => state.register.token);

  console.log("token-> " + token);

  if (!token) {
    return <Navigate to="/register" />;
  }
  console.log("entro en protected");
  return <Outlet />;
}
