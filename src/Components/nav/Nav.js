import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import classes from "./Nav.module.css";

const Nav = () => {
  const isLogedIn = useSelector((state) => state.loging.isLogedIn);

  return (
    <nav className={classes.navi}>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={classes.links}
            activeClassName={classes.activelink}
          >
            Dashboard
          </NavLink>
        </li>
        {!isLogedIn && (
          <li>
            <NavLink
              to="/contact-us"
              className={classes.links}
              activeClassName={classes.activelink}
            >
              Contact Us
            </NavLink>
          </li>
        )}
        {!isLogedIn && (
          <>
            <li>
              <NavLink
                to="/faculties"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                Faculties
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-courses/it2020"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                My Courses
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Nav;
