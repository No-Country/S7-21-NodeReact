import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { TbClockHour9 } from "react-icons/tb";
import Modal from "react-modal";
import Turno from "./Turno";
import { useSelector } from "react-redux";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );
  const Authuser = useSelector((state) => state.user.user);
  console.log("authuser", Authuser);
  console.log("isAuthenticated", isAuthenticated);
  const toggle = () => {
    console.log("click en togle", isOpen);
    setIsOpen(!isOpen);
  };
  const togglemodal = () => {
    setIsOpenModal(!isOpenModal);
  };

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
              <Link to="/about">SOBRE NOSOTROS</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">CONTACTO</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <div className="button-container">
                  <Link className="button" to="/">
                    LOGOUT
                  </Link>
                </div>
                <div className="button-container" >
                <div className="button" onClick={togglemodal}>TURNO</div>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="button" to="/login">
                  INGRESAR
                </Link>
              </li>
            )}

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
          <Turno closeModal={closeModal} />
        </div>
      </Modal>
    </div>

  );
}
