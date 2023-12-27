import "./LoginPageStyles.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import {LoadingSpinner} from "../../../components/LoadingSpinner/LoadingSpinner";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (isValidEmail(email)) {
      const client = { email: email, password: password };

      try {
        const session = await login(client);
        if (session) console.log("Loggeado");
      } catch (error) {
        console.log("ERRORRORR: ", error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (user) {
      navigate("/products?all=true");
    }
  }, [user, login]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="containerLogin">
          <div className="containerInput">
            <div className="containerForm">
              <div className="containerLogo">
                <h1>
                  Potato<span>HardStore</span>
                </h1>
              </div>
              <p className="loginBanner">Ingrese a su cuenta</p>
              <span className="">
                ¿No tiene una cuenta?{" "}
                <Link to={"/account/register"}>Regístrese</Link>
              </span>
              <form className="loginForm" onSubmit={handleSubmit}>
                <label className="loginLabel">
                  Email:
                  <input
                    className="loginInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="loginLabel">
                  Contraseña:
                  <input
                    className="loginInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button className="loginButton">Ingresar</button>
              </form>
            </div>
          </div>
          <div className="containerBackground">
            <img className="backgroundImage" src="/authbackground.jpg"></img>
          </div>
        </div>
      )}
    </>
  );
};
