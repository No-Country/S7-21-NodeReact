import React, { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { getAllBarber } from "../store/barber/barberSlice";
import { useDispatch, useSelector } from "react-redux";

export const Stylists = () => {
    const dispatch = useDispatch();
    const barbers = useSelector((state) => state.barber.barbers);
    console.log(barbers, "barbder");

    useEffect(() => {
        dispatch(getAllBarber());
    }, []);

    const navigate = useNavigate()

    return (
        <div className="stylist-container">
            <h1 className="title">Conoce a nuestros estilistas</h1>
            <div>
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
                                onClick={() => navigate(`/Barber/${barbers.id}`)}
                            />

                            <div className="textContainer">
                                <span>Especialidad: {barbers.role}</span>
                            </div>

                            <div className="btn">Turnos</div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}