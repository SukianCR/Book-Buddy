import { useState } from "react";
import { Link } from "react-router-dom";

export default function GuestMenu({ active }) {
  switch (active) {
    case "login":
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link " to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link active" to="/login">
              Log in
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/register">
              Register
            </Link>
          </li>
        </ul>
      );
      break;

    case "register":
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link " to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/login">
              Log in
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link active" to="/register">
              Register
            </Link>
          </li>
        </ul>
      );
      break;

    case "books":
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link active " to="/">
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
      );
      break;
    default:
      return (
        <ul className="navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link " to="/">
              Books
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link " to="/login">
              Log in
            </Link>
          </li>

          <li className="nav-item ">
            <Link className="nav-link active" to="/register">
              Register
            </Link>
          </li>
        </ul>
      );
  }
}
