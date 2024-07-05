/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";

import { useRegisterMutation } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import Account from "./Account";
//import { setToken } from "./../api";

export default function Register({
  user,
  setUser,
  active,
  setActive,
  setEmail,
  myBooks,
  setMyBooks,
  token,
  setToken,
}) {
  const [registerUser] = useRegisterMutation();

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
        setToken(success.token);
        dispatch(setToken({ token: token }));

        setUser(success.user);
      }
    } catch (err) {
      setErrM(err.data.message);
    }
  };

  //setEmail(user.email);

  if (!user) {
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
  } else {
    <Account
      user={user}
      setUser={setUser}
      setEmail={setEmail}
      myBooks={myBooks}
      setMyBooks={setMyBooks}
      token={token}
      setToken={setToken}
    />;
  }

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
