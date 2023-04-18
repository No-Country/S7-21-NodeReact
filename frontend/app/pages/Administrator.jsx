import { Link, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TurnersBarber, getAllBarber } from "../store/barber/barberSlice";
import Calendar from "react-datepicker";
import { MdFilterAlt } from "react-icons/md";

export const Administrator = () => {
  const [barberi, setBarberi] = useState();
  const [isLoading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myBarbers, setMyBarbers] = useState(true);
  const [myTurners, setMyTurners] = useState(false);
  const loading = useSelector((state) => state.barber.loading);
  const getTurnerFree = useSelector((state) => state.barber.freeTurner);
  const getTurnerFill = useSelector((state) => state.barber.barber);

  const handleShowBarbers = () => {
    setMyBarbers(true);
    setMyTurners(false);
  };
  const handleShowTurners = () => {
    setMyTurners(true);
    setMyBarbers(false);
  };

  const isAuthenticated = useSelector(
    (state) => state.user.status === "authenticated"
  );
  const barbers = useSelector((state) => state.barber.barbers);
  console.log(barbers, "barber");
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    setLoading(false);
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(getAllBarber());
  }, [dispatch]);
  useEffect(() => {
    if (barberi) {
      dispatch(TurnersBarber(barberi, startDate));
    }
  }, [dispatch, barberi, startDate]);
  const formatTime = (decimalTime) => {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}`;
  };
  const formattedTurners = getTurnerFree.map((turner) => formatTime(turner));
  const allTurns = [
    ...formattedTurners.map((hora) => ({ hora, libre: true })),
    ...getTurnerFill.map((turno) => ({
      hora: turno.appointmentHour,
      nombre: turno.clientId,
    })),
  ];

  allTurns.sort((a, b) => (a.hora > b.hora ? 1 : b.hora > a.hora ? -1 : 0));
  return (
    <div>
      {isLoading ? (
        <div>Loading ..</div>
      ) : (
        <div>
          <div className="title">Administrador</div>
          <div className="container">
            <div className="container_administration">
              <div className="buton_administration">
                <button onClick={handleShowBarbers}>Barberos</button>
                <button onClick={handleShowTurners}>TURNOS</button>
                {/* <button onClick={handleShowClients}>CLIENTES</button> */}
              </div>
              <div
                className={`container_barber ${
                  myBarbers ? "show" : "hidden_barbers"
                }`}
              >
                <div className="table table-responsive">
                  {barbers.length === 0 ? (
                    <div>Cargando...</div>
                  ) : (
                    <table>
                      <tr className="tile_table">
                        <th>Nombre y apellido</th>
                        <th>Contacto</th>
                        <th>Cortes Realizados</th>
                        <th>Reservas</th>
                        <th>Cancelados</th>
                      </tr>
                      {barbers.map((barber) => (
                        <tr key={barber.id} >
                          <td>
                            <div className="barber-name" onClick={() => navigate(`/pago/${barber.id}`)}>
                              <FaCircle className="img-table" />
                              {barber.firstName}
                            </div>
                          </td>
                          <td>{barber.phone}</td>
                          <td>{barber.cuts}</td>
                          <td>{barber.reservations}</td>
                          <td>{barber.cancellations}</td>
                        </tr>
                      ))}
                    </table>
                  )}
                </div>
              </div>
              <div
                className={`container_turners ${
                  myTurners ? "show" : "hidden_turners"
                }`}
              >
                <div className="container_title_and_filter">
                  <div className="title_list">
                    <div>{startDate?.toDateString()}</div>
                  </div>
                  <div className="filter">
                    <div className="select_barber">
                      <MdFilterAlt className="select-icon select-icon-left" />
                      {loading ? (
                        <div style={{ color: "red", fontSize: "2rem" }}>
                          Loading...
                        </div>
                      ) : (
                        <select
                          className="style_select"
                          id="barbero"
                          name="barbero"
                          value={barberi}
                          onChange={(e) => setBarberi(e.target.value)}
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
                </div>
                <div class="container_calendar_and_client">
                  <div className="calendar">
                    <Calendar
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      inline
                    />
                  </div>
                  <div className="turners">
                    <ul>
                      {allTurns.map((turno) => (
                        <div className="turno" key={turno.appointmentHour}>
                          <div className="hora">{turno.hora}</div>
                          {turno.libre ? (
                            <div className="nombre">Libre</div>
                          ) : (
                            <div className="nombre">{turno.nombre}</div>
                          )}
                          {turno.libre ? null : turno.clientId ? (
                            <div className="info">Hola</div>
                          ) : (
                            null
                    /*         <div className="container_button">
                              <button className="option_button">Modificar</button>
                              <button className="option_button">Rechazar</button>
                            </div> */
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
