import classes from "./JobFullView.module.css";
import jobimg from "../../Assets/job.jpg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../Store/auth";

const JobFullView = (props) => {
  const [job, setJob] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("Loading...");
  const token = useSelector((state) => state.loging.token);

  let id = props.match.params.jobId;

  useEffect(() => {
    axios
      .get("http://localhost:5000/get_job?id=" + id, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.fetch === false) {
          setText("No Jobs Found !")
        } else {
          setJob(res.data);
          setLoaded(true);
        }
      })
      .catch((er) => {
        setText("check your network connection")
      });
  }, []);

  return (
    <>
      {" "}
      {loaded ? (
        <div className={classes.card}>
          <img src={job.jobPoster} className={classes.jobPoster}></img>
          <div className={classes.jobname}>{job.name}</div>
          <div className={classes.companyname}>{job.companyName}</div>
          <div className={classes.description}>{job.jobDetails}</div>
        </div>
      ) : (
        <div className={classes.loading}>{text}</div>
      )}
    </>
  );
};

export default JobFullView;
