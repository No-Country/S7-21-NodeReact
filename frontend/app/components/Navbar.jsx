import React from "react";
import { Link } from "@remix-run/react";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">INICIO</Link>
        </li>
        <li className="nav-item">
          <Link to="/">ESTILISTA/BARBERO</Link>
        </li>
        <li className="nav-item">
          <Link to="/">SERVICIOS</Link>
        </li>
        <li className="nav-item">
          <Link to="/">SHOP</Link>
        </li>
        <li>
          <Link to="/">SOBRE NOSOTROS</Link>
        </li>
        <li className="nav-item">
          <Link to="/">CONTACTO</Link>
        </li>
        <li className="nav-item">
          <Link className="button" to="/login">INGRESAR</Link>
        </li>
        <li className="nav-item">
          <Link className="button" to="/">TURNOS</Link>
        </li>
      </ul>
    </nav>
  );
}
