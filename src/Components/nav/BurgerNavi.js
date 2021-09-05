import { IoMdMenu , IoIosClose} from "react-icons/io";
import React from "react";
import classes from "./Nav.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const BurgerNavi = (props) => {
  const [clicked, setClicked] = useState(false);

  const onclickHandler = () => {
    setClicked((event) => !event);
  };
  return (
    <>
      { !clicked && <IoMdMenu className={classes.max} onClick={onclickHandler} />}
      {clicked && <IoIosClose className={classes.max} onClick={onclickHandler} />}
      {clicked && (
        <div className={classes.modal}>
          <NavLink
            to="/dashboard"
            className={classes.burger__link}
            onClick={onclickHandler}
          >
            Dashboard
          </NavLink>
          <NavLink
              to="/contact-us"
              className={classes.burger__link}
              onClick={onclickHandler}
            >
              Contact Us
            </NavLink>
            <NavLink
                to="/faculties"
                className={classes.burger__link}
                onClick={onclickHandler}
              >
                Faculties
              </NavLink>
              <NavLink
                to="/services"
                className={classes.burger__link}
                onClick={onclickHandler}
              >
                Services
              </NavLink>
              <NavLink
                to="/my-courses/s"
                className={classes.burger__link}
                onClick={onclickHandler}
              >
                My Courses
              </NavLink>
              <NavLink
                to="/my-profile/s"
                className={classes.burger__link}
                onClick={onclickHandler}
              >
                My Profile
              </NavLink>
        </div>
      )}
    </>
  );
};

export default BurgerNavi;
