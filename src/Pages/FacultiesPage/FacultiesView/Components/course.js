import classes from "./course.module.css";
import deleteI from "../../../../Assets/delete.png";
import DeleteFacultiesPopup from "./DeleteFacultiesPop/DeleteFacultiesPopup";
import { useState } from "react";
import axios from "axios";
import pencil from "../../../../Assets/pencil.svg";

const Course = (props) => {
  // const courseID = props.data._id;
 


  


  const [onDelete, setOnDelete] = useState(false);
  const clickH = () => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const onDeleteCourse = () => {
    axios
      .post("http://localhost:5000/course/delete_course", {
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
    <div className={classes.main_out}>
      <div className={classes.popup}>
        {onDelete && (
          <DeleteFacultiesPopup hide={hide} onDelete={onDeleteCourse} name={props.data.coursename} />
        )}
      </div>

      <div className={classes.leftcontent}>
        <div className={classes.text}>
          <a href={"faculties/course/Year/"+props.data._id} className={classes.link}> 
            <div>{props.Course}</div>
          </a>
        </div>
      </div>

      <div className={classes.rightcontent}>
        <a href={"faculties/editcourse/"+props.data._id}>
          <img src={pencil} className={classes.img_buttons_edit} ></img>
        </a>

        <a onClick={clickH}>
          <img src={deleteI} className={classes.img_buttons}></img>
        </a>
      </div>
    </div>
  );
};
export default Course;
