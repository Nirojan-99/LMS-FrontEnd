import classes from "./Course.module.css"
import Arrow from "../../../Assets/arrow-left.png"
import Delete from "../../../Assets/delete.png"
import { useState } from "react"

import OutsideClick from "./OutsideClick";
import React, { useRef } from "react";
import Semester from "./Semester"
import DeleteFacultiesPopup from "../../FacultiesPage/FacultiesView/Components/DeleteFacultiesPop/DeleteFacultiesPopup"
const Course =(props)=>{

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);



    
        const [onDelete, setOnDelete] = useState(false);
        const clickH = () => {
          setOnDelete((state) => !state);
        };
        const hide = () => {
          setOnDelete((state) => !state);
        };
        const deleteMaterial = (id)=>{
      
        }
    
        return(
    
    
            <div className={classes.containerM}>
           <div className={classes.popup}>
          {onDelete && <DeleteFacultiesPopup hide={hide} onDelete={()=>deleteMaterial("id")}/>}
        </div>
    
    <span className={classes.left_items}>
    <div className={classes.left}>
    <img src={Arrow} className={classes.iconArrow} />
    </div>
    <span className={classes.title}><a onClick={onClick}>{props.year}</a></span>
    </span>

  


    <span className={classes.right_items}>
    <span>
            <a onClick={clickH}>
              <img src={Delete} className={classes.img_buttons}></img>
            </a>
    </span>
    </span>
    <hr className={classes.line}></hr>
    <nav> {isActive && <Semester/>} </nav>
    </div>
    
   )
}
export default Course;