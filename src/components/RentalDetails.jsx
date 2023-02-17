import '../styles/RentalDetails.css'
import Tags from './Tags/Tags'
import Ratings from './Ratings/Ratings'
import Host from './Host'

const RentalDetails = (props) => {
  return (
  <section id="rentalDetails">
    <div id="headingsNtags">
      <h1>{props.datas.title}</h1>
      <p>{props.datas.location}</p>
      <Tags tags={props.datas.tags}/>
    </div>
    <div id="ownerNratings">
      <Host host={props.datas.host}/>
      <Ratings rating={props.datas.rating} />
    </div>
  </section>
  )
}
  
export default RentalDetails