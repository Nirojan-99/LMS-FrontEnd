import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";

const Week = (props) => {

  const [isempty, setIsEmpty] = useState(false);

  if (props.row.contents == null) {
    setIsEmpty(true);
  }

  const week = props.row.contents;

  const [contents, setContents] = useState([]);
  const [loaded, setLoaded] = useState(true);
  console.log("a" + week);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_materials?contents=" + week)
      .then((res) => {
        // console.log(res.data);
        if (!res.data.msg) {
          setContents(res.data);
          setLoaded(false);
        }else{
          setContents([])
          setLoaded(false)
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

 let visibleCount = contents.filter((row)=>{return row.visibility === "visible"})

  return (
    <div className={classes.week_container} id={props.row.week}>
      <div className={classes.week_box}>
        <div className={classes.week_title} id={props.id}>
          {"WEEK  " + props.row.week}
        </div>
        { contents.map((row) => {
          return <WeekContainer week={props.week}  data={row} />;
        })}
        {contents.length === 0 || visibleCount.length === 0? <span className={classes.noMaterials}>No materials available !!</span>:null}
        <div className={classes.loader}>{loaded && <Loader />}</div>

        <div className={classes.addNew}>
          <a href={"select_type/" + props.row._id} className={classes.add}>
            Add New
          </a>
        </div>
        <hr className={classes.line}></hr>
      </div>
    </div>
  );
};
export default Week;
