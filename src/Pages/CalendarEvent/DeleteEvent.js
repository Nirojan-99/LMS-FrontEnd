import classes from "./DeletEvent.css";
import { ReactDOM } from "react-dom";

const DeleteEventsPopup = (props) => {
  return (
    <>
    <div className={classes.backdrop} onClick={props.hide}></div>
      <div className={classes.container}>
          <h2 className={classes.title}>Are You Sure to Delete ?</h2>
          <label for="Admin Password" className={classes.lables} >AdminPassword</label><br/>
          <input type="password" className={classes.inputs}></input>
          <div className={classes.buttons}>
            <button className={classes.deleteButton} onClick={props.onDelete}>Delete</button>
            
            
          </div>
      </div>
    </>
  );
};

export default DeleteEventsPopup;