/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./../api";

export default function RegisterLogin() {
  const [registerUser] = useRegisterMutation();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errM, setErrM] = useState(null);

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
      if (success) {
        navigate("/account");
      }
    } catch (err) {
      setErrM(err.data.message);

      console.log("cayo al error" + err.data.message);
    }
  };

  return (
    <>
      <div className="centro">
        <p className="legend">
          {" "}
          If you already have an account, please log in. If not, then please
          register to create an account.
        </p>

      
      </div>

      <div className="contenedor formularios">
        <div className="hotpink login">
          <p className="hotpink playwrite">Login</p>
        </div>

        <div className="hotpink register">
          <p className="hotpink playwrite">Register</p>

          <form onSubmit={submit}>
            <div className="form-group">
              <label></label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                onChange={updateForm}
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
              Submit
            </button>
          </form>
          {errM && <p className="error">{errM}</p>}
        </div>
      </div>
    </>
  );
}
