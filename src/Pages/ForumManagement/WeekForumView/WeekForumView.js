import classes from "./WeekForumView.module.css";
import forum from "../../../Assets/forum.png";

const WeekForumView = (props) => {
  return (
    // <div className={classes.week_container} id={props.row.week}>
    //   <div className={classes.week_box}>
    //     <div className={classes.week_title} id={props.id}>
    //       {"WEEK  " + props.row.week}
    //     </div>
    //   </div>
    // </div>

    <div className={classes.week_container} id="week1">
      <div className={classes.week_box}>
        <div className={classes.week_title} id="week1">
          {"WEEK  " + "1"}
        </div>
        <div className={classes.inline}>
        <img src={forum} className={classes.Avatar}/>

        <div className={classes.content}>
        <h2>This Discussion is about First Subject of Mobile Application</h2>
        <h3>Prof.Ratherna Veera</h3>
        <h4>21st August 2021</h4>
        </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default WeekForumView;
