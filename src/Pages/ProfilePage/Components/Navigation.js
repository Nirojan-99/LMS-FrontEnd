import axios from "axios";
import { useState } from "react";
import classes from "./Navigation.module.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/auth"

const Navigation = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const logoutHandler =()=>{
    dispatch(logout())
    history.replace("/index")
  } 

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
            <li><a href="#" onClick={logoutHandler}><div>Log Out</div></a></li>
    </ul>
  );
};
export default Navigation;
