import classes from "./Entrolment.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ModuleCourseInsights = () => {
  const userID = useSelector((state) => state.loging.userID);
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/get_modules?ID=" + userID)
      .then((res) => {
        setCourses(res.data.courses);
        console.log(courses[0]);
        setLoaded(true);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  // const [updatedList , setList] = useState(coursename)
  const [isEmptyList, setEmpty] = useState(false);

  const unenrollHandler = (id) => {
    console.log("called")
    axios
      .post("http://localhost:5000/user/unenroll" , { ID: id, student: userID })
      .then((res) => {
        window.location.reload();
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <div className={classes.container}>
      {courses.map((row) => {
        return (
          <>
            <div className={classes.span}>
              <div className={classes.name}>{row.name}</div>
              <div className={classes.btn}>
                <span
                  onClick={() => {
                    unenrollHandler(row._id);
                  }}
                >
                  Unenroll
                </span>
              </div>
            </div>
            <hr className={classes.line}></hr>
          </>
        );
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    </div>
  );
};

export default ModuleCourseInsights;
