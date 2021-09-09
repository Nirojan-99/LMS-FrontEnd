import classes from "./BookCardView.module.css";
import edit from "../../../../Assets/edit.svg";
import deleteIcon from "../../../../Assets/delete.svg";
import bookImg from "../../../../Assets/SampleBook.jpg";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const BookCardView = (props) => {
  const history = useHistory();
  //   const type = useSelector((state) => state.loging.type);
  const type = "student";

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
    // axios
    //   .post("http://localhost:5000/delete_job?id="+deleteID)
    //   .then((res) => {
    //     //acknogement
    //     setOnDelete((state) => !state);
    //     history.replace("./job_portal")
    //   })
    //   .catch((er) => {
    //     console.log("error");
    //   });
  };
  // src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
  return (
    <div className={classes.card}>
      {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
      <img
        src={bookImg}
        className={classes.jobPoster}
      ></img>
      <div className={classes.jobname}>{props.row.name}</div>
      <div className={classes.companyname}>{props.row.aurthor}</div>
      <div className={classes.description}>{props.row.details}</div>
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
          <a href={`/book_save`}>
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

export default BookCardView;
