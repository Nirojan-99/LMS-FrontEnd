import classes from "./HelpDesk.module.css";
import deleteI from "../../Assets/delete.svg";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";

const Details = (props) => {
  const [deleted, setDeleted] = useState(false);
  const onDelete = () => {
    axios
    .delete("http://localhost:5000/helpDesk/delete_tcket?ticketID="+props.data._id)
    .then((res) => {
      window.location.reload()
      setDeleted(false)
    })
    .catch((er) => {
      console.log("error");
    });
  };
  const hide = () => {
    setDeleted(false);
  };
  const onDeletePress = () => {
    setDeleted(true);
  };
  return (
    <div className={classes.details_container}>
      <a href={"/services/eticket/" + props.data._id}>
        <div className={classes.main}>
          {props.data.username}{" "}
          <span className={classes.sub}> {props.data.date_time}</span>
        </div>
      </a>
      <img onClick={onDeletePress} className={classes.image} src={deleteI} />
      {deleted && <DeletePopup onDelete={onDelete} hide={hide} />}
    </div>
  );
};

export default Details;
