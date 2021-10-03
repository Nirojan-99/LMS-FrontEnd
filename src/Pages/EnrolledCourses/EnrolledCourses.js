import classes from "./EnrolledCourses.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { logout } from "../../Store/auth";

const EnrolledCourses = () => {
  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/get_modules?ID=" + userID, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          dispatch(logout());
        } else if (res.data.courses) {
          setCourses(res.data.courses);
          setLoaded(true);
        }else{
          setLoaded(true);
        }
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
