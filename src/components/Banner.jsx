import '../styles/Banner.css'

const Banner = (props) => {

    const bannerText = props.type === 'standard' ? '<div>Chez vous,&nbsp;</div><div>partout et ailleurs</div>' : ''
    const bannerCSSClass = props.type !== 'standard' ? 'banner-'+props.type : 'banner'

    return (
    <section className={bannerCSSClass} dangerouslySetInnerHTML={{__html:bannerText}} >
    </section>
    )
}

export default Banner