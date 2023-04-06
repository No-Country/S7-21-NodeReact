import { useParams } from "@remix-run/react"

export default function SingleBarber() {

    const { barberId } = useParams()

    return (
        <>
            <h2>{barberId}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora est fugit ipsum doloribus in asperiores, consequatur odio, beatae nobis amet maxime, exercitationem nihil architecto similique fuga minus? Reiciendis, vero deleniti?</p>
        </>
    )
}