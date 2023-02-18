import '../styles/Gallery.css'
import ImmoCard from './ImmoCard'
import { Link } from 'react-router-dom'
import { ErrorBox } from './ErrorBox'
import { useState } from 'react'

const Gallery = (props) => {

    const [likes, setLikes] = useState([])

    const addLike = (rentalId) => {
        setLikes([...likes].push(rentalId))
    }

    return (
    <section id="gallery">
        {
            (props.dataset && /* if datas got fetched */
                props.dataset.map((logement) => (<Link className="anchor" to={"hebergement/"+logement.id} key={logement.id}>
                    <ImmoCard addLike={addLike} liked="false" title={logement.title} cover={logement.cover} rentalId={logement.id}/></Link>)))
            || ((props.error && !props.loadingState) && /* !props.loadingState > don't show the error div when no real error, ie : it's only loading */
                <ErrorBox />)}
    </section>
    )
}

export default Gallery