import React from 'react'

export default function LoginForm() {
    return (<>
        <div class="login-container">
            <div class="login-left">
                <h2>¡Bienvenido a nuestra barbería!</h2>
                <p>Únete a la experiencia de un corte de cabello excepcional y siéntete como en casa en nuestro ambiente acogedor. Inicia sesión para reservar tu cita y descubrir lo que podemos hacer por ti.</p>
            </div>
            <div class="login-right">
                <h2>Inicia sesión</h2>
                <form>
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" required />

                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </div>
    </>
    )
}
