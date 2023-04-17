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
                    <ul className='contact-info-list'>
                        <li>
                            <div className="contact-info-icon">
                                <MdOutlinePlace />
                            </div>
                            <div className="contact-info-text">
                                <h5>Direccion</h5>
                                <p>Calle 32 No. 75-87.
                                    Celen Parque
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-info-icon">
                                <HiOutlineMail />
                            </div>
                            <div className="contact-info-text">
                                <h5>Email</h5>
                                <p>
                                    thebossbarbershopco@gmail.com
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-info-icon">
                                <AiOutlineWhatsApp />
                            </div>
                            <div className="contact-info-text">
                                <h5>Telefono</h5>
                                <p>
                                    315 494 3242
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="contact-info-icon">
                                <MdAccessTime />
                            </div>
                            <div className="contact-info-text">
                                <h5>Abierto</h5>
                                <p>
                                    Lunes - Sábado, 09 am - 7.30 pm
                                </p>
                            </div>
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
                        <p className='email'>
                            <input type="email" name="email" placeholder='ingresa@tuemail.com' />
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
