import React, { useState } from "react";
import { Link } from "@remix-run/react";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { TbClockHour9 } from "react-icons/tb";
import Modal from "react-modal";
import Turno from "./Turno";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggle = () => {
    console.log("click en togle", isOpen);
    setIsOpen(!isOpen);
  };
  const togglemodal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div className="content-nav-and-head">
 <header>
      <div className="header">
        <div className="left">
          <TbClockHour9 />
          Abierto: Lunes - Sabado, 09 am - 7:30 pm
        </div>
        <div className="right">
          <div>
            <FaWhatsapp />
            Whatsapp
          </div>
          <div>
            <HiOutlineMail />
            thebossbarbershopco@gmail.com
          </div>
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
            <Link to="/administrator">SHOP</Link>
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
          <li className="nav-item custom-style" onClick={togglemodal}>
            <div className="buton">TURNO</div>
          </li>
        </ul>
      </nav>
    </header>
    <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        contentLabel="Turno"
        className="modal"
        
      >
        <div className="modal-content">
        <Turno closeModal={closeModal}/>
        </div>
       
      </Modal>
    </div>
   
  );
}
