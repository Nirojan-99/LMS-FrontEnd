import classes from "./CoursePage.module.css";
import CourseYear from "./Components/CourseYear";
import { useEffect, useState } from "react";
import axios from "axios";

const CoursePage = (props) => {
  const ID = props.match.params.courseID;

  const [course, setcourse] = useState([]);
  const [arr, setarr] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios

      .post("http://localhost:5000/course/getyear", { id: ID })
      .then((res) => {
        console.log(res.data.courseYear);
        setcourse(res.data.courseYear);
        setLoaded(true);
       
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  let data =[];
  const year = +course;
  for (let i = 1; i <= year; i++) {
    data.push(i)
  }
console.log(data)
  return (
    <>
      <div className={classes.Allcourse}>
        <div className={classes.Allcourse_course}>
          {loaded &&
      data.map((row) => {
              return <CourseYear year={row } data={row} ID = {ID}  />;
            })}

        </div>
      </div>
    </>
  );
};
export default CoursePage;
