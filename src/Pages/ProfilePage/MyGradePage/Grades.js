import classes from "./Grades.Module.css";

const Grades = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.id}</div>
        <div>{props.data.access}</div>
      </div>
    </>
  );
};
export default Grades;