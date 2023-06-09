
import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { TbClockHour9 } from "react-icons/tb";
import Modal from "react-modal";
import Turno from "./Turno";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../store/store";
import { onLogout } from '../store/auth/authSlice'
import logo from "../assets/images/logo.svg";
import { BurguerButton } from "./BurguerButton";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [burguer, setBurger] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );

  const Authuser = useSelector((state) => state.user.user);
  console.log("authuser", Authuser);
  console.log("isAuthenticated", isAuthenticated);

  const toggle = () => {
    console.log("click en togle", isOpen);

    if (window.innerWidth < 900) {
      setIsOpen(!isOpen);
    }
  };
  const token = useSelector((state)=> state.user.token)
  let decodedToken = null;

if (isAuthenticated) {
  decodedToken = jwt_decode(token);
}
  console.log(decodedToken?.role, "decode")
  const togglemodal = () => {
    setIsOpenModal(!isOpenModal);
    toggle()
  };


  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen)
  }


  const handleLogout = () => {
    dispatch(onLogout());
    persistor.purge(['persistor:root']);
  }

  return (
    <div className="content-nav-and-head">
      <header>
        <div className="header">
          <div className="left">
            <TbClockHour9 />
            <span>Abierto: Lunes - Sabado, 09 am - 7:30 pm</span>
          </div>
          <div className="right">
            <a href="https://wa.me/573154943242" target="_blank" rel="noreferrer">
              <div>
                <FaWhatsapp />
                Whatsapp
              </div>
            </a>
            <a href="mailto:thebossbarbershopco@gmail.com">
              <div>
                <HiOutlineMail />
                thebossbarbershopco@gmail.com
              </div>
            </a>
          </div>
        </div>
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hamburger" onClick={toggle}>
            <BurguerButton isOpen={isOpen} handleClick={handleClick} />
          </div>
          <div className={`initial ${isOpen ? "active" : ""}`}></div>

          <ul className={`nav-links ${isOpen ? "show-nav" : "navbar-hidden"}`}>
            <li className="nav-item">
              <Link
                to="/"
                onClick={toggle}
              >INICIO
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Barber/stylists"
                onClick={toggle}
              >
                ESTILISTA/BARBERO
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                onClick={toggle}
              >
                SERVICIOS
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/administrator">SHOP</Link>
            </li> */}
            <li>
              <Link
                to="/about"
                onClick={toggle}
              >
                SOBRE NOSOTROS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                onClick={toggle}
              >
                CONTACTO
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <div className="button-container">
                  <Link
                    className="button"
                    to="/"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </Link>
                </div>
                <div className="button-container" >
                  <div className="button" onClick={togglemodal}>TURNO</div>
                </div>
                <div className="button-container">
                  <Link className="button" to={"/profile"}>
                    {Authuser?.firstName}
                  </Link>
                </div>
                {decodedToken.role === "admin" ?(
                <div className="button-container">
                  <Link className="button" to={"/administrator"}>
                  Dashboard
                  </Link>
                </div>
                ): null}
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="button"
                  to="/login"
                  onClick={toggle}
                >
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
