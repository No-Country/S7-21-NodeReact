import { Link } from '@remix-run/react'
// import React, { useEffect } from 'react'
import hairstyle from '~/assets/images/hairstyle.png'

export default function LoginForm() {

    return (<>
        <div className="login-container">
            <div className="login-left">
                {/* <h2>¡Bienvenido a nuestra barbería!</h2>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p> */}
            </div>
            <div className="login-right">
                <h2>Inicia sesión</h2>
                <form>
                    <div className="login-image">
                        <img src={hairstyle} alt="Login" />
                    </div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" required />

                    <div className="login-forgot-password">
                        <div className="login-remember">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Recuérdame</label>
                        </div>
                        <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>¿No tienes una cuenta? <Link href="/signup">Regístrate</Link></p>

                <div className="login-social">
                    <p>O inicia sesión con</p>
                    <div className="login-social-icons">
                        <Link href="/login/facebook"><i className="fab fa-facebook-f"></i></Link>
                        <Link href="/login/google"><i className="fab fa-google"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
