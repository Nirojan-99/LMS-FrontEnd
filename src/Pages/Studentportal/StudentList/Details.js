import classes from "./StudentList.module.css";

const Details = (props) => {
  return (
    <>
      <div className={classes.details_container}>
        <div>name</div>
        <a href={"/services/student_portal/" + props._id}>Update GPA</a>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};

export default Details;
