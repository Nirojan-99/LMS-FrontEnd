import axios from "axios";
import { useState } from "react";
import classes from "./Navigation.module.css";


const Navigation = () => {

 const navitems = ["Details","Grades","My Courses","Log Out"];
  return (
    <ul className={classes.navitem}>
      {navitems.map((navitemsaa) => {
        <li>
          <a href="#">
            <div key={navitemsaa}>{navitemsaa}a</div>
          </a>
        </li>
      })}
            <li><a href="#"><div>Details</div></a></li>
            <li><a href="#"><div>Grades</div></a></li>
            <li><a href="#"><div>My Courses</div></a></li>
            <li><a href="#"><div>Log Out</div></a></li>
    </ul>
  );
};
export default Navigation;
