import classes from "./Jobportal.module.css";
import JobCardView from "./JobCardView";
import React, { useState } from "react";
import plus from "../../Assets/plus.svg";
import { useEffect } from "react";
import axios from "axios";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let [data, setData] = useState(<div>loading</div>);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get_jobs")
      .then((res) => {
        setJobs(res.data);
        console.log(typeof res.data[0]);
        setLoaded(true);
        setData();
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <div className={classes.title}>JOB PORTAL</div>
      <div className={classes.jobCard}>
        {loaded ? (
          jobs.map((row) => {
            return <JobCardView row={row} key={row._id} />;
          })
        ) : (
          <div className={classes.loading}>Loading...</div>
        )}
      </div>

      {loaded && (
        <div className={classes.addJob}><a  href="/services/job_portal/add_Job">
          ADD
        </a></div>
      )}
      {/* <img src={plus} className={classes.plusIcon}/> */}
    </>
  );
};
export default JobPortal;
