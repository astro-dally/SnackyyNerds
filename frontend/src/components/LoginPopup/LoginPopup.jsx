import React, { useState } from "react";
import "./LoginPopup.css";
import cross from "../../assets/icons/cross_icon.png";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login/register:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              className="name-input"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          {/* <input type="text" placeholder="Your name" required /> */}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className="email-input"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            className="password-input"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Acount" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use and privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
