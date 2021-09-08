import classes from "./EnrolledCourses.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

const EnrolledCourses = () => {
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

  return (
    <>
      {loaded && courses && (
        <div className={classes.container}>
          {loaded &&
            courses &&
            courses.map((row) => {
              return (
                <a href={"/my-courses/" + row.id}>
                  <div className={classes.courses}>{row.name}</div>
                </a>
              );
            })}
        </div>
      )}
      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {loaded && courses.length === 0 && (
        <div className={classes.msg}>You Have not enrolled any courses !</div>
      )}
    </>
  );
};

export default EnrolledCourses;
