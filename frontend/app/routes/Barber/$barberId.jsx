import { useParams } from "@remix-run/react"
import stylists from '../../assets/stylists.json'

export default function SingleBarber() {

    const { barberId } = useParams()

    const singleBarber = stylists.find(stylists => stylists.id == barberId)
    console.log(singleBarber)


    return (
        <>
            <h2>{singleBarber.name}</h2>
            <div className="content-barber">
                <div className="img-barber">
                    <img src={singleBarber.picture} alt={singleBarber.name} />
                    <button className="btn-barber">Turnos</button>
                </div>

                <div className="content-barber-info">
                    <h3>{singleBarber.name}</h3>
                    <p className="desdriction-barber">
                        Descripcion de su especialidad:
                    </p>
                    <p className="desdriction-barber-description">
                        {singleBarber.description}
                    </p>
                </div>

            </div>

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

            </div>

        </>
    )
}