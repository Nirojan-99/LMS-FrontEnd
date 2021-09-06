import classes from "./Announcement.module.css";
import noti from "../../Assets/noti.png";

const List = (props) => {
  return (
    <a href={"dashboard/announcement/" + props.data._id}>
      <div className={classes.announce_container}>
        <div className={classes.image_part}>
          <img className={classes.image_noti} src={noti} />
        </div>
        <div className={classes.box}>
          <div className={classes.message}>{props.data.subject}</div>
          <div className={classes.details}>
            {props.data.date_time} | {props.data.author}
          </div>
        </div>
      </div>
    </a>
  );
};

export default List;
