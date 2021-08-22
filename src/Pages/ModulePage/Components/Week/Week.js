import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";

const Week = (props) => {
  const week = props.row.content;

  return (
    <div className={classes.week_container}>
      <div className={classes.week_box}>
        <div className={classes.week_title} id={props.id}>
          {"week  "+props.row.week}
        </div>
        {week.map((row)=>{
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
