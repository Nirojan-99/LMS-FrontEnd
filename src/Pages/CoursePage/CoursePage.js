import classes from "./CoursePage.module.css";
import CourseYear from "./Components/CourseYear";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";

const CoursePage = (props) => {
  const ID = props.match.params.courseID;
  const dispatch = useDispatch();
  const [course, setcourse] = useState([]);
  const [arr, setarr] = useState("");
  const [loaded, setLoaded] = useState(false);
  const token = useSelector((state) => state.loging.token);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  useEffect(() => {
    axios

      .get("http://localhost:5000/course/getyear?id=" +ID,{
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized to get year !");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1000);
        }
        else if (res.data.fetchYear === false) {
          setError("No matching year found ! redirecting to portal");
          setIsUploaded(false);
          setTimeout(() => {
           // history.replace("/services/job_portal");
          }, 1300);
        }else
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
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
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
