import axios from "axios";
import { useState } from "react";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  // const weeks = ["week1","week2","week3"];

  const weeks = props.weeks;
  return (
    <ul className={classes.week}>
      {weeks.map((row) => {
        return (
          <li>
            <a href={"#" + row.week} onClick={props.showWeeks}>
              <div>Week {row.week}</div>
            </a>
          </li>
        );
      })}

      <hr className={classes.line}></hr>
      <li>
        <a href="#"  onClick={props.showGrades}>
          <div>Grades</div>
        </a>
      </li>
      <li>
        <a href="#" onClick={props.showDiscussions}>
          <div>Discussion Forum</div>
        </a>
      </li>
    </ul>
  );
};
export default Navigation;
