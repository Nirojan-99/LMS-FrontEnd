import classes from "./Allcourse.module.css";
// import plus from "../../../../Assets/plus.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import plus from "../../../../Assets/plus.png";
import Course from "./course";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";
import { useHistory } from "react-router";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import Loader from "../../../../Components/Loader/Loader";


const Allcourse = (props) => {
  const history = useHistory();
  const userType = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();

  const [courses, setCourse] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  const clickedHandler = (event) => {
    setError(null);
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/Faculty/get_courses",
        {
          courses: props.faculty.courses,
        },
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )

      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized to get course !");
         // setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 300);
        }  else if (res.data.fetch === false) {
          setError("No matching Job found ! redirecting to portal");
          //setIsUploaded(false);
          history.replace("/faculties");
          
          
        }else
        setCourse(res.data);
        setLoaded(true);
        setLoad(true);
      
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  return (<>
     {load && (<div className={classes.Allcontent}>
       {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {setLoaded &&
        courses.map((row) => {
          return (
            <div className={classes.textspace}>
              <Course Course={row.coursename} data={row} />
              <course />
            </div>
          );
        })}

      {userType === "admin" && (
        <div className={classes.imgbutton}>
          <div className={classes.imgbutton_plus}>
            <a
              className={classes.addcourse}
              href={"/faculties/Addcourse/" + props.faculty._id}
            >
              <img src={plus} className={classes.plusIcon} />
            </a>
          </div>
        </div>
      )}
    </div>)}
    {!load && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )} 
    </>
  );
};
export default Allcourse;
