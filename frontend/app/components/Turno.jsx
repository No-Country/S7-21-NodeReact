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
                <></>
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
                {freeturner?.map((hour) => (
    <option key={hour} value={`${Math.floor(hour)}:${((hour % 1) * 60).toFixed(0).padStart(2, '0')}`}>
      {`${Math.floor(hour)}:${((hour % 1) * 60).toFixed(0).padStart(2, '0')}`}
    </option>
  ))}
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
