import classes from "./StudentPortal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const GPA = (props) => {
  return (
    <div>
      <div className={classes.head}>
        Year <span className={classes.data}>{props.row.year}</span> Semester{" "}
        <span className={classes.data}>{props.row.semester}</span>
      </div>
      <div className={classes.details}></div>
      <form>
        <div className={classes.gpa_container}>
          <div>
            <span>{props.row.status}</span>
          </div>
          <div>
            <span>{props.row.GPA}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GPA;