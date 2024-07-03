import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";
import RegisterLogin from "./components/RegisterLogin";
import Register from "./components/Register";
import Login from "./components/Login";

import Protected from "./components/Protected";
import Navigations from "./components/Navigations";
import Cabeza from "./components/Cabeza";
import store from "./store.js";
import { Provider } from "react-redux";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Provider store={store}>
      <>
        <Navigations user={user} setUser={setUser} />
        <Cabeza />

        <div className="cuerpo">
          <Routes>
            <Route
              path="/"
              element={<Books user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/login-register"
              element={<RegisterLogin user={user} setUser={setUser} />}
            ></Route>

            <Route
              path="/register"
              element={<Register user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/login"
              element={<Login user={user} setUser={setUser} />}
            ></Route>
            
            <Route
              path="/account"
              element={<Protected user={user} setUser={setUser} />}
            >
              <Route
                path="/account"
                element={<Account user={user} setUser={setUser} />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </>
    </Provider>
  );
}

export default App;
