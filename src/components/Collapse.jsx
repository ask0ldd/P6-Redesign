import '../styles/Collapse.css'
import { useState } from 'react'
import arrowUp from '../assets/collapse-up.svg'
import arrowDown from '../assets/collapse-down.svg'


const Collapse = (props) => {

    const [bodyDisplay, updateBodyDisplay] = useState(false)

    // headnbody style passed as a prop / body content passed as a pro > innerhtml
    return (
    <article className="collapse">
        <div onClick={()=>updateBodyDisplay(!bodyDisplay)} className={'collapse__heading '+ props.headnbodystyle[0] /* different styles have been passed if apropos or rental */}>
            <div>{props.heading}</div><img src={bodyDisplay === true ? arrowUp : arrowDown} alt="arrow" />
        </div>
        {bodyDisplay === true &&
        <div className={'collapse__body '+ props.headnbodystyle[1]} dangerouslySetInnerHTML={{__html: props.body}} /> /* innerhtml to interpret the inserted <br>  */}
    </article>
    )
}

export default Collapse