import '../styles/Header.css'
import logo from '../assets/kasa.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
    <header>
        <NavLink to="/"><img src={logo} alt="logo kasa"/></NavLink>
        <nav>
            <ul>
                <li><NavLink to="/" className={({isActive}) => isActive ? "active-link" : undefined }>Accueil</NavLink></li> {/* */}
                <li><NavLink to="/apropos" className={({isActive}) => isActive ? "active-link" : undefined }>A Propos</NavLink></li>
            </ul>
        </nav>
    </header>
    )
}

export default Header