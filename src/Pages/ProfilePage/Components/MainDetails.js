import classes from "./MainDetails.css";

const Details = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.id}</div>
        <div>{props.data.access}</div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default Details;
