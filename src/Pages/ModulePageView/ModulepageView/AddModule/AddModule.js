import classes from "./AddModule.module.css";
const AddModule = () => {
  return (
    <div className={classes.squareview}>
      <h2 className={classes.title}>Add Module</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer}>
        <label for="name" className={classes.lables}>
          Module Name:
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="courseName"
          className={classes.inputs}
        />

        <label for="company" className={classes.lables}>
          Module Code:{" "}
        </label>
        <br />
        <input
          type="text"
          id="courseID"
          name="companyName"
          className={classes.inputs}
        />

        <label for="company" className={classes.lables}>
          Module Enrollment key :
        </label>
        <br />
        <input
          type="text"
          id="company"
          name="companyName"
          className={classes.inputs}
        />

        <label for="company" className={classes.lables}>
          Module Week Counts :
        </label>
        <br />
        <input
          type="text"
          id="company"
          name="companyName"
          className={classes.inputs}
        />
        <label for="company" className={classes.lables}>Module Lecture Incharge :</label>
        <br />
        <input
          type="text"
          id="company"
          name="companyName"
          className={classes.inputs}
        />
               <label for="company" className={classes.lables}>
          course Incharge :
        </label>
        <br />
        <input
          type="text"
          id="company"
          name="companyName"
          className={classes.inputs}
        />
        <button className={classes.save}>ADD</button>
      </form>
    </div>
  );
};
export default AddModule;
