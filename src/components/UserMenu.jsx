import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserMenu({ active, setUser, email }) {
  switch (active) {
    case "books":
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link active" to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/account">
              {email}
            </Link>
          </li>
          <li className="nav-item ">
            <button className="btn-link" onClick={() => setUser(null)}>
              Log Out
            </button>
          </li>
        </ul>
      );
      break;

    case "account":
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link active " to="/account">
            {email}
            </Link>
          </li>
          <li className="nav-item ">
            <button className="btn-link" onClick={() => setUser(null)}>
              Log Out
            </button>
          </li>
        </ul>
      );
      break;

    default:
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link account" to="/">
              Books
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link active " to="/account">
            {email}
            </Link>
          </li>
          <li className="nav-item ">
            <button className="btn-link" onClick={() => setUser(null)}>
              Log Out
            </button>
          </li>
        </ul>
      );
  }
}
