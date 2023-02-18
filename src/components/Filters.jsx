import '../styles/Filters.css'
import logo from '../assets/kasa-blanc.svg'

const Filters = () => {
    return (
        <div id="filtersContainer">
            <span style={{marginRight:"auto"}}>X logements temporaires satisfont vos critères.</span>
            <label for="filtres">Filtres :</label>
            <select id="filtres" name="filtres">
                <option value="any">tous</option>
                <option value="paris">Paris</option>
                <option value="horsparis">Hors Paris</option>
                <option value="appartement">Appartement</option>
                <option value="studio" selected>Studio</option>
                <option value="min3stars" selected>3 étoiles et plus</option>
                <option value="min4stars" selected>4 étoiles et plus</option>
            </select>          
        </div>
    )
}

export default Filters