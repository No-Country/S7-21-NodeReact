import { Link, useNavigate } from "@remix-run/react";
// import { FaGoogle, FaFacebook } from "react-icons/fa";
// import React, { useEffect } from 'react'
import hairstyle from "~/assets/images/hairstyle.png";
import { useDispatch } from "react-redux";
import { loginuser } from "../store/auth/authSlice";
import { useState } from "react";
import ShowToast from "./ShowToast";

export default function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      let response = await dispacth(loginuser(user))

      let status = response?.code === 200 ? true : false
      ShowToast(status, status ? response?.message : response?.message, () => { });
      if (!response) return
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-left">
          {/* <h2>¡Bienvenido a nuestra barbería!</h2>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p> */}
        </div>
        <div className="login-right">
          <h2>Inicia sesión</h2>
          <form onSubmit={handlelogin}>
            <div className="login-image">
              <img src={hairstyle} alt="Login" />
            </div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handlechange}
              value={user.email}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              value={user.password}
              required
            />

            <div className="login-forgot-password">
              <div className="login-remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Recuérdame</label>
              </div>
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit">Iniciar sesión</button>
          </form>
          <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>

          {/* <div className="login-social">
            <p>O inicia sesión con</p>
            <div className="login-social-icons">
              <Link to="/login/facebook">
                <FaFacebook />
              </Link>
              <Link to="/login/google">
                <FaGoogle />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
