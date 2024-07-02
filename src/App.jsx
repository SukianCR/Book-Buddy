import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";
import RegisterLogin from "./components/RegisterLogin";
import Protected from "./components/Protected";
import Navigations from "./components/Navigations";
import Cabeza from "./components/Cabeza";
import store from "./store.js";
import { Provider } from "react-redux";

function App() {
  // const [token, setToken] = useState(null);

  return (
    <Provider store={store}>
      <>
        <Navigations />
        <Cabeza />

        <div className="cuerpo">
          <Routes>
            <Route path="/" element={<Books />}></Route>
            <Route path="/register" element={<RegisterLogin />}></Route>

            <Route path="/account" element={<Protected />}>
              <Route path="/account" element={<Account />}></Route>
            </Route>
          </Routes>
        </div>
      </>
    </Provider>
  );
}

export default App;
