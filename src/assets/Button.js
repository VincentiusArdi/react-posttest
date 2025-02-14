// import "../App.css"


function Button(props) {

    return (
        <div>
            <button className="btn" onClick={props.handleClick} style={{backgroundColor: props.color}}>{props.label}</button>
        </div>
    )
}
export default Button