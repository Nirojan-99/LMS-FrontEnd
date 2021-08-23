import classes from "./UserDetails.module.css";
import pencil from "../../../Assets/pencil.svg";
import deleteI from "../../../Assets/delete.svg";

const UserDetails = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.UserID}</div>
        <div>{props.data.name}</div>
        <div>{props.data.role}</div>
        <div>
          <span className={classes.right_items}>
            <span className={classes.icons}>
              <a href="/edit-user" >
                <img src={pencil} className={classes.img_buttons}></img>
              </a>
              <a>
                <img src={deleteI} className={classes.img_buttonsD}></img>
              </a>
            </span>
          </span>
        </div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default UserDetails;
