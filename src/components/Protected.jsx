// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  // const token = useSelector((state) => state.register.token);
  let token = null;
  // token = "sihaytoken";
  console.log(token);

  if (!token) {
    return <Navigate to="/register" />;
  }
  return <Outlet />;
}
