import classes from "./LibraryDetails.module.css";

const LibraryDetails = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.id}</div>
        <div>{props.data.date_time}</div>
      </div>
    </>
  );
};
export default LibraryDetails;
