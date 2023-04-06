import React from 'react'
import video from '../assets/images/mixkit-barber.mp4'

export const Home = () => {
    return (
        <div className='home'>
            <video id="background-video" preload='true' autoPlay loop muted >
                <source src={video} type="video/mp4" />
            </video>
            <div className="home-content">
                <h1>¡Bienvenido a nuestra barbería!</h1>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p>

                <div className="home-buttons">
                    <button className="home-button">Iniciar sesión</button>
                    <button className="home-button">Regístrate</button>

                </div>
            </div>
        </div>
    )
}
