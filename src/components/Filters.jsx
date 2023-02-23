import '../styles/Filters.css'

const Filters = (props) => {

    const toRef = () => { // when a new option is selected : modify the filterValue parent state
        const [filterType, filterValue] = document.querySelector("#filtres").value.split(":")
        props.setFv([filterType, filterValue]) 
    }

    return (
        <div id="filtersContainer">
            <span style={{marginRight:"auto"}}>{(props.nResults) && props.nResults} logements temporaires satisfont vos critères.</span>
            <label htmlFor="filtres">Filtres :</label>
            <select data-testid="select" defaultValue="any:any" id="filtres" name="filtres" onChange={toRef}>
                <option value="any:any">Tous</option>
                <option value="location:Paris">Paris</option>
                <option value="location:HorsParis">Hors Paris</option>
                <option value="tags:Appartement">Appartement</option>
                <option value="tags:Studio">Studio</option>
                <option value="rating:3">3 étoiles & plus</option>
                <option value="rating:4">4 étoiles & plus</option>
            </select>          
        </div>
    )
}

export default Filters