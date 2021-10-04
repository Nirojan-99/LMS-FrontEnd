import classes from "./timetable.module.css";
import download from "../../../Assets/download.svg";
import deletel from "../../../Assets/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";

const Row = (props) => {
  const [deletePress, setDeletePress] = useState(false);

  const deleteHandler = () => {
    setDeletePress(true);
  };
  const onDelete = () => {
    axios
      .delete(
        "http://localhost:5000/timetable/delete_timetable?ID=" + props.data._id
      )
      .then((res) => {
        if (res.data.deleted === false) {
          window.location.reload();
        } else {
        }
      })
      .catch((er) => {
        console.log(er);
      });
    setDeletePress(false);
  };

  const type = useSelector((state) => state.loging.type);
  return (
    <div className={classes.row_container}>
      {deletePress && (
        <DeletePopup
          hide={() => {
            setDeletePress(false);
          }}
          onDelete={onDelete}
        />
      )}
      <div className={classes.title}>{props.data.title}</div>
      {type !== "admin" && (
        <a href={props.data.link}><img  className={classes.logo} src={download} /></a>
      )}
      {type === "admin" && (
        <img onClick={deleteHandler} className={classes.logo} src={deletel} />
      )}
    </div>
  );
};

export default Row;
