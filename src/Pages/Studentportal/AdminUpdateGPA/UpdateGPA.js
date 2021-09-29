import classes from "./UpdateGPA.module.css";
import GPA from "./GPA";

const UpdateGPA = (props) => {
  const sid = props.match.params.SID;
  return (
    <div className={classes.container}>
      <GPA />
      <GPA />
      <hr className={classes.line} />
      <div className={classes.new_container}>
        YEAR :{" "}
        <input
          type="number"
          max="4"
          min="1"
          step="1"
          className={classes.addnew}
        />
        SEMESTER :{" "}
        <input
          type="number"
          max="2"
          min="1"
          step="1"
          className={classes.addnew}
        />
        <button className={classes.addBTN}>ADD</button>
      </div>
    </div>
  );
};

export default UpdateGPA;
