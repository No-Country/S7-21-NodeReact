import React, { useState } from "react";
import { Link } from "@remix-run/react";
import { HiOutlineMail, } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { TbClockHour9 } from "react-icons/tb"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    console.log("click en togle", isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="header">
        <div className="left"><TbClockHour9 />Abierto: Lunes - Sabado, 09 am - 7:30 pm</div>
        <div className="right">
          <div><FaWhatsapp />Whatsapp</div>
          <div><HiOutlineMail />thebossbarbershopco@gmail.com</div>
        </div>
      </div>
      <nav className="navbar">
        <div className="logo">LOGO</div>

        <div className="hamburger" onClick={toggle}>
          <div />
          <div />
          <div />
        </div>

        <ul className={`nav-links ${isOpen ? "show-nav" : "navbar-hidden"}`}>
          <li className="nav-item">
            <Link to="/">INICIO</Link>
          </li>
          <li className="nav-item">
            <Link to="/Barber/stylists">ESTILISTA/BARBERO</Link>
          </li>
          <li className="nav-item">
            <Link to="/services">SERVICIOS</Link>
          </li>
          <li className="nav-item">
            <Link to="/">SHOP</Link>
          </li>
          <li>
            <Link to="/">SOBRE NOSOTROS</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">CONTACTO</Link>
          </li>
          <li className="nav-item">
            <Link className="button" to="/login">
              INGRESAR
            </Link>
          </li>
          <li className="nav-item">
            <Link className="button" to="/">
              TURNOS
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
