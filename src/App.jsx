import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account";
import Books from "./components/Books";

import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Navigations from "./components/Navigations";
import Cabeza from "./components/Cabeza";
import store from "./store.js";
import { Provider } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("My Account");
  const [active, setActive] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [token, setToken] = useState(null);

  return (
    <Provider store={store}>
      <>
        <Navigations
          user={user}
          setUser={setUser}
          active={active}
          email={email}
          setEmail={setEmail}
        />
        <Cabeza />

        <div className="cuerpo">
          <Routes>
            <Route
              path="/"
              element={
                <Books
                  user={user}
                  setUser={setUser}
                  active={active}
                  setActive={setActive}
                  selectedBookId={selectedBookId}
                  setSelectedBookId={setSelectedBookId}
                  token={token}
                  setToken={setToken}
                  myBooks={myBooks}
                  setMyBooks={setMyBooks}
                />
              }
            ></Route>

            <Route
              path="/register"
              element={
                <Register
                  user={user}
                  setUser={setUser}
                  active={active}
                  setActive={setActive}
                  setEmail={setEmail}
                  myBooks={myBooks}
                  setMyBooks={setMyBooks}
                  token={token}
                  setToken={setToken}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  active={active}
                  setActive={setActive}
                  setEmail={setEmail}
                  myBooks={myBooks}
                  setMyBooks={setMyBooks}
                  token={token}
                  setToken={setToken}
                />
              }
            ></Route>

            <Route
              path="/account"
              element={<Protected user={user} setUser={setUser} />}
            >
              <Route
                path="/account"
                element={
                  <Account
                    user={user}
                    setUser={setUser}
                    active={active}
                    setActive={setActive}
                    setEmail={setEmail}
                    myBooks={myBooks}
                    setMyBooks={setMyBooks}
                    token={token}
                  />
                }
              ></Route>
            </Route>
          </Routes>
        </div>
      </>
    </Provider>
  );
}

export default App;
