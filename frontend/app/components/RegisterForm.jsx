import { Link, useNavigate } from "@remix-run/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import hairstyle from "~/assets/images/hairstyle.png";
import { useDispatch } from "react-redux";
import { registeruser } from "../store/auth/authSlice";
import { useState } from "react";
export default function LoginForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name !== "check-password") {
      setUser({ ...user, [name]: value });
    }

  };

  const checkboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "acceptTerms")
      setAcceptTerms(checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispacth(registeruser(user))
  };

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          {/* <h2>¡Bienvenido a nuestra barbería!</h2>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p> */}
        </div>
        <div className="login-right">
          <h2>Registro nuevo usuario</h2>
          <form onClick={handleRegister}>
            <div className="login-image">
              <img src={hairstyle} alt="Login" />
            </div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={handlechange}
              value={user.nombre}
              required
            />
            <label htmlFor="nombre">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              onChange={handlechange}
              value={user.apellido}
              required
            />

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
              value={user.clave}
              required
            />

            <label htmlFor="check-password">Repetir contraseña</label>
            <input
              type="password"
              id="check-password"
              name="check-password"
              onChange={handlechange}
              value={user.clave}
              required
            />

            <div className="terms">
              <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={acceptTerms} onChange={checkboxChange} />
              <label htmlFor="acceptTerms">&nbsp;Acepto los&nbsp;</label> <Link to="#" >terminos y condiciones</Link>
            </div>

            <input type="submit" value={'Registrar'} />
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
          </p>

          <div className="login-social">
            <p>O inicia sesión con</p>
            <div className="login-social-icons">
              <Link to="/login/facebook">
                <FaFacebook />
              </Link>
              <Link to="/login/google">
                <FaGoogle />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
