import classes from "./Row.module.css";
import calendar from "../../Assets/calendar.png";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Row = (props) => {
  const [clickedDelete, setclickedDelete] = useState(false);
  const userID = useSelector((state) => state.loging.userID);
  const editable = userID === props.data.creator;

  const hide = () => {
    setclickedDelete(false);
  };
  const onDelete = () => {
    axios
      .post("http://localhost:5000/event/delete_event", {
        _id: props.data._id,
      })
      .then((resp) => {
        setclickedDelete(false);
        window.location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const onDeleteEvent = () => {
    setclickedDelete(true);
  };

  return (
    <div className={classes.container}>
      {clickedDelete && <DeletePopup hide={hide} onDelete={onDelete} />}
      <img className={classes.image} src={calendar} />
      <span className={classes.details}>{props.data.date}</span>
      <span className={classes.details}>{props.data.title}</span>
      {
        <span style={{color: !editable && "black"}} className={classes.btn} onClick={editable && onDeleteEvent}>
          {editable && "delete"}
        </span>
      }
    </div>
  );
};

export default Row;
