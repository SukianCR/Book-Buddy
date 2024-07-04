/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";
import { Navigate, Outlet } from "react-router-dom";

export default function Register({ user, setUser, active, setActive }) {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errM, setErrM] = useState(null);
  const dispatch = useDispatch();

  setActive("register");

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let success = false;

      success = await registerUser(form).unwrap();
      console.log("viene token en register", success.token);

      if (success) {
        dispatch(setToken(success.token));
        setUser(null);
        setUser(success.user);

        navigate("/account");
      }
    } catch (err) {
      setErrM(err.data.message);
    }
  };

  return (
    <>
      <div className="space"></div>

      <div className="contenedor formulario_solo">
        <div className="hotpink register">
          <p className="hotpink playwrite">Register</p>

          <form onSubmit={submit} name="formRegister">
            <div className="form-group">
              <label></label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={updateForm}
                required
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={updateForm}
                required
              />
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                onChange={updateForm}
              />
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                onChange={updateForm}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          {errM && (
            <div>
              <p className="space"></p>
              <p className="error">{errM}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
