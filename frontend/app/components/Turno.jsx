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
import { TurnersBarber, getAllBarber } from "../store/barber/barberSlice";
import { createturne } from "../store/turner/turnerSlice";
import ShowToast from "./ShowToast";
import { getAllServices } from "../store/service/serviceSlice";
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
  const { loadingService, services, errorMessage } = useSelector(
    (state) => state.service
  );
  const freeturner = useSelector((state) => state.barber.freeTurner);
  console.log(barbers, "barbder");
  console.log(freeturner, "turnos libres");
  const [barber, setBarber] = useState();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
    servicesId: "",
    hour: "",
    date: new Date(),
  });
  console.log(form.date);
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      form.message !== "" &&
      form.servicesId !== "" &&
      form.hour !== "" &&
      form.date !== ""
    ) {
      console.log("tiene datos");
      const response = await dispatch(createturne(form, barber));
      if (!response) return;
      console.log(response, "trajo de response");
      ShowToast(true, "turno creado", closeModal);
    }
  };
  useEffect(() => {
    dispatch(getAllBarber());
    dispatch(getAllServices());
  }, [dispatch]);
  useEffect(() => {
    if (barber) {
      dispatch(TurnersBarber(barber));
    }
  }, [dispatch, barber]);
  const handleClickOutside = (event) => {
    if (event.target.classList.contains("content-turno")) {
      closeModal();
    }
  };

  return (
    <div className="content-turno" onClick={handleClickOutside}>
      <form onSubmit={handlesubmit}>
        <div className="content-form">
          <div className="content-select">
            <div className="select-cont">
              {loadingService ? (
                <div style={{ color: "red", fontSize: "4rem" }}>Loading</div>
              ) : (
                <div>
                  <ImScissors className="select-icon select-icon-left" />
                  <select
                    className="style_select"
                    id="servicesId"
                    name="servicesId"
                    value={form.servicesId}
                    onChange={handleChangeForm}
                  >
                    {services.map((service)=> (
                      <option key={service.id} value={service.id}>
                      {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="select-cont">
              <ImScissors className="select-icon select-icon-left" />
              {loading ? (
                <div style={{ Color: "red", fontSize: "4rem" }}>Loading...</div>
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
