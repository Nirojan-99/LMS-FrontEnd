import axios from "axios";
import { useState } from "react";
import classes from "./Navigation.module.css";

const Navigation = () => {
//   const [weeks, setweek] = useState([]);
//   axios
//     .get("http://localhost:5000/week")
//     .then((res) => {
//       setweek(res.data.week1);
//       // console.log(res.data.week1)
//     })
//     .catch();

  // const weekM = weeks.map((week1)=>{
  //     // <li><a href="#"><div key={week1}>{week1}</div></a></li>
  //     // console.log(week1)
  // })
const weeks = ["week1","week2","week3"];
  return (
    <ul className={classes.week}>
      {weeks.map((weeksa) => {
        <li>
          <a href="#">
            <div key={weeksa}>{weeksa}a</div>
          </a>
        </li>
      })}

      <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
            <li><a href="#"><div>Week 1</div></a></li>
      <hr className={classes.line}></hr>
      <li>
        <a href="#">
          <div>Notes</div>
        </a>
      </li>
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
