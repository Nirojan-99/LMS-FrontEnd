import classes from "./StudentList.module.css";

const Details = (props) => {
  return (
    <>
      <div className={classes.details_container}>
        <div className={classes.name}>{props.row.ID}</div>
        <a className={classes.btn} href={"/services/student_portal/" + props.row._id}>Update GPA</a>
      </div>
    </>
  );
};

export default Details;
