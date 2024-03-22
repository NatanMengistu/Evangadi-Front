import React from "react";
import logo from "../asset/new.png";
import classes from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout, onSignInClick }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/register");
    if (onSignInClick) {
      onSignInClick();
    }
  };

  const handleLogoutClick = () => {
    // Handle logout logic here, maybe clear user data or token
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <div className={classes.header__container}>
      <Link to="/dashboard">
        <img src={logo} alt="Logo" />
      </Link>
      <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
        <p>Home</p>
      </Link>
      <p>How it Works</p>
      {isLoggedIn ? (
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <button onClick={handleSignInClick}>SIGN IN</button>
      )}
    </div>
  );
};

export default Header;
