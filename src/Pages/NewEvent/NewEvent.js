import classes from "./NewEvent.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import Success from "../../Components/SuccessPopup/Success";

const NewEvent = () => {
  const [title, setTitle] = useState();
  const [Sdate, setDate] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("SAVE");
  const userID = useSelector((state) => state.loging.userID);
  const type = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const history = useHistory();
  const dispatch = useDispatch();

  const date1 = new Date();
  const month = date1.getMonth() + 1;
  const year = date1.getFullYear();
  const currentdate1 = date1.getDate();
  const currenttimeinS = new Date(year, month, currentdate1).getTime();

  useEffect(() => {}, []);

  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
  };
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const eventSubmitHandler = (event) => {
    event.preventDefault();
    setText("SAVING..");

    const currentdate = new Date();
    const date = currentdate.getDate();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    const selecetDate = new Date(Sdate);

    if (!title.trim() || title.length < 6) {
      setError("Title should contains grater than 6 character");
      setText("SAVE");
      return;
    } else if (
      selecetDate.getFullYear() < year ||
      (selecetDate.getFullYear() === year &&
        selecetDate.getMonth() + 1 < month) ||
      (selecetDate.getMonth() + 1 === month &&
        selecetDate.getDate() < currentdate1)
    ) {
      setError("please select a valid Date");
      setText("SAVE");
      return;
    }

    const data = {
      title: title,
      date: Sdate,
      creator: userID,
      type: type,
      date_time: date + "/" + time,
    };

    axios
      .post("http://localhost:5000/event/add_event", data, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.inserted === false) {
          setError("Unable to Add new event! try again.");
          setText("SAVE");
        } else {
          setSuccess(true);
        }
      })
      .catch((er) => {
        setText("SAVE");
        setError("Some error occured! try again.");
      });
  };

  const onRedirect = () => {
    history.goBack();
  };
  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>ADD NEW EVENT</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={eventSubmitHandler} className={classes.form_container}>
        <label className={classes.labels} htmlFor={"title"}>
          Event Name
        </label>
        <input
          onChange={titleHandler}
          className={classes.inputs}
          type="text"
          required
          value={title}
        />
        <label className={classes.labels} htmlFor={"title"}>
          Event Date
        </label>
        <input
          onChange={dateHandler}
          className={classes.inputs}
          type="date"
          required
          value={Sdate}
        />
        <button className={classes.submit}>{text}</button>
      </form>
    </div>
  );
};

export default NewEvent;
