import { Link, useNavigate } from "@remix-run/react";
// import { FaGoogle, FaFacebook } from "react-icons/fa";
import hairstyle from "~/assets/images/hairstyle.png";
import { useDispatch } from "react-redux";
import { registeruser } from "../store/auth/authSlice";
import { useState } from "react";
import ShowToast from "./ShowToast";

export default function LoginForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [samePassword, setSamePassword] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const styles = {
    border: "3px solid red",
    backgroundColor: "pink",
  };

  const dispacth = useDispatch();
  const navigate = useNavigate();


  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == "check-password") {
      setSamePassword(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const checkboxChange = (e) => {
    const { checked } = e.target;
    setAcceptTerms(checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }
    if (user.password !== samePassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    let response = await dispacth(registeruser(user))

    let status = response?.code === 201 ? true : false
    ShowToast(status, status ? response?.body : response?.message, () => { });

    response.code === 201
      ? navigate("/login")
      : console.log(response, "response");
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
          <form onSubmit={handleRegister}>
            <div className="login-image">
              <img src={hairstyle} alt="Login" />
            </div>
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handlechange}
              value={user.firstName}
              required
            />
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handlechange}
              value={user.lastName}
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

            <label htmlFor="phone">Teléfono</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              onChange={handlechange}
              value={user.phone}
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

            <label htmlFor="check-password">Repetir contraseña</label>
            <input
              type="password"
              style={samePassword !== user.password ? styles : {}}
              id="check-password"
              name="check-password"
              onChange={handlechange}
              value={samePassword}
              required
            />

            <div className="terms">
              <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={acceptTerms} onChange={checkboxChange} required />
              <label htmlFor="acceptTerms">&nbsp;Acepto los&nbsp;</label> <Link to="#" >terminos y condiciones</Link>
            </div>

            <button type="submit">Registrar</button>
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
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
