import { NavLink } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import classes from "./Nav.module.css";
import profile1 from "../../Assets/profile1.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Nav = () => {
  const isLogedIn = useSelector((state) => state.loging.isLogedIn);
  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);

  const [dp, setDp] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/dp?ID=" + userID, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        setDp(res.data.dp);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

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
                  to="/my-courses"
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
      {isLogedIn && (
        <div>
          <a href={"/my-profile"}>
            <img className={classes.profile} src={dp ? dp : profile1} />
          </a>
        </div>
      )}
    </div>
  );
};
export default Nav;
