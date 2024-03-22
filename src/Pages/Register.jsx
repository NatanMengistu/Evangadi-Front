import React, { useRef, useState } from "react";
import axios from "../axiosccon";
import { Link, useNavigate } from "react-router-dom";
import classes from "../Pages/register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons for show/hide password

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!userValue || !firstValue || !lastValue || !emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: userValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("Registered successfully. Please login.");
      navigate("/login"); // Redirect after successful registration
    } catch (error) {
      alert("Something went wrong");
      console.log(error.response);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={classes.bg}>
      <div className={classes.registration__container}>
        <section className={classes.registration__form}>
          <h1 style={{ textAlign: "center" }}>Join the Network</h1>
          <div style={{ textAlign: "center" }}>
            <p>
              <span style={{ display: "inline-block" }}>
                Already have an account?
              </span>{" "}
              <span style={{ display: "inline-block" }}>
                <Link to="/login" style={{ color: "orange" }}>
                  Login
                </Link>
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={classes.form__group}>
              <input ref={userNameDom} type="text" placeholder="Username" />
            </div>
            <div className={classes.form__group}>
              <div className={classes.name__group}>
                <div>
                  <input
                    ref={firstNameDom}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    ref={lastNameDom}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>
            <div className={classes.form__group}>
              <input ref={emailDom} type="text" placeholder="Email" />
            </div>
            <div className={classes.form__group}>
              <div style={{ position: "relative" }}>
                <input
                  ref={passwordDom}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <div
                  className={classes.password_toggle}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button type="submit">Agree and join</button>
          </form>
          <p style={{ textAlign: "center" }}>
            I agree to the <span style={{ color: "orange" }}>privacy</span> and{" "}
            <span style={{ color: "orange" }}>terms of service</span>
          </p>
          <p>
            <Link to="/login" style={{ color: "orange" }}>
              Already have an account
            </Link>
          </p>
        </section>
        <div className={classes.horizontalSections}>
          <section>
            <h2 style={{ color: "orange" }}>About</h2>
            <h1>Evangadi Networks and Q&A</h1>
            <p>
              No matter what stage of life you are in, whether you are just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <button
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "5px",
              }}
            >
              how it works{" "}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Register;
