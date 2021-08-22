import classes from "./JobCardView.module.css";
import jobimg from "../../Assets/job.jpg";
import edit from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const JobCardView = (props) => {

  const history = useHistory()

  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");

  const clickH = (id) => {
    setOnDelete((state) => !state);
    setOnDeleteID(id);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const deleteMaterial = () => {
    axios
      .post("http://localhost:5000/delete_job?id="+deleteID)
      .then((res) => {
        //acknogement
        setOnDelete((state) => !state);
        history.replace("./job_portal")
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <div className={classes.card}>
      {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
      <img src={jobimg} className={classes.jobPoster}></img>
      <div className={classes.jobname}>{props.row.name}</div>
      <div className={classes.companyname}>{props.row.companyName}</div>
      <div className={classes.description}>{props.row.jobDetails}</div>
      {/* <div>
          <a href={`/services/job/`+props.row._id} className={classes.viewMore}>VIEW MORE</a>
      </div> */}

      <div className={classes.icon_container}>
        <a href={`/services/job_portal/editJob/` + props.row._id}>
          <img src={edit} className={classes.icons} />
        </a>
        <a>
          <img
            src={deleteIcon}
            className={classes.icons}
            onClick={() => {
              clickH(props.row._id);
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default JobCardView;
