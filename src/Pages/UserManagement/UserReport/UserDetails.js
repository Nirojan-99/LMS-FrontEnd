import classes from "./UserDetails.module.css";
import pencil from "../../../Assets/pencil.svg";
import deleteI from "../../../Assets/delete.svg";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import DeletePopup from "../../../Components/DeletePopup/DeletePopup";

const UserDetails = (props) => {
  const history = useHistory();
  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");

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
    .post("http://localhost:5000/userManagement/delete_user",{_id:deleteID})
    .then((res) => {
      //acknogement
      setOnDelete((state) => !state);
      window. location. reload() 
      
    })
    .catch((er) => {
      console.log("error");
    });
  };

  return (
    <>
    {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
      <div className={classes.container}>
      
        <div>{props.data._id}</div>
        <div>{props.data.name}</div>
        <div>{props.data.type}</div>
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

      <hr className={classes.line}></hr>
    </>
  );
};
export default UserDetails;
