/* TODO 

- add your code to create a functional React component that renders a navigation bar for the different views in your single page application. 

You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import GuestMenu from "./GuestMenu";
import UserMenu from "./UserMenu";

export default function Navigations({ user, setUser, active }) {
  if (!user) {
    return (
      <nav className="navbar navbar-expand-lg ">
        <GuestMenu active={active} />
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg ">
        <UserMenu active={active} />
      </nav>
    );
  }
}
