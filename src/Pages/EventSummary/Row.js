import classes from "./Row.module.css";
import calendar from "../../Assets/calendar.png";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../Store/auth";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";

const Row = (props) => {
  const [clickedDelete, setclickedDelete] = useState(false);
  const [error, setError] = useState(null);
  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);
  const editable = userID === props.data.creator;
  const dispatch = useDispatch();

  const hide = () => {
    setclickedDelete(false);
  };
  const onDelete = () => {
    axios
      .delete(
        "http://localhost:5000/event/delete_event?_id=" + props.data._id,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((resp) => {
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.deleted === false) {
          setError("Unable to delete! try again");
          setclickedDelete(false);
        } else {
          setclickedDelete(false);
          window.location.reload();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const onDeleteEvent = () => {
    setclickedDelete(true);
  };
  const clickedHandler = () => {
    setError(null);
  };

  return (
    <div className={classes.container}>
      {clickedDelete && <DeletePopup hide={hide} onDelete={onDelete} />}
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <img className={classes.image} src={calendar} />
      <span className={classes.details}>{props.data.date}</span>
      <span className={classes.details}>{props.data.title}</span>
      {
        <span
          style={{ color: !editable && "black" }}
          className={classes.btn}
          onClick={editable && onDeleteEvent}
        >
          {editable && "delete"}
        </span>
      }
    </div>
  );
};

export default Row;
