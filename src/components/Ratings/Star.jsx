import '../../styles/Ratings.css'
import redstar from '../../assets/redstar.svg'
import greystar from '../../assets/greystar.svg'

const Star = (props) => {
    return (
    <img data-testid={props.src === "redstar" ? "redstar" : "greystar"} className={props.src === "redstar" ? "star-red" : "star-grey"} src={props.src === "redstar" ? redstar : greystar} alt="positive star" />
    )
}

export default Star