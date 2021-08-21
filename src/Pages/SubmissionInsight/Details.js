import classes from "./Details.module.css";

const Details = (props) => {
  return (
    <>
      <div className={classes.container}>
        <div>{props.data.id}</div>
        <a className={classes.link} href={"../../files/"+props.file}><div>{props.data.file}</div></a>
        <div>{props.data.time}</div>
        <div className={classes.status}>{props.data.status}</div>
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default Details;
