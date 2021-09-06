import classes from "./Announcement.module.css";
import plus from "../../Assets/plus.svg";
import List from "./List";

const Announcement = () => {
  return (
    <div className={classes.container}>
      <div className={classes.Announcement_container}>
        <h2 className={classes.title}>ANNOUNCEMENTS</h2>
        <a href={"/dashboard/new_announcement"}>
          <div className={classes.add_new}>
            <img className={classes.image} src={plus} />
            <span className={classes.prompt}>add Announcement</span>
          </div>
        </a>
        <List data={{_id:"11"}}/>
      </div>
      <div className={classes.side}></div>
    </div>
  );
};

export default Announcement;
