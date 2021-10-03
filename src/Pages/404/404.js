import classes from "./page.module.css";

const page404 = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>404</div>
      <div className={classes.sub}>
        <span className={classes.oops}>
          Oops<span className={classes.ani}>!{" "}</span>
        </span>{" "}
        page not found.
      </div>
    </div>
  );
};

export default page404;
