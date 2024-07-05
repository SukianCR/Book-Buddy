/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useLoginMutation } from "./../api";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./../api";
import Account from "./Account";

export default function Login({
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
  const [loginUser] = useLoginMutation();

  const [form, setForm] = useState();
  const [errML, setErrML] = useState(null);
  const dispatch = useDispatch();
  //const token2 = useSelector((state) => state.register.token);

  setActive("login");

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
        // dispatch(setToken(success?.token));
        // dispatch(setToken({token:success.token}));
        setToken(success.token);
        console.log("token en login", success.token);

        setUser(success.token);
      }
    } catch (err) {
      setErrML(err.data.message);
      console.log(err);
    }
  }; //setEmail(user.email);

  if (!user) {
    return (
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
              <label> </label>
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
    );
  } else {
    return (
      <>
        <Account
          user={user}
          setUser={setUser}
          setEmail={setEmail}
          myBooks={myBooks}
          setMyBooks={setMyBooks}
          token={token}
          setToken={setToken}
        />
        ;
      </>
    );
  }
}
