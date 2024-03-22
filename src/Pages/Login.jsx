import React, { useRef, useState } from "react";
import axios from "../axiosccon";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classes from "../Pages/login.module.css"; // Import your CSS file for styling

function Login() {
  const Navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      if (data && data.token) {
        alert("Login successful.");
        localStorage.setItem("token", data.token);
        Navigate("/dashboard"); // Redirect to the question page
        console.log(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred");
      console.log(error.response.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.div1}>
      <div className={classes.loginContainer}>
        <section className={classes.form}>
          <p className={classes.linkText}>
            <span>Don't have an account? </span>
            <Link to="/register">Create an account</Link>
          </p>
          <br />
          <form onSubmit={handleSubmit}>
            <div className={classes.form__group}>
              <input ref={emailDom} type="text" placeholder="Email" />
            </div>
            <div className={classes.form__group}>
              <div className={classes.passwordGroup}>
                <input
                  ref={passwordDom}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={classes.passwordIcon}
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <button
              className={classes.button}
              style={{
                backgroundColor: "orange",
                color: "white",
                alignContent: "center",
                width: "100%",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
          <br />
          <p className={classes.linkText}>
            <Link to="/register">Create an account</Link>
          </p>
          <br />
          <br />
        </section>
        <div className={classes.horizontalSections}>
          <section className={classes.aboutSection}>
            <h2 style={{ color: "orange" }}>About</h2>
            <h1>Evangadi Networks and Q&A</h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button style={{ color: "white", backgroundColor: "orange" }}>
              How it works
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
