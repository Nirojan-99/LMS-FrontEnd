import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import classes from "./Nav.module.css";
import profile1 from "../../Assets/profile1.png";

const Nav = () => {
  const isLogedIn = useSelector((state) => state.loging.isLogedIn);
  const userID = useSelector((state) => state.loging.userID);

  return (
    <div className={classes.container}>
      <nav className={classes.navi}>
        <ul>
          <li>
            {isLogedIn && (
              <NavLink
                to="/dashboard"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                Dashboard
              </NavLink>
            )}
          </li>
          {!isLogedIn && (
            <li>
              <NavLink
                to="/index"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                Log in
              </NavLink>
            </li>
          )}
          {
            <li>
              <NavLink
                to="/contact-us"
                className={classes.links}
                activeClassName={classes.activelink}
              >
                Contact Us
              </NavLink>
            </li>
          }
          {isLogedIn && (
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
      {isLogedIn && <div>
        <a href={"/my-profile/"+userID}>
          <img className={classes.profile} src={profile1} />
        </a>
      </div>}
    </div>
  );
};
export default Nav;
