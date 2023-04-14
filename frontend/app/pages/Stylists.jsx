import React from "react";
import stylists from '../assets/stylists.json'
import Stylist from '../components/Stylist'
import { Link, useNavigate } from "@remix-run/react";

export const Stylists = () => {

    const navigate = useNavigate()
    
    return (
        <div className="stylist-container">
            <h1 className="title">Conoce a nuestros estilistas</h1>
            <div>
                {
                    stylists.map((stylist, index) => (
                        <div
                            className="cardStylist"
                            key={index}
                        >

                            <div className="textContainer"><h4>{stylist.name}</h4></div>                            
                                <img
                                    src={stylist.picture}
                                    className="imgStylist"
                                    alt={stylist.name}
                                    onClick={()=> navigate(`/Barber/${stylist.id}`)}
                                />                            

                            <div className="textContainer">
                                <span>Descripción de su especialidad</span>
                                <p>Haz una pregunta</p>
                            </div>

                            <div className="btn">Turnos</div>                            

                        </div>
                    ))
                }
            </div>
        </div>
    )
}