import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";

const Week = (props) => {
  return <div className={classes.week_container}>
    <div className={classes.week_box}>
      <div className={classes.week_title} id={props.id}>
        Week 1
      </div>
       <WeekContainer/>
    </div>
     
  </div>;
};
export default Week;
