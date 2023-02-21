import '../styles/ImmoCard.css'
//import { PropTypes } from 'prop-types'

const ImmoCard = (props) => {

    /*const likeClicking = (rentalId) => {

    }*/

    return (
    <article className="immocard">
        <img className='mainImg' src={props.cover} alt="Appartement cosy"/>
        <p>{props.title}</p>
        <img data-testid='favicon' className="favicon" src={props.likes?.includes(props.rentalId) ? "favfull.svg" : "favoutline.svg"} 
        onClick={(e) => {
            e.preventDefault(); e.stopPropagation(); 
            props.likes?.includes(props.rentalId) ? props.removeLike(props.rentalId) : props.addLike(props.rentalId)
            }}/>
    </article>
    )
}

/*ImmoCard.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string
}*/

export default ImmoCard