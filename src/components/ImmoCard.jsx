import '../styles/ImmoCard.css'
//import { PropTypes } from 'prop-types'

const ImmoCard = (props) => {
    return (
    <article className="immocard">
        <img className='mainImg' src={props.cover} alt="Appartement cosy"/>
        <p>{props.title}</p>
        <img className="favicon" src={props.liked==="false" ? "favoutline.svg" : "favfull.svg"}/>
    </article>
    )
}

/*ImmoCard.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string
}*/

export default ImmoCard