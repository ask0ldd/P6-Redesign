import '../styles/Footer.css'
import logo from '../assets/kasa-blanc.svg'

const Footer = () => {
    return (
        <footer>
            <img src={logo} alt="logo kasa"/>
            <span>© 2020 Kasa. All rights reserved</span>
        </footer>
    )
}

export default Footer