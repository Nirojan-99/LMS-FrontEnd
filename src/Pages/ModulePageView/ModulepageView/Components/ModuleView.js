import pencil from "../../../../Assets/pencil.svg";
import insight1 from "../../../../Assets/bar-graph.svg";
import deleteI from "../../../../Assets/delete.png";
import { useState } from "react";
import classes from "./ModuleView.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DeleteFacultiesPopup from "../../../FacultiesPage/FacultiesView/Components/DeleteFacultiesPop/DeleteFacultiesPopup";
import { logout } from "../../../../Store/auth";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import { useEffect } from "react";
import lock11 from "../../../../Assets/lock.png";
import unlock from "../../../../Assets/unlock.png";

const ModuleView = (props) => {
  const userType = useSelector((state) => state.loging.type);
  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();
  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");
  const [isCompleted, setIsCompleted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [lock, setlock] = useState(true);

  const clickH = () => {
    setOnDelete((state) => !state);
    setOnDeleteID(props.data._id);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const clickedHandler = () => {
    setIsCompleted(true);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/Enroll/enrollstatus?ID=" +
          userID +
          "&moduleid=" +
          props.Module._id,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.ack === false) {
          setlock(false)
          setLoaded(true);
          //history.replace("/faculties/enroll/" + moduleID);
        } else {
          setLoaded(false);
          setlock(true);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const ONDeleteModule = () => {
    axios
      .delete("http://localhost:5000/Module/delete_Module?id=" + deleteID, {
        headers: { Authorization: "lmsvalidation " + token },
      })

      .then((res) => {
        if (res.data.auth === false) {
          setTimeout(() => {
            dispatch(logout());
          }, 1000);
          setOnDelete(false);
        } else if (res.data.deleted === false) {
          setIsCompleted(false);
          setOnDelete(false);
        } else {
          setOnDelete((state) => !state);
          window.location.reload();
          //history.replace("./job_portal");
        }
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
          {!isCompleted && (
            <ErrorPopup
              clickedHandler={clickedHandler}
              error={"Unable to delete !"}
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
            {userType === "admin" && (
              <a href={"/faculties/module/insight/" + props.Module._id}>
                <img src={insight1} className={classes.img_buttons}></img>
              </a>
            )}
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

            {loaded && (
              // <a>
              //   <img src={lock11} className={classes.lock_button}></img>
                
              // </a>
              <div class={classes.tooltip}> <img src={lock11} className={classes.lock_button}></img>
                 <span class={classes.tooltiptext}>Not yet enrolled</span>
             </div>
         
            )}

{lock && (
              // <a>
              //   <img src={lock11} className={classes.lock_button}></img>
                
              // </a>
              <div class={classes.tooltip}> <img src={unlock} className={classes.lock_button}></img>
                 <span class={classes.tooltiptext}>Already enrolled</span>
             </div>
         
            )}
            
          </span>
        </span>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default ModuleView;
