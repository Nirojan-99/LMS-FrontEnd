import classes from "./StudentList.module.css";
import Details from "./Details";

const StudenList = () => {
  return (
    <div className={classes.container}>
      <Details />
      <Details />
    </div>
  );
};

export default StudenList;
