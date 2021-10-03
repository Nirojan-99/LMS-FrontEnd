import classes from "./timetable.module.css"
import Row from "./Row"
import { useEffect,useState } from "react"

const Timetable = ()=>{
    useEffect(()=>{
        
    },[])
    return(<div className={classes.container}>
        <div className={classes.head}>TIMETABLES</div>
        <Row/>
        <Row/>
    </div>)
}

export default Timetable