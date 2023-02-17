import '../../styles/Tags.css'

const Tag = (props) => {
    return (
    <div className="tag">
        {props.tagContent}
    </div>
    )
}

export default Tag