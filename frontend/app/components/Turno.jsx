import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import { ImScissors } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarber } from "../store/barber/barberSlice";
import { createturne } from "../store/turner/turnerSlice";
import ShowToast from "./ShowToast";
const CustomDatePickerInput = ({ value, onClick }) => (
  <div className="custom-input" onClick={onClick}>
    <div className="icon-container">
      <FaCalendar className="icon react-datepicker__close-icon" />
    </div>
    <input type="text" value={value} readOnly />
  </div>
);
export default function Turno({ closeModal }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.barber.loading);
  const barbers = useSelector((state) => state.barber.barbers);
  console.log(barbers, "barbder");
  const [barber, setBarber] = useState();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    service: "",
    hour: "",
    date: new Date(),
  });
  console.log(form.date)
  const handleChangeForm = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      form.name !== "" &&
      form.lastname !== "" &&
      form.email !== "" &&
      form.phone !== "" &&
      form.message !== "" &&
      form.service !== "" &&
      form.hour !== "" &&
      form.date !== ""
    ) {
      console.log("tiene datos");
      const response = await dispatch(createturne(form, barber));
      if (!response) return;
      console.log(response, "trajo de response")
      alert("Se creo el turno")
      closeModal()
      // ShowToast(true, "turno creado", closeModal)
    }
  };
  useEffect(() => {
    dispatch(getAllBarber());
  }, [dispatch]);
  const handleClickOutside = (event) => {
    if (event.target.classList.contains("content-turno")) {
      closeModal();
    }
  };

  return (
    <div className="content-turno" onClick={handleClickOutside}>
      <form onSubmit={handlesubmit}>
        <div className="content-form">
          <div class="content-input">
            <div class="input-container">
              <FaUserAlt className="iconofinput" />
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                value={form.name}
                onChange={handleChangeForm}
              />
            </div>
            <div class="input-container">
              <FaUserAlt className="iconofinput" />
              <input
                type="text"
                placeholder="Apellido"
                name="lastname"
                value={form.lastname}
                onChange={handleChangeForm}
              />
            </div>
            <div class="input-container">
              <FaEnvelope className="iconofinput" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChangeForm}
              />
            </div>
            <div class="input-container">
              <FaPhoneAlt className="iconofinput" />
              <input
                type="text"
                placeholder="Telefono"
                name="phone"
                value={form.phone}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="content-select">
            <div className="select-cont">
              <ImScissors className="select-icon select-icon-left" />
              <select
                className="style_select"
                id="service"
                name="service"
                value={form.service}
                onChange={handleChangeForm}
              >
                <option value="Corte_pelo">CORTE PELO</option>
                <option value="Corte_barba">CORTE BARBA</option>
                <option value="Corte_pelo_barba">CORTE PELO Y BARBA</option>
                <option value="Lavado_Corte">LAVADO Y CORTE</option>
                <option value="Lavado_Perfilado">LAVADO Y PERFILADO</option>
              </select>
            </div>

            <div className="select-cont">
              <ImScissors className="select-icon select-icon-left" />
              {loading ? (
                <div style={{ Color: "red", fontSize: "2rem" }}>Loading...</div>
              ) : (
                <select
                  className="style_select"
                  id="barbero"
                  name="barbero"
                  value={barber}
                  onChange={(e) => setBarber(e.target.value)}
                >
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.id}>
                      {barber.firstName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="content-date">
            <DatePicker
              selected={form.date}
              onChange={handleChangeForm}
              name="date"
              customInput={<CustomDatePickerInput />}
            />
            <div className="select-cont">
              <FaClock className="select-icon select-icon-left" />
              <select
                className="style_select"
                id="hour"
                name="hour"
                value={form.hour}
                onChange={handleChangeForm}
              >
                <option value="9:00">9:00</option>
                <option value="9:30">9:00</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:00</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
              </select>
            </div>
          </div>
          <div className="content-message">
            <textarea
              placeholder="Mensage"
              name="message"
              id="message"
              value={form.message}
              onChange={handleChangeForm}
            />
          </div>
          <div className="content-button">
            <button type="submit">Turno</button>
          </div>
        </div>
      </form>
    </div>
  );
}
