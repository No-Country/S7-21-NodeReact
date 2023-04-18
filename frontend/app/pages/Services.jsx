import axios from 'axios'
import React, { useState, useEffect } from 'react'
import corte from '~/assets/images/corte/corte.jpg'

export const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/servicesbarber`)
            .then(response => {
                setServices(response.data.body);
                console.log(response.data.body)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='service_container'>
            <h1 className='title'>Nuestros servicios</h1>
            <div className="cardServices" >
                {
                    services.map((data) => (
                        <div className="cards" key={data.id}>
                            <img
                                src={corte}
                                className='imgServices'
                                alt={data.name}
                            />
                            <h1>{data.name}</h1>
                            <h3>${data.cost}</h3>
                        </div>
                    ))
                }
            </div >
        </div>
    )
}