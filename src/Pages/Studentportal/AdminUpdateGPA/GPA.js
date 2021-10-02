import classes from "./UpdateGPA.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const GPA = (props) => {
  const [GPANum, setGPA] = useState();
  const [Gstatus, setStatus] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setGPA(props.row.GPA !== "null" ? props.row.GPA : null);
    setStatus(props.row.status !== "null" ? props.row.status : null);
  }, []);

  const updateHandler = (event) => {
    event.preventDefault();

    if (GPANum > 4 || GPANum < 0) {
      setError("Required valid GPA number");
      return;
    } else if (!Gstatus.trim()) {
      setError("Require valid status");
      return;
    }

    const data = {
      year: props.row.year,
      semester: props.row.semester,
      status: Gstatus,
      GPA: GPANum,
      SID: props.id,
    };

    axios.post("http://localhost:5000/portal/update_GPA", data).then((res) => {
      if (res.data.created === false) {
        setError("Unable to create! retry again.");
      } else {
        window.location.reload();
      }
    });
  };
  const statushandler = (event) => {
    setStatus(event.target.value);
  };
  const GPAHandler = (event) => {
    setGPA(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <div className={classes.head}>
        Year <span className={classes.data}>{props.row.year}</span> Semester{" "}
        <span className={classes.data}>{props.row.semester}</span>
      </div>
      <div className={classes.details}></div>
      <form onSubmit={updateHandler}>
        <div className={classes.gpa_container}>
          <div>
            <select
              value={Gstatus}
              onChange={statushandler}
              required
              name="status"
              value={Gstatus}
            >
              <option selected hidden></option>
              <option value="pass">PASS</option>
              <option value="Fail">FAIL</option>
            </select>
          </div>
          <div>
            <input
              value={GPANum}
              onChange={GPAHandler}
              value={GPANum}
              required
              type="number"
              max="4"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <button className={classes.submit} type="submit" value="UPDATE">
              UPDATE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GPA;
