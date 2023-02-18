import '../styles/Gallery.css'
import ImmoCard from './ImmoCard'
import { Link } from 'react-router-dom'
import { ErrorBox } from './ErrorBox'
import { useState } from 'react'

const Gallery = (props) => {

    const [likesList, setLikes] = useState(['c67ab8a7'])

    const addLike = (rentalId) => {
        let likesListCopy = [...likesList]
        likesListCopy.push(rentalId)
        setLikes(likesListCopy)
        console.log(likesList)
    }

    return (
    <section id="gallery">
        {
            (props.dataset && /* if datas got fetched */
                props.dataset.map((logement) => (<Link className="anchor" to={"hebergement/"+logement.id} key={logement.id}>
                    <ImmoCard addLike={addLike} likes={likesList} title={logement.title} cover={logement.cover} rentalId={logement.id}/></Link>)))
            || ((props.error && !props.loadingState) && /* !props.loadingState > don't show the error div when no real error, ie : it's only loading */
                <ErrorBox />)}
    </section>
    )
}

export default Gallery