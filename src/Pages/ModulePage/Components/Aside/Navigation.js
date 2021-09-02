import axios from "axios";
import { useState } from "react";
import classes from "./Navigation.module.css";

const Navigation = (props) => {

// const weeks = ["week1","week2","week3"];

const weeks = props.weeks;
  return (
    <ul className={classes.week}>
      {weeks.map((weeksa) => {
        <li>
          <a href="#">
            <div key={weeksa}>{weeksa}a</div>
          </a>
        </li>
      })}

      {weeks.map((row)=>{
        return<li><a href={"#"+row.week}><div>Week {row.week}</div></a></li>
      })}

      {/* <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#1"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li> */}
      <hr className={classes.line}></hr>
      {/* <li>
        <a href="#">
          <a href="../../notes"><div>Notes</div></a>
        </a>
      </li> */}
      <li>
        <a href="#">
          <div>Grades</div>
        </a>
      </li>
      <li>
        <a href="#">
          <div>Discussion Forum</div>
        </a>
      </li>
    </ul>
  );
};
export default Navigation;
