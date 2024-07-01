/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./../api";
import { useLoginMutation } from "./../api";

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

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(form);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let success = false;

      if (e.target.name == "formRegister") {
        success = await registerUser(form).unwrap();
      } else {
        const em = form.emailLogin;
        const pass = form.passwordLogin;

        // setForm((prev) => ({
        //   ...prev,
        //   email: em,
        //   password: pass,
        // }));

        setForm(() => ({
          email: em,
          password: pass,
        }));

        console.log(form);
        success = await loginUser(form).unwrap();
      }

      if (success) {
        navigate("/account");
      }
    } catch (err) {
      if (e.target.name == "formRegister") {
        setErrM(err.data.message);
      } else {
        setErrML(err.data.message);
      }
    }
  };

  return (
    <>
      <div className="centro">
        <p className="legend">
          {" "}
          If you already have an account, please log in. If not, please register
          to create an account.
        </p>
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
