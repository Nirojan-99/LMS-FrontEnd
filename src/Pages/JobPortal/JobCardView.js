import classes from "./JobCardView.module.css";
import jobimg from "../../Assets/job.jpg";
import edit from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";

const JobCardView = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);

  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");
  const [isCompleted, setIsCompleted] = useState(true);

  const clickH = (id) => {
    setOnDelete((state) => !state);
    setOnDeleteID(id);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const clickedHandler = () => {
    setIsCompleted(true);
  };

  const deleteMaterial = () => {
    axios
      .delete("http://localhost:5000/delete_job?id=" + deleteID, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setTimeout(() => {
            dispatch(logout());
          }, 300);
          setOnDelete(false);
        } else if (res.data.deleted === false) {
          setIsCompleted(false);
          setOnDelete(false);
        } else {
          setOnDelete((state) => !state);
          window.location.reload();
          history.replace("./job_portal");
        }
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
      {!isCompleted && (
        <ErrorPopup
          clickedHandler={clickedHandler}
          error={"Unable to delete !"}
        />
      )}
      <img src={props.row.jobPoster} className={classes.jobPoster}></img>
      <div className={classes.jobname}>{props.row.name}</div>
      <div className={classes.companyname}>{props.row.companyName}</div>
      <div className={classes.description}>{props.row.jobDetails.substring(0, 200)+"..." }</div>
      {type === "student" && (
        <div>
          <a
            href={`/services/job/` + props.row._id}
            className={classes.viewMore}
          >
            VIEW MORE
          </a>
        </div>
      )}

      {type === "admin" && (
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
      )}
    </div>
  );
};

export default JobCardView;
