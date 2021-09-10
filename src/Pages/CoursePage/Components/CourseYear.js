import classes from "./CourseYear.module.css";
import Arrow from "../../../Assets/arrow-left.png";
import Delete from "../../../Assets/delete.png";
import { useState } from "react";

import OutsideClick from "./OutsideClick";
import React, { useRef } from "react";
import Semester from "./Semester";
import DeleteFacultiesPopup from "../../FacultiesPage/FacultiesView/Components/DeleteFacultiesPop/DeleteFacultiesPopup";

const CourseYear = (props) => {
  const ID1 = props.ID;
  console.log("sayanthan");
  console.log(ID1);

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
  const deleteMaterial = (id) => {};

  return (
    <div className={classes.ALLcontainerM}>
      <div className={classes.popup}>
        {onDelete && (
          <DeleteFacultiesPopup
            hide={hide}
            onDelete={() => deleteMaterial("id")}
          />
        )}
      </div>
      <div className={classes.allsubcontent}>
        <div className={classes.left_items}>
          <div className={classes.left}>
            <img src={Arrow} className={classes.iconArrow} onClick={onClick} />
          </div>
          <div className={classes.title}>
            <a>{props.year+"Year"}</a>
          </div>
        </div>

        <div className={classes.right_items}>
          <div>
            <a onClick={onDelete}>
              <img src={Delete} className={classes.img_buttons}></img>
            </a>
          </div>
        </div>
      </div>
      <hr className={classes.line}></hr>

      <nav> {isActive && <Semester year={props.year} id={ID1} />} </nav>
    </div>
  );
};
export default CourseYear;
