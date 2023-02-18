import '../styles/Gallery.css'
import ImmoCard from './ImmoCard'
import { Link } from 'react-router-dom'
import { ErrorBox } from './ErrorBox'
import { useState } from 'react'

const Gallery = (props) => {

    const [likesList, setLikes] = useState([])

    if((likesList.length === 0) && (window.localStorage.getItem('likes') !== null)) setLikes(JSON.parse(window.localStorage.getItem('likes')))

    const addLike = (rentalId) => {
        let likesListCopy = [...likesList]
        likesListCopy.push(rentalId)
        setLikes(likesListCopy)
        window.localStorage.setItem('likes', JSON.stringify(likesListCopy))
    }

    const removeLike = (rentalId) => {
        let likesListCopy = [...likesList]
        likesListCopy.splice(likesListCopy.indexOf(rentalId), 1)
        setLikes(likesListCopy)
        window.localStorage.setItem('likes', JSON.stringify(likesListCopy))
    }

    return (
    <section id="gallery">
        {
            (props.dataset && /* if datas got fetched */
                props.dataset.map((logement) => (<Link className="anchor" to={"hebergement/"+logement.id} key={logement.id}>
                    <ImmoCard addLike={addLike} removeLike={removeLike} likes={likesList} title={logement.title} cover={logement.cover} rentalId={logement.id}/></Link>)))
            || ((props.error && !props.loadingState) && /* !props.loadingState > don't show the error div when no real error, ie : it's only loading */
                <ErrorBox />)}
    </section>
    )
}

export default Gallery