import classes from "./Faculties.module.css";
import { useState } from "react";
import Allcourse from "./Allcourse";
import OutsideClick from "./OutsideClick";
import React, { useRef } from "react";
import DeleteFacultiesPopup from "./DeleteFacultiesPop/DeleteFacultiesPopup";

import deleteI from "../../../../Assets/delete.png";
import arrow from "../../../../Assets/arrow-left.png";
import axios from "axios";
import pencil from "../../../../Assets/pencil.svg";
import { useSelector,useDispatch } from "react-redux";


const Faculties = (props) => {
  const userType = useSelector((state) => state.loging.type);
  // ARROW PREES
  const facultyId = props.data._id;
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  // Delete hooks
  const [onDelete, setOnDelete] = useState(false);
  const clickH = () => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const onDeleteA = () => {
    axios
      .post("http://localhost:5000/Faculty/delete_faculty", {
        _id: props.data._id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <div className={classes.FacultieNameALL}>
      <div className={classes.popup}>
        {onDelete && (
          <DeleteFacultiesPopup
            hide={hide}
            onDelete={onDeleteA}
            name={props.data.name}
            id={props.data._id}
        
            
          />
        )}
      </div>

      <div className={classes.allcontent}>
        <div className={classes.leftallcontent}>
          <img
            src={arrow}
            onClick={onClick}
            className={classes.arrow_buttons}
          ></img>
          <div className={classes.FacultiesName}>{props.FacultiesName}</div>
        </div>
        {userType === "admin" && (  <div className={classes.Rightallcontent}>
          <div className={classes.buttonedit}>
            <a href={"/faculties/editfaculties/" + facultyId}>
              <img src={pencil} className={classes.img_buttons_edit}></img>
            </a>
          </div>
          <div>
            <a onClick={clickH}>
              <img src={deleteI} className={classes.img_buttons}></img>
            </a>
          </div>
        </div>)}
      </div>

      <nav> {isActive && <Allcourse faculty={props.data} />} </nav>
    </div>
  );
};
export default Faculties;
