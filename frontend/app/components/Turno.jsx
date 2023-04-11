import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import { ImScissors } from "react-icons/im";
const CustomDatePickerInput = ({ value, onClick }) => (
  <div className="custom-input" onClick={onClick}>
    <div className="icon-container">
      <FaCalendar className="icon react-datepicker__close-icon" />
    </div>
    <input type="text" value={value} readOnly />
  </div>
);
export default function Turno({closeModal}) {
  const [startDate, setStartDate] = useState(new Date());
  const handleClickOutside = (event) => {
    if (event.target.classList.contains("content-turno")) {
      closeModal();
    }
  };

  return (
    <div className="content-turno" onClick={handleClickOutside}>
      <div className="content-form">
        <div class="content-input">
          <div class="input-container">
            <FaUserAlt className="iconofinput" />
            <input type="text" placeholder="Nombre" />
          </div>
          <div class="input-container">
            <FaUserAlt className="iconofinput" />
            <input type="text" placeholder="Apellido" />
          </div>
          <div class="input-container">
            <FaEnvelope className="iconofinput" />
            <input type="text" placeholder="Email" />
          </div>
          <div class="input-container">
            <FaPhoneAlt className="iconofinput" />
            <input type="text" placeholder="Telefono" />
          </div>
        </div>
        <div className="content-select">
          <div className="select-cont">
            <ImScissors className="select-icon select-icon-left" />
            <select className="style_select" id="servicio" name="servicio">
              <option value="Corte_pelo">CORTE PELO</option>
              <option value="Corte_pelo">CORTE BARBA</option>
              <option value="Corte_pelo">CORTE PELO Y BARBA</option>
              <option value="Corte_pelo">LAVADO Y CORTE</option>
              <option value="Corte_pelo">LAVADO Y PERFILADO</option>
            </select>
          </div>

          <div className="select-cont">
            <ImScissors className="select-icon select-icon-left" />
            <select className="style_select" id="servicio" name="servicio">
              <option value="Corte_pelo">CORTE PELO</option>
              <option value="Corte_pelo">CORTE BARBA</option>
              <option value="Corte_pelo">CORTE PELO Y BARBA</option>
              <option value="Corte_pelo">LAVADO Y CORTE</option>
              <option value="Corte_pelo">LAVADO Y PERFILADO</option>
            </select>
          </div>
        </div>
        <div className="content-date">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDatePickerInput />}
          />
          <div className="select-cont">
            <FaClock className="select-icon select-icon-left" />
            <select className="style_select" id="hora" name="hora">
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
          <textarea placeholder="Mensage" />
        </div>
        <div className="content-button">
          <button>Turno</button>
        </div>
      </div>
    </div>
  );
}
