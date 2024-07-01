import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const token = useSelector((state) => state.register.token);
  // const token = useSelector((state) => state.token);

  // let token = null;
  console.log("token-> " + token);

  if (!token) {
    return <Navigate to="/register" />;
  }
  return <Outlet />;
}
