import classes from "./Footer.module.css";
import { Fragment } from "react";
import Calendar from "../Calendar/Calendar";

const Section2 = () => {
  return (
    <div className={classes.box2}>
      <Fragment>
        <div className={classes.calendar}></div>
        <div className="container has-text-centered">
          <Calendar />
        </div>
      </Fragment>
    </div>
  );
};
export default Section2;
