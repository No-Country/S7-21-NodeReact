import React from "react";
import { FaCircle} from "react-icons/fa"
export const Administrator = () => {
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
          <div className="table">
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
