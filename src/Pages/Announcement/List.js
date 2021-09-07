import classes from "./Announcement.module.css";
import noti from "../../Assets/noti.png";
import { useSelector } from "react-redux";

const List = (props) => {
  const type = useSelector((state) => state.loging.type);

  return (
    <a
      href={
        type === "admin"
          ? "dashboard/edit_announcement/" + props.data._id
          : "dashboard/announcement/" + props.data._id
      }
    >
      <div className={classes.announce_container}>
        <div className={classes.image_part}>
          <img className={classes.image_noti} src={noti} />
        </div>
        <div className={classes.box}>
          <div className={classes.message}>{props.data.subject}</div>
          <div className={classes.details}>
            {props.data.date} / {props.data.time} | {props.data.author}
          </div>
        </div>
      </div>
    </a>
  );
};

export default List;
