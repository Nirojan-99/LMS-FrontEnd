import classes from "./Details.module.css" 

const Details = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.id}</div>
        <div>{props.data.FirstAccess}</div>
        <div>{props.data.LastAccess}</div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default Details;