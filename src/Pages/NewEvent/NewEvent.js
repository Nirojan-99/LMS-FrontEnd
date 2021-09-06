import classes from "./NewEvent.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";

const NewEvent = () => {
  const [title, setTitle] = useState();
  const [Sdate, setDate] = useState();
  const [error, setError] = useState(null);
  const [text, setText] = useState("SAVE");
  const userID = useSelector((state) => state.loging.userID);
  const type = useSelector((state) => state.loging.type);
  const history = useHistory()

  const date1 = new Date();
  const month = date1.getMonth() + 1;
  const year = date1.getFullYear();
  const currentdate1 = date1.getDate();
  const currenttimeinS = new Date(year,month,currentdate1).getTime()

  useEffect(() => {}, []);

  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const clickedHandler=()=>{
      setError(null)
  }
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
    .post("http://localhost:5000/event/add_event", data)
    .then((resp) => {
      // console.log(resp.data);
      history.goBack()
    })
    .catch((er) => {
      console.log(er);
    });

  };
  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
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
