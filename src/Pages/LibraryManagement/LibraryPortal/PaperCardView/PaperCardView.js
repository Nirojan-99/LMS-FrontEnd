import classes from "./PaperCardView.module.css";
import edit from "../../../../Assets/edit.svg";
import deleteIcon from "../../../../Assets/delete.svg";
import downloadIcon from "../../../../Assets/download.svg";
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

  return (
    <div className={classes.card}>
      {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
      <div className={classes.jobname}>{props.row.title}</div>
      <div></div>

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
      {type === "student" && (
        <div className={classes.icon_container}>
          <a href={`/book_save`}>
            <img src={downloadIcon} className={classes.icons} />
          </a>
        </div>
      )}
    </div>
  );
};

export default BookCardView;
