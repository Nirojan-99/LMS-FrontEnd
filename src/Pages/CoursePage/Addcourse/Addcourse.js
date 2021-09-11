import classes from "./Addcourse.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
const Addcourse = (props) => {
  const facultyID = props.match.params.facultyID;
  const courseid = props.match.params.courseid;

  console.log(courseid);

  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("ADD");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseid) {
      setEdit(false);
      setBtn("ADD..");
    } else {
      setEdit(true);
      setBtn("Edit");
      axios
        .post("http://localhost:5000/course/getcourse", { id: courseid })
        .then((res) => {
          console.log(res.data._id);
          // console.log(res.data.name);

          setcourseNameHandler(res.data.coursename);
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
    }
    else if (courseID.trim().length > 8) {
      setError("please enter 8 digit courseID!!! don't enter greater than 8 digit");
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
      modules:[],
    };

    if (!courseid) {
      axios
        .post("http://localhost:5000/course/addcourse", {
          data: coursedata,
          facultyID: facultyID,
        })
        .then((res) => {
  
          history.replace("/faculties");
          // setBtn("Saved")
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post("http://localhost:5000/course/Updatecourse", coursedata)
        .then((res) => {
     
          history.replace("/faculties");
          // setBtn("Saved")
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

  return (
    <div className={classes.squareview}>
       {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
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
