import classes from "./Aside.module.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import profile1 from "../../../Assets/profile1.png";

const Aside = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);
  const type = useSelector((state) => state.loging.type);

  const [dp, setDp] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/dp?ID=" + userID, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.available !== false) {
          setDp(res.data.dp);
          setName(res.data.name);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    history.replace("/index");
  };
  return (
    <aside className={classes.aside}>
      <img src={dp ? dp : profile1} className={classes.dpimage} />
      <h3>{name}</h3>

      <ul className={classes.navitem}>
        <li>
          <a href="#" onClick={props.details}>
            <div>Details</div>
          </a>
        </li>

        {/* <li>
          <a href="#" onClick={props.grades}>
            <div>Grades</div>
          </a>
        </li> */}
        <li>
          <a href="#" onClick={props.mycourses}>
            <div>My Courses</div>
          </a>
        </li>
        {type === "admin" && (
          <li>
            <a href="/user-report">
              <div>Manage User</div>
            </a>
          </li>
        )}
        <li>
          <a href="#" onClick={logoutHandler}>
            <div>Log Out</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
