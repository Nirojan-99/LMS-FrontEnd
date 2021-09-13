import lock from "../../../../Assets/lock_orange.png";
import pencil from "../../../../Assets/pencil.svg";
import insight1 from "../../../../Assets/bar-graph.svg";
import deleteI from "../../../../Assets/delete.png";
import { useState } from "react";
import classes from "./ModuleView.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DeleteFacultiesPopup from "../../../FacultiesPage/FacultiesView/Components/DeleteFacultiesPop/DeleteFacultiesPopup";
const ModuleView = (props) => {
  const userType = useSelector((state) => state.loging.type);
  const [onDelete, setOnDelete] = useState(false);
  const clickH = () => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const ONDeleteModule = () => {
    axios
      .post("http://localhost:5000/Module/delete_Module", {
        _id: props.Module._id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <>
      <div className={classes.containerM}>
        <div className={classes.popup}>
          {onDelete && (
            <DeleteFacultiesPopup
              hide={hide}
              onDelete={ONDeleteModule}
              name={props.Module.Modulename}
            />
          )}
        </div>

        <span className={classes.left_items}>
          <span className={classes.title}>
            <a href={"/my-courses/" + props.Module._id}>
              {props.Module.Modulename}
            </a>
          </span>
        </span>
        <span className={classes.right_items}>
          <span className={classes.icons}>
          {userType === "admin" && (  <a href={"/faculties/module/insight/" + props.Module._id}>
              <img src={insight1} className={classes.img_buttons}></img>
            </a>)}
            {userType === "admin" && (
              <a href={"/faculties/module/" + props.Module._id}>
                <img src={pencil} className={classes.img_buttons}></img>
              </a>
            )}
            {/* 
              <img src={lock} className={classes.img_buttons}></img>
           */}
            {userType === "admin" && (
              <a onClick={clickH}>
                <img src={deleteI} className={classes.img_buttons}></img>
              </a>
            )}
          </span>
        </span>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default ModuleView;
