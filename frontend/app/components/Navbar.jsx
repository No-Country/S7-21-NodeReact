import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">LOGO</div>

        <ul className="nav-links">
          <li className="nav-item">
            <a href="#">INICIO</a>
          </li>
          <li className="nav-item">
            <a href="#">ESTILISTA/BARBERO</a>
          </li>
          <li className="nav-item">
            <a href="#">SERVICIOS</a>
          </li>
          <li className="nav-item">
            <a href="#">SHOP</a>
          </li>
          <li>
            <a href="#">SOBRE NOSOTROS</a>
          </li>
          <li className="nav-item">
            <a href="#">CONTACTO</a>
          </li>
          <li className="nav-item">
            <a class="button" href="#">
              INGRESAR
            </a>
          </li>
          <li className="nav-item">
            <a class="button" href="#">
              TURNOS
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
