import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyTurner } from "../store/turner/turnerSlice";

export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const turner = useSelector((state) => state.turner.turners)
  const [myAccount, setMyAccount] = useState(true);
  const [myTurners, setMyTurner] = useState(false);

  const showMyAccount = () => {
    setMyAccount(true);
    setMyTurner(false);
  };


  useEffect(() => {
    dispatch(historyTurner())
  }, [dispatch])


  const showMyTurner = () => {
    setMyTurner(true);
    setMyAccount(false);
  };

  return (
    <div className="profile">
      <div className="image_profile">
        <img src={user?.profileImage} className="profile_img" alt={`Imagen de perfil de ${user?.firstName}`} />
      </div>
      <div className="title">Mi Cuenta</div>
      <div className="container">
        <div className="container_to">
          <div className="button_container">
            <button onClick={showMyAccount}>MI CUENTA</button>
            <button onClick={showMyTurner}>TURNOS</button>
          </div>
          <div className={`container_profile ${myAccount ? "show" : "hidden-profile"}`}>
            <div className="title_profile">INFORMACION DE CONTACTO</div>
            <div className="nombre">Nombre: &nbsp; {user?.firstName} </div>
            <div className="apellido">Apellido: &nbsp; {user?.lastName} </div>
            <div className="correo">Correo: &nbsp; {user?.email} </div>
          </div>
          <div className={`container_turner ${myTurners ? "show" : "hidden-turner"}`}>
            <div className="title_turner">HISTORIAL DE TURNOS</div>
            <table>
              <tr className="title_table">
                <th>Referencia del pedido</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Pago</th>
                <th>Estado</th>
              </tr>
              {
                <tr>

                  <td>Corte</td>
                  <td>13/06</td>
                  <td>$170.000</td>
                  <td>Efectivo</td>
                  <td>Realizado</td>
                </tr>
              }
              <tr>
                <td>Corte</td>
                <td>13/04</td>
                <td>$170.000</td>
                <td>Efectivo</td>
                <td>Realizado</td>
              </tr>
              <tr>
                <td>Corte</td>
                <td>13/04</td>
                <td>$170.000</td>
                <td>Efectivo</td>
                <td>Realizado</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};