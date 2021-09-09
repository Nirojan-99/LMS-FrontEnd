import classes from "./EventSummary.module.css";
import Row from "./Row";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";

const EventSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const [events, setevents] = useState([]);
  const [error, SetError] = useState(null);
  const [updatedEvents, setupdatedEvents] = useState([]);

  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);

  const dispatch = useDispatch();
  const clickedHandler = () => {
    SetError(null);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/event/get_events?userID=" + userID,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((resp) => {
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.available === false) {
          setLoaded(true);
        } else {
          setevents(resp.data);
          setLoaded(true);
        }
      })
      .catch((er) => {
        setLoaded(true);
        SetError("Some Error occured! try again.");
      });
  }, []);

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <h2 className={classes.title}>Summary of Events</h2>
      <hr className={classes.line}></hr>
      {loaded === true ? (
        events.map((col) => {
          return <Row data={col} />;
        })
      ) : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      <div className={classes.new}>
        <a className={classes.new} href={"/new_calendar"}>
          create new
        </a>
      </div>
    </div>
  );
};

export default EventSummary;
