/* TODO 

- add your code to create a functional React component that renders a navigation bar for the different views in your single page application. 

You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Navigations({ user, setUser }) {
  //const token = useSelector((state) => state.register.token);

  if (!user) {
    return (
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link active" to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/login">
              Log in
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link " to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link active" to="/account">
              My account
            </Link>
          </li>
          <li className="nav-item ">
            <button className="btn-link" onClick={() => setUser(null)}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
