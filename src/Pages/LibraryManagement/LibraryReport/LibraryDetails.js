import classes from "./LibraryDetails.module.css";

const LibraryDetails = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.userId}</div>
        <div>{props.data.accessTime}</div>
      </div>

      <hr className={classes.line}></hr>
    </>
  );
};
export default LibraryDetails;
