import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllBarber } from "../store/barber/barberSlice";

export const Administrator = () => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                <button>PAGOS</button>
                <button>CALENDARIOS</button>
                <button>TURNOS</button>
                <button>CLIENTES</button>
              </div>
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
          </div>
        </div>
      )}
    </div>
  );
};
