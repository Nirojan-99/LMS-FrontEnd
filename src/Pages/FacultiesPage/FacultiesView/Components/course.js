import classes from "./course.module.css";
import deleteI from "../../../../Assets/delete.png";
import DeleteFacultiesPopup from "./DeleteFacultiesPop/DeleteFacultiesPopup";
import { useState } from "react";
import axios from "axios";
import pencil from "../../../../Assets/pencil.svg";
import { useSelector,useDispatch } from "react-redux";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../../../Store/auth";

const Course = (props) => {
  const userType = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();
  // const courseID = props.data._id;
 


  


  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");
  const [isCompleted, setIsCompleted] = useState(true);
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

  const onDeleteCourse = () => {
    axios
      .delete("http://localhost:5000/course/delete_course?id=" +deleteID, 
        {
          headers: { Authorization: "lmsvalidation " + token },})
      
      .then((res) => {
        if (res.data.auth === false) {
          setTimeout(() => {
            dispatch(logout());
          }, 300);
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
    <div className={classes.main_out}>
      <div className={classes.popup}>
        {onDelete && (
          <DeleteFacultiesPopup hide={hide} onDelete={onDeleteCourse} name={props.data.coursename} />
        )}
                  {!isCompleted && (
        <ErrorPopup
          clickedHandler={clickedHandler}
          error={"Unable to delete !"}
        />
      )}
      </div>

      <div className={classes.leftcontent}>
        <div className={classes.text}>
          <a href={"faculties/course/Year/"+props.data._id} className={classes.link}> 
            <div>{props.Course}</div>
          </a>
        </div>
      </div>

      {userType === "admin" && ( <div className={classes.rightcontent}>
        <a href={"faculties/editcourse/"+props.data._id}>
          <img src={pencil} className={classes.img_buttons_edit} ></img>
        </a>

        <a onClick={clickH}>
          <img src={deleteI} className={classes.img_buttons}></img>
        </a>
      </div>)}
    </div>
  );
};
export default Course;
