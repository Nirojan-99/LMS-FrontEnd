import classes from "./JobSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

const JobSave = (props) => {
  const history = useHistory();

  const id = props.match.params.jobId;
  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("save");

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      axios
        .get("http://localhost:5000/get_job?id=" + id)
        .then((res) => {
          console.log(res.data);
          setCompanyName(res.data.companyName);
          setJobName(res.data.name);
          setJobDetails(res.data.jobDetails);
          setJobPosterold(res.data.jobPoster)
          setJobID(res.data._id);
        })
        .catch((er) => {
          console.log("error");
        });
    }
  }, []);

  const [jobname, setJobName] = useState();
  const [companyname, setCompanyName] = useState();
  const [jobdetails, setJobDetails] = useState();
  const [jobposter, setJobPoster] = useState();
  const [jobPoster, setJobPosterold] = useState();
  const [jobID, setJobID] = useState();

  const onJobSubmit = (event) => {

    const job = new FormData();
  
     
    event.preventDefault();

    const jobdata = {
      _id: jobID ? jobID : undefined,
      edit: edit,
      name: jobname,
      companyName: companyname,
      jobDetails: jobdetails,
      // jobPoster: jobposter,
    };

    job.append("jobPoster", jobposter);
    job.append("_id" ,jobID ? jobID : undefined)
    job.append("edit" ,edit)
    job.append("name" ,jobname)
    job.append("companyName" ,companyname)
    job.append("jobDetails" ,jobdetails)

    setBtn("Saving...")
    axios
      .post("http://localhost:5000/add_job", job)
      .then((res) => {
        console.log(res.data);
        // setBtn("Saved")
        history.replace("/services/job_portal");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const jobNameHandler = (event) => {
    setJobName(event.target.value);
  };
  const companyNameHandler = (event) => {
    setCompanyName(event.target.value);
  };
  const jobDetailsHandler = (event) => {
    setJobDetails(event.target.value);
  };
  const jobPosterHandler = (event) => {
    console.log(event.target.files[0])
    setJobPoster(event.target.files[0]);
  };

  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>Add Job</h2>
      <hr className={classes.line}></hr>
      <form enctype="multipart/form-data" className={classes.formContainer} onSubmit={onJobSubmit}>
        <label htmlFor="name" className={classes.lables}>
          Job Name :
        </label>
        <br />
        <input
          
          onChange={jobNameHandler}
          value={jobname}
          type="text"
          id="name"
          name="jobName"
          className={classes.inputs}
        ></input>

        <label htmlFor="company" className={classes.lables}>
          Company Name :
        </label>
        <br />
        <input
          
          onChange={companyNameHandler}
          value={companyname}
          type="text"
          id="company"
          name="companyName"
          className={classes.inputs}
        ></input>

        <label htmlFor="details" className={classes.lables}>
          Details :
        </label>
        <br />
        <textarea
          required
          onChange={jobDetailsHandler}
          value={jobdetails}
          id="details"
          name="details"
          className={classes.textArea}
        ></textarea>

        <label htmlFor="poster" className={classes.lables}>
        {id && <img className={classes.posterView} src={jobPoster}/>}
          Job Poster :
        </label>
        <br />
        
        {id && <input
        
        onChange={jobPosterHandler}
        // value={jobposter}
        type="file"
        id="poster"
        name="companyName"
        className={classes.inputs}
      ></input>}
      {!id && <input
        
        onChange={jobPosterHandler}
        required
        type="file"
        id="poster"
        name="companyName"
        className={classes.inputs}
      ></input>}

        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default JobSave;
