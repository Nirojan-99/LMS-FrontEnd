import classes from "./SelectMaterial.module.css";

const SelectMaterial = (props) => {
  const week = props.match.params.weekID;

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>SELECT MATERIAL</h2>
      <hr className={classes.line}></hr>
      {/* <h3 className={classes.sub_title}>Select Type</h3> */}
      <a href={"../add_file/" + week}>
        <div className={classes.selection}>File</div>
      </a>
      <a href={"../add_link/" + week}>
        <div className={classes.selection}>Link</div>
      </a>
      {/* <a href={"../add_quiz/" + week}>
        <div className={classes.selection}>Quiz</div>
      </a> */}
      <a href={"../add_attandance/" + week}>
        <div className={classes.selection}>Attandance</div>
      </a>
      <a href={"../add_notes/" + week}>
        <div className={classes.selection}>Notes/Announcement</div>
      </a>
      <a href={"../add-forum/" + week}>
        <div className={classes.selection}>Discussion Forum</div>
      </a>
      <a href={"../add_submission/" + week}>
        <div className={classes.selection}>Submission</div>
      </a>
    </div>
  );
};

export default SelectMaterial;
