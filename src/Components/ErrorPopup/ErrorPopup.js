import classes from "./ErrorPopup.module.css"

const ErrorPopup = (props)=>{
    return(<div className={classes.backdrop}>
        <div className={classes.container}>
            <h2 className={classes.title}>Alert !</h2>
            <h2 className={classes.msg}>{props.error}</h2>
            <button onClick={props.clickedHandler} className={classes.btn}>OK, Got It</button>
        </div>
    </div>)
}

export default ErrorPopup