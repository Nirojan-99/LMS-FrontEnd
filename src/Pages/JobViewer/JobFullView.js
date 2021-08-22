import classes from "./JobFullView.module.css"
import jobimg from "../../Assets/job.jpg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const JobFullView=(props)=>{

  const [job,setJob] = useState({})
  const [loaded,setLoaded] = useState(false)

  let id = props.match.params.jobId;

  useEffect(() => {
    axios
      .get("http://localhost:5000/get_job?id="+id)
      .then((res) => {
        setJob(res.data)
        setLoaded(true)
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);


    return(<> {loaded ? <div className={classes.card}>
        <img src={jobimg} className={classes.jobPoster}></img>
        <div className={classes.jobname}>{job.name}</div>
        <div className={classes.companyname}>{job.companyName}</div>
        <div className={classes.description}>
          {job.jobDetails}
        </div>
       
      </div> : <div className={classes.loading}>Loading...</div>}</>);
}

export default JobFullView