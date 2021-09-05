import classes from "./Attandance.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import insight1 from "../../Assets/bar-graph.svg";

const Attandance = (props) => {
  const history = useHistory();
  const [marked, setMarked] = useState();
  const attandanceID = props.match.params.ID;

  const userName = useSelector((state) => state.loging.userName);
  const userID = useSelector((state) => state.loging.userID);
  const type = useSelector((state) => state.loging.type);

  useEffect(() => {
    axios
      .post("http://localhost:5000/attandance/check_attandance", {
        studentID: userID,
        attandanceID: attandanceID,
      })
      .then((res) => {
        console.log(res);
        if (res.data.avalilable === true) {
          setMarked(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const ID = props.match.params.ID;

  const onMarkAttandance = () => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    if (!marked) {
      axios
        .post("http://localhost:5000/attandance/mark_attandance", {
          studentID: userID,
          studentName: userName,
          date_time: datetime,
          attandanceID: attandanceID,
        })
        .then((res) => {
          setMarked(true);
        })
        .catch((er) => {
          console.log("error");
        });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.head_container}>
        <h2 className={classes.title}>Attandance</h2>
        {type === "admin" && <a href={"./insights/" + attandanceID}>
          <img className={classes.iconM} src={insight1} />
        </a>}
      </div>
      <hr className={classes.line}></hr>
      <div className={classes.box}>
        <label className={classes.labels} htmlFor="mark">
          Click to Mark Attandance
        </label>
        <input
          checked={marked === true}
          id="mark"
          className={classes.check}
          onChange={onMarkAttandance}
          type="checkbox"
        ></input>
      </div>
    </div>
  );
};

export default Attandance;
