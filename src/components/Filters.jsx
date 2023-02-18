import '../styles/Filters.css'
import logo from '../assets/kasa-blanc.svg'

const Filters = (props) => {

    const toRef = () => {
        props.setfv(document.querySelector("#filtres").value)
    }

    return (
        <div id="filtersContainer">
            <span style={{marginRight:"auto"}}>X logements temporaires satisfont vos critères.</span>
            <label htmlFor="filtres">Filtres :</label>
            <select defaultValue="any" id="filtres" name="filtres" onChange={toRef}>
                <option value="any">tous</option>
                <option value="paris">Paris</option>
                <option value="horsparis">Hors Paris</option>
                <option value="appartement">Appartement</option>
                <option value="studio">Studio</option>
                <option value="min3stars">3 étoiles et plus</option>
                <option value="min4stars">4 étoiles et plus</option>
            </select>          
        </div>
    )
}

export default Filters