import React, {
    useEffect
    , useState
} from "react";
import { useNavigate } from "@remix-run/react";
import { getAllBarber } from "../store/barber/barberSlice";
import { useDispatch, useSelector } from "react-redux";

export const Stylists = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const barbers = useSelector((state) => state.barber.barbers);
    const loading = useSelector((state) => state.barber.loading);

    console.log(barbers)
    console.log(barbers, "barbder");

    useEffect(() => {
        dispatch(getAllBarber());
    }, []);


    return (
        <div className="stylist-container">

            {
                loading ? (
                    <div style={{ Color: "red", fontSize: "3rem", textAlign: 'center' }}>Loading...</div>
                ) : (
                    <>
                        <h1 className="title">Conoce a nuestros estilistas</h1>
                        <div className="container-grid">
                            {
                                barbers.map((barbers, index) => (
                                    <div
                                        className="cardStylist"
                                        key={index}
                                    >

                                        <div className="textContainer"><h4>{barbers.firstName}{barbers.lastName}</h4></div>
                                        <img
                                            src={barbers.profileImage}
                                            className="imgStylist"
                                            alt={barbers.firstName}
                                        />

                                        <div className="textContainer">
                                            <span>Especialidad: {barbers.role}</span>
                                        </div>

                                        <div
                                            className="btn"
                                            onClick={() => navigate(`/Barber/${barbers.id}`)}
                                        >Ver más</div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
        </div>
    )
}