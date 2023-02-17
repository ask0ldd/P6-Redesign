import '../styles/Slideshow.css'
import { useState } from 'react'
import arrow from '../assets/arrow-right.svg'

const Slideshow = (props) => {

    const imageUrls = props.picslist // array of urls passed as a prop

    const [indexImg, setIndexImg] = useState(0);

    function nextImg() {
        indexImg < imageUrls.length-1 ? setIndexImg(indexImg + 1) : setIndexImg(0)
    }

    function prevImg() {
        indexImg !== 0 ? setIndexImg(indexImg - 1) : setIndexImg(imageUrls.length-1)
    }

    return ( // no arrows if one pic only / deal with no pics
    <section className='slideshow'>
        <img src={imageUrls[indexImg]} alt="temp"/>
        {imageUrls.length > 1 ? <div className="buttons-container"> 
            <div onClick={prevImg}><img id="prevArrow" src={arrow} alt="arrow previous" /></div>
            <div onClick={nextImg}><img src={arrow} alt="arrow next" /></div>
            <span className="index">{indexImg+1}/{imageUrls.length}</span>
        </div> : ''}
    </section>
    )
}

export default Slideshow