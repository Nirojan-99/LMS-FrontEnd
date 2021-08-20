import classes from "./Jobportal.module.css";
import JobCardView from "./JobCardView";
import React from "react";
import plus from "../../Assets/plus.svg";

const JobPortal = () => {
  const jobs = [
    "s/w engineer",
    "data scientist",
    "Q/A engineer",
    "UI/UX engineer",
    "civil engineer"
  ];
  return (
    <>
      <div className={classes.title}>JOB PORTAL</div>
      <div className={classes.jobCard}>
        {jobs.map((job) => {
          return <JobCardView jobName={job} key={job} />;
        })}
        <a className={classes.addJob} href="job_portal/editJob/jobID">
          <div className={classes.clicker}>ADD</div>
          {/* <img src={plus} className={classes.plusIcon}/> */}
        </a>
      </div>
    </>
  );
};
export default JobPortal;
