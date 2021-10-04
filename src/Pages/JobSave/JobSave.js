import classes from "./JobSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../Store/auth";
import Success from "../../Components/SuccessPopup/Success";

const JobSave = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = props.match.params.jobId;
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [btn, setBtn] = useState("SAVE");
  const [selectedFile, setSFile] = useState();
  const token = useSelector((state) => state.loging.token);

  const [jobname, setJobName] = useState();
  const [companyname, setCompanyName] = useState();
  const [jobdetails, setJobDetails] = useState();
  const [jobposter, setJobPoster] = useState();
  const [jobPoster, setJobPosterold] = useState();
  const [jobID, setJobID] = useState();
  const [isUploaded, setIsUploaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      axios
        .get("http://localhost:5000/get_job?id=" + id, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((res) => {
          if (res.data.auth === false) {
            setError("You Are not Authorized to Create Jobs !");
            setIsUploaded(false);
            setTimeout(() => {
              dispatch(logout());
            }, 300);
          } else if (res.data.fetch === false) {
            setError("No matching Job found ! redirecting to portal");
            setIsUploaded(false);
            setTimeout(() => {
              history.replace("/services/job_portal");
            }, 1300);
          } else {
            setCompanyName(res.data.companyName);
            setJobName(res.data.name);
            setJobDetails(res.data.jobDetails);
            setJobPosterold(res.data.jobPoster);
            setJobID(res.data._id);
          }
        })
        .catch((er) => {
          console.log("error");
        });
    }
  }, []);

  const onJobSubmit = (event) => {
    const job = new FormData();

    event.preventDefault();

    if (!jobname.trim() || jobname.length < 6) {
      setIsUploaded(false);
      setError("Job Name should be more longer");
      return;
    } else if (!companyname.trim() || companyname.length < 4) {
      setIsUploaded(false);
      setError("Company Name should be more longer");
      return;
    } else if (!jobdetails.trim() || jobdetails.length < 200) {
      setIsUploaded(false);
      setError("Give more details about the job");
      return;
    }

    const jobdata = {
      _id: jobID ? jobID : undefined,
      edit: edit,
      name: jobname,
      companyName: companyname,
      jobDetails: jobdetails,
      // jobPoster: jobposter,
    };

    job.append("jobPoster", jobposter);
    job.append("_id", jobID ? jobID : undefined);
    job.append("edit", edit);
    job.append("name", jobname);
    job.append("companyName", companyname);
    job.append("jobDetails", jobdetails);

    setBtn("SAVING...");
    axios
      .post("http://localhost:5000/add_job", job, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized to Create Jobs !");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 300);
        } else if (res.data.uploaded === true) {
          setSuccess(true);
        } else if (res.data.uploaded === false) {
          setError("Unable to add details, try again !");
          setIsUploaded(false);
          setBtn("SAVE");
        } else if (res.data.error === true) {
          setError("File should be in jpeg format & less than 5 Mb in size");
          setIsUploaded(false);
          setBtn("SAVE");
        }
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
    setJobPoster(event.target.files[0]);
    event.target.files[0] && setSFile(event.target.files[0].name);
  };
  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  const onRedirect = () => {
    history.replace("/services/job_portal");
  };
  return (
    <div className={classes.CardView}>
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>Add Job</h2>
      <hr className={classes.line}></hr>
      <form
        enctype="multipart/form-data"
        className={classes.formContainer}
        onSubmit={onJobSubmit}
      >
        <label htmlFor="name" className={classes.lables}>
          Job Name :
        </label>
        <br />
        <input
          required
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
          required
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
          {id && <img className={classes.posterView} src={jobPoster} />}
          Job Poster :
        </label>
        <br />

        {id && (
          <div className={classes.inputContainer}>
            <input
              // required
              onChange={jobPosterHandler}
              // value={jobposter}
              type="file"
              id="poster"
              name="companyName"
              className={classes.inputsimage}
            ></input>
            <label htmlFor="poster" className={classes.drag}>
              Drag and Drop
            </label>
          </div>
        )}
        {!id && (
          <div className={classes.inputContainer}>
            <input
              onChange={jobPosterHandler}
              required
              type="file"
              id="poster"
              name="companyName"
              className={classes.inputsimage}
            ></input>
            <label htmlFor="poster" className={classes.drag}>
              Drag and Drop
            </label>
          </div>
        )}
        {selectedFile && (
          <div className={classes.selected}>Selected File : {selectedFile}</div>
        )}
        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default JobSave;
