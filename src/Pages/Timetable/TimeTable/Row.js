import classes from "./timetable.module.css"
import download from "../../../Assets/download.svg"
import deletel from "../../../Assets/delete.svg"
import { useSelector, useDispatch } from "react-redux";

const Row =()=>{
    const type = useSelector((state) => state.loging.type);
    return(<div className={classes.row_container}>
        <div className={classes.title}>Title</div>
        {type !== "admin" && <img className={classes.logo} src={download} />}
        {type === "admin" && <img className={classes.logo} src={deletel} />}
    </div>)
}

export default Row 