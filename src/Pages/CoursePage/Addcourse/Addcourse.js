import classes from "./Addcourse.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";
const Addcourse = (props) => {
  const dispatch = useDispatch();
  const facultyID = props.match.params.facultyID;
  const courseid = props.match.params.courseid;

  console.log(courseid);

  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("ADD");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.loging.token);

  useEffect(() => {
    if (!courseid) {
      setEdit(false);
      setBtn("ADD");
    } else {
      setEdit(true);
      setBtn("SAVE");
      axios
        .get("http://localhost:5000/course/getcourse?id=" + courseid, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((res) => {
          //console.log(res.data._id);
          // console.log(res.data.name);
          if (res.data.auth === false) {
            setError("You Are not Authorized to get course !");
            // setIsUploaded(false);
            setTimeout(() => {
              dispatch(logout());
            }, 1000);
          } else if (res.data.fetch === false) {
            setError("No matching course found ! redirecting to");
            //setIsUploaded(false);
            history.replace("/faculties");
          } else setcourseNameHandler(res.data.coursename);
          setcourseIDHandler(res.data.courseID);
          setcourseInchangerHandler(res.data.courseIncharge);
          setcourseDurationHandler(res.data.courseDuration);
          setcourseYearHandler(res.data.courseYear);
          setsemesterHandler(res.data.semester);
        })
        .catch((er) => {
          console.log("error in data coming");
        });
    }
  }, []);

  const history = useHistory();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!courseName.trim()) {
      setError("invaild coursename!! ");

      return;
    } else if (courseID.trim().length < 8) {
      setError("please enter 8 digit courseID!!!");
      return;
    } else if (courseID.trim().length > 8) {
      setError(
        "please enter 8 digit courseID!!! don't enter greater than 8 digit"
      );
      return;
    }
    const coursedata = {
      _id: courseid ? courseid : null,
      courseID: courseID,
      coursename: courseName,
      courseIncharge: courseIncharge,
      courseDuration: courseDuration,
      courseYear: courseYear,
      semester: semester,
      modules: [],
    };

    if (!courseid) {
      setBtn("ADD..");
      axios
        .post("http://localhost:5000/course/addcourse", {
          data: coursedata,
          facultyID: facultyID,
          headers: { Authorization: "lmsvalidation " + token },
        })

        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(true);
            history.replace("/faculties");
          }, 2200);
          //history.replace("/faculties");
          // setBtn("Saved")
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      setBtn("SAVE..");
      axios
        .put("http://localhost:5000/course/Updatecourse", coursedata, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((res) => {
          // history.replace("/faculties");
          if (res.data.auth === false) {
            setError("You Are not Authorized to update course !");
            // setIsUploaded(false);
            setTimeout(() => {
              dispatch(logout());
            }, 300);
          } else if (res.data.uploaded === true) {
            // history.replace("/faculties");
            setSuccess(true);
            setTimeout(() => {
              setSuccess(true);
              history.replace("/faculties");
            }, 2200);
          } else if (res.data.uploaded === false) {
            //setIsUploaded(false);
            // history.replace("/faculties");
            setError("You Are nothing to Update, make changes!");
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const [courseName, setcourseNameHandler] = useState();
  const [courseID, setcourseIDHandler] = useState();
  const [courseIncharge, setcourseInchangerHandler] = useState();
  const [courseDuration, setcourseDurationHandler] = useState();
  const [courseYear, setcourseYearHandler] = useState();
  const [semester, setsemesterHandler] = useState();
  const clickedHandler = (event) => {
    setError(null);
  };
  const courseNameHandler = (event) => {
    setcourseNameHandler(event.target.value);
  };
  const courseIDHandler = (event) => {
    setcourseIDHandler(event.target.value);
  };
  const courseInchargeHandler = (event) => {
    setcourseInchangerHandler(event.target.value);
  };
  const courseDurationHandler = (event) => {
    setcourseDurationHandler(event.target.value);
  };
  const courseYearHandler = (event) => {
    setcourseYearHandler(event.target.value);
  };
  const semesterHandler = (event) => {
    setsemesterHandler(event.target.value);
  };
  const onRedirect = () => {
    window.location.reload();
  };
  return (
    <div className={classes.squareview}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>Add course</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={onSubmitHandler}>
        <label for="courseName" className={classes.lables}>
          course Name :
        </label>
        <br />
        <input
          type="text"
          id="courseName"
          className={classes.inputs}
          onChange={courseNameHandler}
          value={courseName}
        />

        <label for="courseID" className={classes.lables}>
          course ID :
        </label>
        <br />
        <input
          type="text"
          id="courseID"
          className={classes.inputs}
          onChange={courseIDHandler}
          value={courseID}
        />

        <label for="couseDuration" className={classes.lables}>
          course Incharge :
        </label>
        <br />
        <select
          id="couseIncharge"
          name="couseIncharge"
          className={classes.inputs1}
          value={courseIncharge}
          onChange={courseInchargeHandler}
        >
          <option selected="true" value="" hidden></option>
          <option value="DR.Kamal">DR.Kamal</option>
          <option value="prof.Nirupa">Prof.Nirupa</option>
          <option value="DR.Kumara">DR.Kumara</option>
          <option value="DR.jayatha">Prof.Nimal</option>
        </select>

        <label for="company" className={classes.lables}>
          Course duration :
        </label>
        <select
          id="courseDuration"
          className={classes.inputs1}
          onChange={courseDurationHandler}
          value={courseDuration}
          name="Number of Year"
        >
          <option selected="true" value="" hidden></option>
          <option value="1440">1440 hours</option>
          <option value="960">960 hours</option>
          <option value="640">640 hours</option>
          <option value="360">360 hours</option>
          <option value="260">260 hours</option>
        </select>

        <label for="company" className={classes.lables}>
          Number of Year in course :
        </label>
        <select
          id="couseYear"
          className={classes.inputs1}
          onChange={courseYearHandler}
          value={courseYear}
          name="NumberofYear"
        >
          <option selected="true" value="" hidden></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <label for="company" className={classes.lables}>
          semester in course :
        </label>
        <select
          id="semester"
          className={classes.inputs1}
          onChange={semesterHandler}
          value={semester}
          name="Numberofsemster"
        >
          <option selected="true" value="" hidden></option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default Addcourse;
