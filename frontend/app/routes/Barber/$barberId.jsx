import { useNavigate, useParams } from "@remix-run/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Modal from "react-modal";
import Turno from "../../components/Turno";

export default function SingleBarber() {

    const navigate = useNavigate()
    const [barber, setBarber] = useState({})
    const [loading, setLoadig] = useState(true)
    const isAuthenticated = useSelector((state) => state.user.status === "authenticated");
    const [isOpenModal, setIsOpenModal] = useState(false);


    const { barberId } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/all/barber')
            .then(async (data) => {
                const Arr = await (data.data.body.rows)
                const singleBarber = await Arr.find(Arr => Arr.id == barberId)
                setLoadig(false)
                setBarber(await (singleBarber))
                console.log(singleBarber)
            })
            .catch((error) => console.log(error))
    }, [])

    const togglemodal = () => {
        setIsOpenModal(!isOpenModal);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const handleTurno = () => {
        if (!isAuthenticated) {
            navigate('/login')
        }
        else {
            togglemodal()
        }
    }

    return (
        <>
            {
                loading ? (
                    <div style={{ Color: "red", fontSize: "3rem", textAlign: 'center' }}>Loading...</div>
                ) : (
                    <>
                        <h2>{barber?.firstName} {barber?.lastName}</h2>
                        <div className="content-barber">
                            <div className="img-barber">
                                <img src={barber?.profileImage} alt={barber?.firstName} />
                            </div>

                            <div className="content-barber-info">
                                <h3>{barber?.firstName}</h3>
                                <p className="desdriction-barber">
                                    Descripcion de su especialidad:
                                </p>
                                <p className="desdriction-barber-description">
                                    {barber.description}
                                </p>
                            </div>
                            <button onClick={handleTurno}>Turno</button>
                        </div>
                        <Modal
                            isOpen={isOpenModal}
                            onRequestClose={closeModal}
                            contentLabel="Turno"
                            className="modal"
                        >
                            <div className="modal-content">
                                <Turno closeModal={closeModal} />
                            </div>
                        </Modal>
                    </>

                )

            }


            {/* 
            <div className="clientes-title">
                <h2>Sus clientes</h2>
            </div>

            <div className="clients">
            
            {
                    singleBarber.customers.map((item, id) => (
                        <img
                            src={item?.picture}
                            key={id}
                            alt={item?.name}
                        />
                        ))
                    }
                    
                </div> */}

        </>
    )
}
