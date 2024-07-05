import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected({
  user,
  setUser,
  setEmail,
  myBooks,
  setMyBooks,
}) {
  //const token = useSelector((state) => state.register.token);

  // console.log("token-> " + token);

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
