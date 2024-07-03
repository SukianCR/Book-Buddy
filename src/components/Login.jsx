/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useLoginMutation } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const [errML, setErrML] = useState(null);
  const dispatch = useDispatch();

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
      success = await loginUser(form).unwrap();
      console.log("viene token en login", success.token);

      if (success) {
        dispatch(setToken(success.token));
        setUser(success.token);

        navigate("/account");
      }
    } catch (err) {
      setErrML(err.data.message);
    }
  };

  return (
    <>
      

      <div className="contenedor formulario_solo">
        <div className="hotpink login">
          <p className="hotpink playwrite">Login</p>
          <p className="space"></p>
          <form onSubmit={submit} name="formLogin" className="sube_poco">
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
      </div>
    </>
  );
}
