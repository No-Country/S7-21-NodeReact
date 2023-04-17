import { useParams } from "@remix-run/react";
import { Pagos } from "../../pages/Pagos";

export default function UserPay(){
    const { userId } = useParams()
    console.log(userId)
    return (
<>
<Pagos id={userId}/>
</>
    )
}