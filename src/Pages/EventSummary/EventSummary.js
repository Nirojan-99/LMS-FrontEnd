import classes from "./EventSummary.module.css";
import Row from "./Row";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import SearchBar from "./SearchBar";
import generatePDF from "./generatePDF";

const EventSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const [events, setevents] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [error, SetError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [updatedEvents, setupdatedEvents] = useState([]);

  const userID = useSelector((state) => state.loging.userID);
  const token = useSelector((state) => state.loging.token);

  const dispatch = useDispatch();
  const clickedHandler = () => {
    SetError(null);
  };

  //search result
  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setUpdated(events);
      return;
    }

    const updated = events.filter((row) => {
      var d1 = new Date(value);
      var d2 = new Date(row.date);
      return d1.getTime() === d2.getTime()
    });
    setUpdated(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/event/get_events?userID=" + userID, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.available === false) {
          setLoaded(true);
        } else {
          setevents(resp.data);
          setUpdated(resp.data);
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
      <div className={classes.head}>
        <SearchBar onSearch={getSearchValue} />
      </div>

      <hr className={classes.line}></hr>
      {loaded === true ? (
        updated.map((col) => {
          return <Row data={col} />;
        })
      ) : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {empty && <div className={classes.nothing}>No matching results found!</div>}
      <hr className={classes.line}></hr>
      <div className={classes.new_box}>
        <a className={classes.new} href={"/new_calendar"}>
          Create New
        </a>
        <a className={classes.report} onClick={()=>{generatePDF(events)}}>
          Generate Report
        </a>
      </div>
    </div>
  );
};

export default EventSummary;
