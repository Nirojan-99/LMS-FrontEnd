
import classes from "./Allcourse.module.css";
// import plus from "../../../../Assets/plus.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import plus from "../../../../Assets/plus.png";
import Course from "./course";
import { useSelector,useDispatch } from "react-redux";

 

const Allcourse = (props) => {
  const userType = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch()


  const [courses, setCourse] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/Faculty/get_courses", {
        courses: props.faculty.courses},
         
      )
      .then((res) => {
        
        setCourse(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  return (
    <div className={classes.Allcontent}>
      {setLoaded &&
        courses.map((row) => {
          return (
            <div className={classes.textspace}>
              <Course Course={row.coursename} data={row} />
              <course/>
              
              
            </div>
          );
        })}

{userType === "admin" && (   <div className={classes.imgbutton}>
        <div className={classes.imgbutton_plus}>
          <a
            className={classes.addcourse}
            href={"/faculties/Addcourse/" + props.faculty._id}
          >
            <img src={plus} className={classes.plusIcon} />
          </a>
        </div>
      </div>)}
    </div>
  );
};
export default Allcourse;
