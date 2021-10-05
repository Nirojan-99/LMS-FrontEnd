import classes from "./Details.module.css";

const Details = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.ID}</div>
        <div>{props.data.name}</div>
        <div>{props.data.type}</div>
        <div>{props.data.faculty}</div>
        {/* <div>{props.data.email}</div> */}
      </div>
      {/* <hr className={classes.line}></hr> */}
    </>
  );
};
export default Details;
