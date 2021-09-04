import classes from "./Addcourse.module.css";
const Addcourse = () => {
  return (
    <div className={classes.squareview}>
      <h2 className={classes.title}>Add course</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer}>
        <label for="name" className={classes.lables}>
          course Name:
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="courseName"
          className={classes.inputs}
        />

        <label for="company" className={classes.lables}>
          course ID:{" "}
        </label>
        <br />
        <input
          type="text"
          id="courseID"
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

        <label for="company" className={classes.lables}>
          course Duration :
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
export default Addcourse;
