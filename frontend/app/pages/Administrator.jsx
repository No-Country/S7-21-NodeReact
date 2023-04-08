import { useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { FaCircle} from "react-icons/fa"
import { useSelector } from "react-redux";
export const Administrator = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state)=> state.user.status === "authenticated");
  console.log("isAuthenticated", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
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
            <table>
              <tr className="tile_table">
                <th>Nombre y apellido</th>
                <th>Contacto</th>
                <th>Cortes Realizados</th>
                <th>Reservas</th>
                <th>Cancelados</th>
              </tr>
              <tr>
                <td><FaCircle className="img-table"/>Jorge Xxxxxxv</td>
                <td>952 186 137 jorge@hotmail.com</td>
                <td>#70</td>
                <td>#2</td>
                <td>#15</td>
              </tr>
              <tr>
                <td><FaCircle className="img-table" /> Jorge Xxxxxxv</td>
                <td>952 186 137 jorge@hotmail.com </td>
                <td>#70</td>
                <td>#2</td>
                <td>#15</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
