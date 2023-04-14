import { CiFacebook } from 'react-icons/ci'
import { AiOutlineInstagram } from 'react-icons/ai'

export default function Footer() {
    return (
        <div className="footer">
            <span>
                2023 - Términos y condiciones
            </span>
            <div>
                <CiFacebook />
                <AiOutlineInstagram />
            </div>
        </div>
    )
}