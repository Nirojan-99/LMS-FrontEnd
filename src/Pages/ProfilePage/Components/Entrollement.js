import classes from "./Entrolment.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";

const ModuleCourseInsights = () => {
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
        } else {
          setLoaded(true);
        }
      })
      .catch((er) => {});
  }, []);

  const [isEmptyList, setEmpty] = useState(false);

  const unenrollHandler = (id) => {
    axios
      .post(
        "http://localhost:5000/user/unenroll",
        { ID: id, student: userID },
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          dispatch(logout());
        } else if (res.data.ack === true) {
          window.location.reload();
        } else {
        }
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.head}>My Enrollments</div>
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
          </>
        );
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    </div>
  );
};

export default ModuleCourseInsights;
