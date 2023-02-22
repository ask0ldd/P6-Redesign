import '../styles/Gallery.css'
import ImmoCard from './ImmoCard'
import { Link } from 'react-router-dom'
import { ErrorBox } from './ErrorBox'
import { useState } from 'react'
import { useLikesState } from '../hooks/useLikesState'

const Gallery = (props) => {

    const [addLike, storagetoLikesList, removeLike, likesList] = useLikesState()

    if((likesList.length === 0) && (window.localStorage.getItem('likes') !== null)) {
        storagetoLikesList()
    }

    return (
    <section id="gallery">
        {
            (props.dataset && /* if datas got fetched */
                props.dataset.map((logement) => (<Link className="anchor" to={"hebergement/"+logement.id} key={logement.id}>
                    <ImmoCard addLike={addLike} likes={likesList} removeLike={removeLike} title={logement.title} cover={logement.cover} rentalId={logement.id}/></Link>)))
            || ((props.error && !props.loadingState) && /* !props.loadingState > don't show the error div when no real error, ie : it's only loading */
                <ErrorBox />)
        }
    </section>
    )
}

export default Gallery