import classes from "./Attandance.module.css"

const Attandance = (props)=>{

    const ID = props.match.params.ID;

    const onMarkAttandance=()=>{
        const currentdate = new Date(); 
        const date = currentdate.getDate()
        const time = currentdate.getHours() + ":" + currentdate.getMinutes();
        // console.log(date , time)
    }

    return (<div className={classes.container}>
        <h2 className={classes.title}>Attandance</h2>
        <hr className={classes.line}></hr>
        <div className={classes.box}>
        <label className={classes.labels} htmlFor="mark">Click to Mark Attandance</label>
        <input id="mark" className={classes.check} onChange={onMarkAttandance} type="checkbox"></input>
        </div>
      
    </div>)
}

export default Attandance