// import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";
// // import Login from "./components/Login";
import RegisterLogin from "./components/RegisterLogin";
// import SingleBook from "./components/SingleBook";
import Protected from "./components/Protected";
import Navigations from "./components/Navigations";

function App() {
  // const [token, setToken] = useState(null);

  return (
    <>
      <Navigations />
      <div className="cabeza">
        <span className="material-symbols-outlined">menu_book</span>
        <h1 className="capriola-regular"> Book Buddy </h1>
        <span className="material-symbols-outlined">local_library</span>
      </div>

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
  );
}

export default App;
