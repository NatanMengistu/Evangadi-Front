import React from "react";
import logo from "../asset/logo.png"; //
import classes from "./footer.module.css";
//import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const Footer = ({ isLoggedIn }) => {
  //const navigate = useNavigate();

  /*  const handleSignInClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    navigate("/");
  };*/

  return (
    <div className={classes.footer__container}>
      <div className={classes.icons}>
        <Link to="/dashboard">
          <img src={logo} alt="Logo" />
        </Link>
        <div className={classes.social__icons}>
          <FacebookIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>
      </div>

      <div className={classes.footer__sections}>
        <section className={classes.useful}>
          <h1>Useful Links</h1>
          <p>How it Works</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </section>
        <section>
          <h1>Contact Info</h1>
          <p>Evangadi Networks</p>
          <p>support@evangadi.com</p>
          <p>+1-2002-386-2702</p>
        </section>
      </div>
    </div>
  );
};

export default Footer;
