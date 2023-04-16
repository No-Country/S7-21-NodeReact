import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarber } from "../store/barber/barberSlice";
import Calendar from "react-datepicker";
import { MdFilterAlt} from "react-icons/md"

export const Administrator = () => {
  const [barberi, setBarberi] = useState();
  const [isLoading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myBarbers, setMyBarbers] = useState(true);
  const [myTurners, setMyTurners] = useState(false);
  const [myClients, setMyClients] = useState(false);
  const loading = useSelector((state) => state.barber.loading);
  const barber = useSelector((state) => state.barber.barbers);
  const handleShowBarbers = () => {
    setMyBarbers(true);
    setMyClients(false);
    setMyTurners(false);
  };
  const handleShowTurners = () => {
    setMyTurners(true);
    setMyBarbers(false);
    setMyClients(false);
  };
  const handleShowClients = () => {
    setMyClients(true);
    setMyTurners(false);
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
                <button onClick={handleShowBarbers}>PAGOS</button>
                <button>CALENDARIOS</button>
                <button onClick={handleShowTurners}>TURNOS</button>
                <button onClick={handleShowClients}>CLIENTES</button>
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
                        <tr key={barber.id}>
                          <td>
                            <div className="barber_name">
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
                <div className="calendar">
                  <Calendar
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    inline
                  />
                </div>
                <div className="list_turner">
                  <div className="title_list">
                    <div>{startDate?.toDateString()}</div>
                  </div>
                  <div className="filter">
                    <div className="select_barber">
                      <MdFilterAlt className="select-icon select-icon-left" />
                      {loading ? (
                      <div style={{ Color: "red", fontSize: "2rem" }}>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
