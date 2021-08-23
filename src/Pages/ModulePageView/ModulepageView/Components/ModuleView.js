import lock from "../../../../Assets/lock.png" 
import pencil from "../../../../Assets/pencil.svg";
import insight1 from "../../../../Assets/bar-graph.svg";
import deleteI from "../../../../Assets/Delete.png"
import { useState } from "react";
import classes from "./ModuleView.module.css"
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import DeleteFacultiesPopup from "../../../FacultiesPage/FacultiesView/Components/DeleteFacultiesPop/DeleteFacultiesPopup";
const ModuleView = (props)=>{

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
          {onDelete && <DeleteFacultiesPopup hide={hide} onDelete={()=>deleteMaterial("id")}/>}
        </div>

        <span className={classes.left_items}>
         
          <span className={classes.title}><a href="/my-courses/:moduleID">props.Module</a></span>
        </span>
        <span className={classes.right_items}>
          <span className={classes.icons}>
            <a href="/Addfaculties/semesteryear/semester/Module/:moduleid">
              <img src={insight1} className={classes.img_buttons}></img>
            </a>
            <a href="material/:materialID">
              <img src={pencil} className={classes.img_buttons}></img>
            </a>
            <a href="/faculties/semesteryear/:semester/Module/ModuleEnrollment">
              <img src={lock} className={classes.img_buttons}></img>
            </a>
            <a onClick={clickH}>
              <img src={deleteI} className={classes.img_buttons}></img>
            </a>
          </span>
         
        </span>
      </div>
      <hr className={classes.line}></hr>
    </>
  );



            

}
export default ModuleView;