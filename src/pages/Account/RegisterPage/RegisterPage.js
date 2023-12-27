import "./RegisterPageStyles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(18);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("password: ", password);
  };

  return (
    <div className="containerRegister">
      <div className="containerBackgroundRegister">
        <img
          className="backgroundImageRegister"
          src="/authbackground2.jpg"
        ></img>
      </div>
      <div className="containerInputRegister">
        <div className="containerLogoRegister">
          <h1>
            Potato<span>HardStore</span>
          </h1>
        </div>
        <p className="registerBanner">Cree su cuenta</p>
        <span className="">
          ¿Ya tiene una cuenta? <Link to={"/account/register"}>Ingresar</Link>
        </span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label className="registerLabel">
            Email:
            <input
              className="registerInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="registerLabel">
            Nombre:
            <input
              className="registerInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="registerLabel">
            Apellido:
            <input
              className="registerInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="registerLabel">
            Edad:
            <input
              className="registerInput"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label className="registerLabel">
            Contraseña:
            <input
              className="registerInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="registerButton">Registrarse</button>
        </form>
      </div>
    </div>
  );
};
