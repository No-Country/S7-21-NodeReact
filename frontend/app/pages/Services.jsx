import React from 'react'
import corte from '~/assets/images/corte/corte.jpg'

export const Services = () => {
    return (
        <div className='service_container'>
            <h1 className='title'>Nuestros servicios</h1>
            <div className="cardServices">
                <div className="cards">
                    <img
                        src={corte}
                        className='imgServices'
                        alt=''
                    />
                    <h1>CORTE DE PELO</h1>
                    <span>Descripción del servicio</span>
                    <h3>$PRECIO</h3>
                </div>
                <div className="cards">
                    <img
                        src={corte}
                        className='imgServices'
                        alt=''

                    />
                    <h1>CORTE DE BARBA</h1>
                    <span>Descripción del servicio</span>
                    <h3>$PRECIO</h3>
                </div>
                <div className="cards">
                    <img
                        src={corte}
                        className='imgServices'
                        alt=''
                    />
                    <h1>LAVADO Y PERFILADO </h1>
                    <span>Descripción del servicio</span>
                    <h3>$PRECIO</h3>
                </div>
                <div className="cards">
                    <img
                        src={corte}
                        className='imgServices'
                        alt=''
                    />
                    <h1>LAVADO Y CORTE</h1>
                    <span>Descripción del servicio</span>
                    <h3>$PRECIO</h3>
                </div>
            </div >
        </div>
    )
}