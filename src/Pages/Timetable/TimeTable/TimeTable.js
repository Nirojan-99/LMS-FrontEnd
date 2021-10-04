import classes from "./timetable.module.css";
import Row from "./Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const type = useSelector((state) => state.loging.type);

  useEffect(() => {
    axios
      .get("http://localhost:5000/timetable/get_timetables")
      .then((res) => {
        if (res.data.fetch === false) {
        } else {
          setLoaded(true);
          setTimetables(res.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.head}>TIMETABLES</div>
      {loaded &&
        timetables.map((row) => {
          return <Row data={row} />;
        })}
      {loaded && timetables.length === 0 && (
        <div className={classes.nothing}>No data available!</div>
      )}
      {type === "admin" && (
        <div className={classes.addnew}>
          <a href={"/services/timetable/new"}>ADD NEW</a>
        </div>
      )}
    </div>
  );
};

export default Timetable;
