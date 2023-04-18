import React from 'react'
import video from '../assets/images/mixkit-barber.mp4'
import { useSelector } from 'react-redux'
import { Link } from '@remix-run/react'

export const Home = () => {
 
    const status = useSelector(state => state.user.status)
    const isAuthenticated = status === 'authenticated'
    console.log( window.ENV.REMIX_APP_API_UR)
    return (
        <div className='home'>
            <video id="background-video" preload='true' autoPlay loop muted >
                <source src={video} type="video/mp4" />
            </video>
            <div className="home-content">
                <h1>¡Bienvenido a nuestra barbería!</h1>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p>

                {!isAuthenticated && (<div className="home-buttons">
                    <Link to="/login" className="home-button">Iniciar sesión</Link>
                    <Link to="/register" className="home-button">Regístrate</Link>
                </div>)}
            </div>
        </div>
    )
}
