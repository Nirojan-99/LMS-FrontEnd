import classes from "./StudentPortal.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GPA from "./GPA";
import generatePDF from "./GeneratePDF";
import { useSelector, useDispatch } from "react-redux";

const StudentPortal = (props) => {
  const sid = props.match.params.SID;
  const [list, setupdateList] = useState([]);
  const [student, setStudent] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  const token = useSelector((state) => state.loging.token);

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

    axios
      .get("http://localhost:5000/userManagement/edit_user?id=" + sid, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data) {
          setStudent(res.data)
        }
      });
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
      {!isEmpty && (
        <div className={classes.btn}>
          {" "}
          <button
            onClick={() => {
              generatePDF(list, sid,student);
            }}
          >
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
