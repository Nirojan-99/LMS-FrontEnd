import classes from "./UserDetails.module.css";
import pencil from "../../../Assets/pencil.svg";
import deleteI from "../../../Assets/delete.svg";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../../Store/auth";


const UserDetails = (props) => {
  const history = useHistory();
  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loging.type);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const token = useSelector((state) => state.loging.token);

  const clickD=(id)=>{
    console.log("Clicked",id);
    setOnDelete((state) => !state);
    setOnDeleteID(id);
  }
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const deleteMaterial = () => {
    axios
    .delete("http://localhost:5000/userManagement/delete_user?_id="+deleteID, {
      headers: { Authorization: "lmsvalidation " + token },
    })
    .then((res) => {
      if (res.data.auth === false) {
        setError("You Are not Authorized!");
        setIsUploaded(false);
        setTimeout(() => {
          dispatch(logout());
        }, 500);
      } else if (res.data.fetch === false) {
        setError("Wrong Request");
        setIsUploaded(false);
        setTimeout(() => {
          dispatch(logout());
        }, 600);
      } else if (res.data.deleted === false) {
        setError("Cann't find user");
        setIsUploaded(false);
        setTimeout(() => {
          history.goBack();
        }, 600);
      } else {
      setOnDelete((state) => !state);
      setIsUploaded(false);
      setError("User Deleted!");
      setTimeout(() => {
        window. location. reload();
      }, 600);
    }
      
    })
    .catch((er) => {
      setIsUploaded(false);
      setError("Something went wrong try again");
      setTimeout(() => {
        window. location. reload();
      }, 600);
    });
  };

  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  return (
    <>
    {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
      
      <div className={classes.container}>
      
        <div>{props.data.ID}</div>
        <div>{(props.data.name).toUpperCase()}</div>
        <div>{(props.data.type).toUpperCase()}</div>
        <div>{(props.data.faculty).toUpperCase()}</div>
        <div>
          <span className={classes.right_items}>
            <span className={classes.icons}>
              <a href={`/edit-user/` + props.data._id}>
                <img src={pencil} className={classes.img_buttons}></img>
              </a>
              <a>
                <img src={deleteI} className={classes.img_buttonsD}
                onClick={()=>{clickD(props.data._id)}}></img>
              </a>
            </span>
          </span>
        </div>
      </div>

      {/* <hr className={classes.line}></hr> */}
    </>
  );
};
export default UserDetails;
