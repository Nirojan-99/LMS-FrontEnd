import classes from "./UpdateGPA.module.css";
import GPA from "./GPA";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const UpdateGPA = (props) => {
  const sid = props.match.params.SID;
  const [list, setupdateList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const [error, setError] = useState(null);

  const yearHandler = (event) => {
    setYear(event.target.value);
  };
  const semesterHandler = (event) => {
    setSemester(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
  };
  const submithandler = (event) => {
    event.preventDefault();

    const data = {
      SID: sid,
      year: year,
      semester: semester,
    };

    if (!year) {
      setError("Require valid year");
      return;
    } else if (!semester) {
      setError("Require valid semester");
      return;
    }

    axios.post("http://localhost:5000/portal/GPA", data).then((res) => {
      if (res.data.error) {
        setError(res.data.error);
      } else if (res.data.created === false) {
        setError("Unable to create! retry again.");
      } else {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/portal/get_GPA?GPA=" + sid)
      .then((res) => {
        console.log(res.data);
        if (res.data.fetched === false) {
          console.log("ssss");
        } else {
          setupdateList(res.data.data);
          setLoaded(true);
          console.log("dddd");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      {loaded &&
        list.map((row) => {
          return <GPA id={sid} row={row} />;
        })}
      <hr className={classes.line} />
      <form onSubmit={submithandler}>
        <div className={classes.new_container}>
          YEAR :{" "}
          <select
            value={year}
            onChange={yearHandler}
            className={classes.addnew}
            required
            name="status"
          >
            <option selected hidden></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          SEMESTER :{" "}
          <select
            value={semester}
            onChange={semesterHandler}
            className={classes.addnew}
            required
            name="status"
          >
            <option selected hidden></option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <button className={classes.addBTN}>ADD</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGPA;
