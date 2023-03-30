import React from 'react'
import { MdOutlinePlace, MdAccessTime } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineWhatsApp } from 'react-icons/ai'

export const Contact = () => {

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="content">
            <div className="contact-wrapper animated bounceInUp">
                <div className="contact-info">
                    <h4>Informacion de contacto</h4>
                    <ul>
                        <li>
                            <i className="contact-info-icon">
                                <MdOutlinePlace />
                            </i>
                            Direccion
                            <p>Calle 32 No. 75-87.
                                Celen Parque
                            </p>
                        </li>
                        <li>
                            <i className="contact-info-icon">
                                <HiOutlineMail />
                            </i>
                            Correo
                            <p>
                                thebossbarbershopco@gmail.com
                            </p>
                        </li>
                        <li>
                            <i className="contact-info-icon">
                                <AiOutlineWhatsApp />
                            </i>
                            Telefono
                            <p>
                                315 494 3242
                            </p>
                        </li>
                        <li>
                            <i className="contact-info-icon">
                                <MdAccessTime />
                            </i>
                            Abierto
                            <p>
                                Lunes - Sábado, 09 am - 7.30 pm
                            </p>
                        </li>
                    </ul>

                </div>
                <div className="contact-form">
                    <h3>Formulario De Contacto</h3>
                    <form onSubmit={onSubmit}>
                        <p className='input-name'>
                            <input type="text" name="name" placeholder='Nombre y Apellido' />
                        </p>
                        <p className='tel'>
                            <input type="tel" name="tel" placeholder='+54 9' />
                        </p>
                        <p>
                            <input className='email' type="email" name="email" placeholder='ingresa@tuemail.com' />
                        </p>
                        <p className="block">
                            <textarea name="message" rows="3" placeholder='Escriba tus comentarios aqui'></textarea>
                        </p>
                        <button className='btn'>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}
