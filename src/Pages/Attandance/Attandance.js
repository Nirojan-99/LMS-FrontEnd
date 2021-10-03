import classes from "./Attandance.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import insight1 from "../../Assets/bar-graph.svg";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../Store/auth";

const Attandance = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [marked, setMarked] = useState(false);
  const [error, seterror] = useState(null);
  const attandanceID = props.match.params.ID;

  const userName = useSelector((state) => state.loging.userName);
  const userID = useSelector((state) => state.loging.userID);
  const type = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/attandance/check_attandance?studentID=" +
          userID +
          "&attandanceID=" +
          attandanceID,

        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          dispatch(logout());
        } else if (res.data.avalilable === true) {
          setMarked(true);
        } else if (res.data.valid === false) {
          seterror("No Such data available!");
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
      })
      .catch((er) => {
        seterror("Some error occured! try again.");
      });
  }, []);

  const clickedHandler = () => {
    seterror(null);
  };

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
        .post(
          "http://localhost:5000/attandance/mark_attandance",
          {
            studentID: userID,
            studentName: userName,
            date_time: datetime,
            attandanceID: attandanceID,
          },
          {
            headers: { Authorization: "lmsvalidation " + token },
          }
        )
        .then((res) => {
          if (res.data.auth === false) {
            dispatch(logout());
          } else if (res.data.updated === false) {
            seterror("unable to mark attandance! try again");
          } else {
            setMarked(true);
          }
        })
        .catch((er) => {
          seterror("Some error occured! try again");
        });
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <div className={classes.head_container}>
        <h2 className={classes.title}>Attandance</h2>
        {type === "admin" && (
          <a href={"./insights/" + attandanceID}>
            <img className={classes.iconM} src={insight1} />
          </a>
        )}
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
