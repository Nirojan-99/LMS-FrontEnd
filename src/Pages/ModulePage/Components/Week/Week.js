import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";

const Week = (props) => {
  return <div className={classes.week_container}>
    <div className={classes.week_box}>
      <div className={classes.week_title} id={props.id}>
        Week 1
      </div>
       <WeekContainer/>
       <div className={classes.addNew}><a href="select_type/1" className={classes.add}>Add New</a></div>
       <hr className={classes.line}></hr>
    </div>
     
  </div>;
};
export default Week;
