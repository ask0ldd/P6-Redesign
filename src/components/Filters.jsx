import '../styles/Filters.css'
import logo from '../assets/kasa-blanc.svg'

const Filters = (props) => {

    const toRef = () => {
        const [filterType, filterValue] = document.querySelector("#filtres").value.split(":")
        props.setfv([filterType, filterValue])
    }

    return (
        <div id="filtersContainer">
            <span style={{marginRight:"auto"}}>X logements temporaires satisfont vos critères.</span>
            <label htmlFor="filtres">Filtres :</label>
            <select defaultValue="any:any" id="filtres" name="filtres" onChange={toRef}>
                <option value="any:any">tous</option>
                <option value="location:Paris">Paris</option>
                <option value="location:Horsparis">Hors Paris</option>
                <option value="tags:Appartement">Appartement</option>
                <option value="tags:Studio">Studio</option>
                <option value="rating:3">3 étoiles et plus</option>
                <option value="rating:4">4 étoiles et plus</option>
            </select>          
        </div>
    )
}

export default Filters