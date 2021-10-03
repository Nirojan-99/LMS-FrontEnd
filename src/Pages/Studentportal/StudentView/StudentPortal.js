import classes from "./StudentPortal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GPA from "./GPA";

const StudentPortal = (props) => {
  const sid = props.match.params.SID;
  const [list, setupdateList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/portal/get_GPA?GPA=" + sid)
      .then((res) => {
        if (res.data.fetched === false) {
          setEmpty(true);
        } else {
          setupdateList(res.data.data);
          setLoaded(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className={classes.container}>
      {loaded &&
        list.length !== 0 &&
        list.map((row) => {
          return <GPA sid={sid} row={row} />;
        })}
      {isEmpty && (
        <div className={classes.nothing}>Currently no data available.</div>
      )}
      {!isEmpty && <div className={classes.btn}>
        {" "}
        <button>Print</button>
      </div>}
    </div>
  );
};

export default StudentPortal;