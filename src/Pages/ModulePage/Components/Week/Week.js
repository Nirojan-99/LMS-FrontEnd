import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Week = (props) => {
  const week = props.row.contents;

  const [contents,setContents] = useState([])
  console.log("a"+week)

  useEffect(()=>{
    axios
      .get("http://localhost:5000/admin/get_materials?contents=" + week)
      .then((res) => {
        console.log(res.data);
        setContents(res.data)
      })
      .catch((er) => {
        console.log("error");
      });
  },[])


  return (
    <div className={classes.week_container}>
      <div className={classes.week_box}>
        <div className={classes.week_title} id={props.id}>
          {"week  "+props.row.week}
        </div>
        {contents.map((row)=>{
          return <WeekContainer data={row} />
        })}
        
        <div className={classes.addNew}>
          <a href={"select_type/"+props.row._id } className={classes.add}>
            Add New
          </a>
        </div>
        <hr className={classes.line}></hr>
      </div>
    </div>
  );
};
export default Week;
