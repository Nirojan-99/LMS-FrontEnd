import classes from "./Jobportal.module.css";
import JobCardView from "./JobCardView";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const type = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/get_jobs", {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.error) {
          setErrorMsg("no jobs available");
          setError(true);
          setLoaded(true);
        } else if (res.data.auth === false) {
          dispatch(logout());
        } else {
          setJobs(res.data);
          console.log(typeof res.data[0]);
          setLoaded(true);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const hideError = () => {
    setError(false);
  };

  return (
    <>
      {isError && <ErrorPopup error={errorMsg} clickedHandler={hideError} />}
      <div className={classes.title}>JOB PORTAL</div>
      <div className={classes.jobCard}>
        {loaded ? (
          jobs.map((row) => {
            return <JobCardView row={row} key={row._id} />;
          })
        ) : (
          <Loader></Loader>
        )}
      </div>

      {type === "admin" && loaded && (
        <div className={classes.addJob}>
          <a href="/services/job_portal/add_Job">ADD NEW</a>
        </div>
      )}
    </>
  );
};
export default JobPortal;
