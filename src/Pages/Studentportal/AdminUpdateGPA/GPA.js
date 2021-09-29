import classes from "./UpdateGPA.module.css";

const GPA = (props) => {
  return (
    <div>
      <div className={classes.head}>
        Year <span className={classes.data}>1</span> Semester{" "}
        <span className={classes.data}>2</span>
      </div>
      <div className={classes.details}></div>
      <div className={classes.gpa_container}>
        <div>
          <select required name="status">
            <option value="pass">PASS</option>
            <option value="Fail">FAIL</option>
          </select>
        </div>
        <div>
          <input required type="number" max="4" min="0" step="0.01" />
        </div>
        <div>
          <button className={classes.submit} type="submit" value="UPDATE" >UPDATE</button>
        </div>
      </div>
    </div>
  );
};

export default GPA;
