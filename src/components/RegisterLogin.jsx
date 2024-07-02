/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./../api";
import { useLoginMutation } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";

import { Navigate, Outlet } from "react-router-dom";

export default function RegisterLogin() {
  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errM, setErrM] = useState(null);
  const [errML, setErrML] = useState(null);
  const dispatch = useDispatch();

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const updateToken = (nToken) => {
  //   dispatch(updateToken(nToken));
  // };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let success = false;

      if (e.target.name == "formRegister") {
        success = await registerUser(form).unwrap();
      } else {
        const em = e.target.elements.emailLogin.value;
        const pass = e.target.elements.passwordLogin.value;

        setForm(() => ({
          email: em,
          password: pass,
        }));

        success = await loginUser(form).unwrap();
      }

      console.log("sux es" + success);

      if (success) {
        dispatch(setToken(success.token));
        navigate("/account");
      }
    } catch (err) {
      if (e.target.name == "formRegister") {
        // setErrM(err.data.message);
        console.log(err);
      } else {
        setErrML(err.data.message);
      }
    }
  };

  return (
    <>
      <div className="centro">
        <div className="tempMsgBox">
          <p className="legend">
            {" "}
            If you already have an account, please log in. If not, please
            register to create an account.{" "}
          </p>
          <p className="verde author">
            The login form works, just have to click the login button 2 times
            and ignore the error message - for now . The register form works, it
            just that it sends you back here to login. -for now.
          </p>
        </div>
      </div>

      <div className="contenedor formularios">
        <div className="hotpink login">
          <p className="hotpink playwrite">Login</p>

          <form onSubmit={submit} name="formLogin" className="sube_poco">
            <div className="form-group">
              <label></label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="emailLogin"
                // value="rebeca@gmail.com"
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
                // value="rebe"
                name="passwordLogin"
                onChange={updateForm}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          {errML && (
            <div>
              <p className="space"></p>
              <p className="error">{errML}</p>
            </div>
          )}
        </div>

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
