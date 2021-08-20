import classes from "./WeekMaterial.module.css";
import pdf from "../../../../Assets/pdf.svg";
import pencil from "../../../../Assets/pencil.svg";
import insight1 from "../../../../Assets/bar-graph.svg";
import deleteI from "../../../../Assets/delete.svg";
import axios from "axios";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import { useState } from "react";

const WeekContainer = (props) => {
  const [onDelete, setOnDelete] = useState(false);
  const clickH = () => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const deleteMaterial = (id)=>{

  }
  return (
    <>
      <div className={classes.containerM}>
        <div className={classes.popup}>
          {onDelete && <DeletePopup hide={hide} onDelete={()=>deleteMaterial("id")}/>}
        </div>

        <span className={classes.left_items}>
          <img src={pdf} className={classes.iconM} />
          <span className={classes.title}>Material Title</span>
          <span className={classes.hidden_popup}>Hidden to Students</span>
        </span>
        <span className={classes.right_items}>
          <span className={classes.icons}>
            <a href="insight/:moduleCode">
              <img src={insight1} className={classes.img_buttons}></img>
            </a>
            <a href="material/:materialID">
              <img src={pencil} className={classes.img_buttons}></img>
            </a>
            <a onClick={clickH}>
              <img src={deleteI} className={classes.img_buttons}></img>
            </a>
          </span>
          <span>
            <input
              type="checkbox"
              value=""
              className={classes.check_box}
            ></input>
          </span>
        </span>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default WeekContainer;
