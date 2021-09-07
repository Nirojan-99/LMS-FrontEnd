import classes from "./AddForum.module.css";

const AddForum = () => {
  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>ADD DISCUSSION FORUM</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer}>
        <label for="discussForum" className={classes.lables}>
          Add Discussion :
        </label>
        <br />
        <textarea
          id="discussForum"
          name="discussForum"
          className={classes.textarea}
        ></textarea>

        <label for="faculty" className={classes.lables}>
          Visibility to the Student
        </label>
        <br />
        <input type="radio" name="visibility" id="visible" value="visible" className={classes.radio}></input>
        <label className={classes.radioLabel}>Visible</label>
        <br />
        <input type="radio" name="visibility" id="invisible" value="invisible" className={classes.radio}></input>
        <label className={classes.radioLabel}>Invisible</label>
        <br />

        <div className={classes.inline}>
          <button className={classes.btnUpdate}>ADD FORUM</button>
          <button className={classes.btnCancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
