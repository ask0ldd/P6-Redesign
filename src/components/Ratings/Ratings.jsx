import '../../styles/Ratings.css'
import Star from './Star'

/*const Star = (props) => {
    return (
    <img className="star-red" src={props.src === "redstar" ? redstar : greystar} alt="positive star" />
    )
}*/

const Ratings = (props) => {

    const buildRatings = (x) => 
    {
        let ratings = ["","","","",""]
        ratings.fill({"src" : "redstar"}, 0, 5)
        if(x<5) ratings.fill({"src" : "greystar"}, x, 5)
        return ratings
    }

    const ratingsArray = buildRatings(parseInt(props.rating))

    return (
    <div className="starsContainer">
        {ratingsArray.map((r, index) => <Star key={index} src={r.src}/>)}
    </div>
    )
}
 
export default Ratings