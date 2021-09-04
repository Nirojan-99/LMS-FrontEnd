import classes from "./FacultiesName.module.css"
import { useState } from "react";
import AllSpecializationName from "./AllSpecializationName";
import OutsideClick from "./OutsideClick";
import React, { useRef } from "react";
import DeleteFacultiesPopup from "./DeleteFacultiesPop/DeleteFacultiesPopup";

import deleteI from "../../../../Assets/delete.png"
import arrow from "../../../../Assets/arrow-left.png"

const FacultieName = (props) => {


  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  
  
  //delete
  const [onDelete, setOnDelete] = useState(false);
  const clickH = () => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const deleteCourse = (id) => {};

  return (
    <div className={classes.headerback1}>

<div className={classes.popup}>
        {onDelete && (
          <DeleteFacultiesPopup
            hide={hide}
            onDelete={() => deleteCourse("id")}
          />
        )}
      </div>
     
       
    <button className={classes.buttonF} >
    <img src={arrow} onClick={onClick}className={classes.arrow_buttons}></img>
        {props.FacultiesName}  
        <div>
        <a onClick={clickH} >
            <img src={deleteI} className={classes.img_buttons}></img>
        </a>
        </div>
        </button> 

   
      <nav> {isActive && <AllSpecializationName />} </nav>
    </div>
  );
};
export default FacultieName;
