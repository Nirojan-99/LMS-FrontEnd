import classes from "./EventSummary.module.css";
import Row from "./Row";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader"
import { useSelector } from "react-redux";

const EventSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const [events, setevents] = useState([]);
  const [updatedEvents, setupdatedEvents] = useState([]);

  const userID = useSelector((state) => state.loging.userID);

  // const[clickedDelete,setclickedDelete] = useState(false)

  useEffect(()=>{
    axios
    .post("http://localhost:5000/event/get_events", {userID:userID})
    .then((resp) => {
      setevents(resp.data)
      setLoaded(true)
      console.log(resp.data)
    })
    .catch((er) => {
      console.log(er);
    });

  },[])


  return (
    <div className={classes.container}>
      
      <h2 className={classes.title}>Summary of Events</h2>
      <hr className={classes.line}></hr>
      {loaded === true ?events.map((col)=>{
        return(<Row data={col}/>)
      }):<div className={classes.loader}><Loader/></div>}
      <div className={classes.new}><a className={classes.new} href={"/new_calendar"}>create new</a></div>
    </div>
  );
};

export default EventSummary;
