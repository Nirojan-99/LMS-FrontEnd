import classes from "./Semester.module.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
const Semester = (props) => {
  //   const semesterID = props.match.params.courseID;
  //  console.log(ID);
  const semesterid = props.id;
  const year = props.year;
  // const [semester,setsemester] = useState();




  return (
    <div className={classes.semesterNumber}>
      <ul>
        <li>
          <a href={"/faculties/course/"+year+"/1/" + props.id}>1st Semester</a>
        </li>
        <li>
          <a href={"/faculties/course/"+year+"/2/" + props.id}>2nd Semester</a>
        </li>
      </ul>
    </div>
  );
};
export default Semester;
