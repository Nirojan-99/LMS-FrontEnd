import classes from "./DeletePopup.module.css";
import { ReactDOM } from "react-dom";

const DeletePopup = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.hide}></div>
      <div className={classes.container}>
        <h2 className={classes.title}>Are You Sure to Delete ?</h2>
        <div className={classes.buttons}>
          <span className={classes.cancel} onClick={props.hide}>
            Cancel
          </span>
          <button className={classes.deleteButton} onClick={props.onDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
