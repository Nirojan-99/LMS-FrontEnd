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
  const type = useSelector((state) => state.loging.type);

  const [onDelete, setOnDelete] = useState(false);

  const clickH = (id) => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const deleteMaterial = () => {
    axios
      .delete("http://localhost:5000/library/delete_book?id=" + props.row._id)
      .then((res) => {
        if (res.data.ack === true) {
          setOnDelete((state) => !state);
          window.location.reload();
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
      <img src={props.row.bookPoster} className={classes.jobPoster}></img>
      <div className={classes.jobname}>{props.row.name}</div>
      <div className={classes.companyname}>{props.row.author}</div>
      <div className={classes.description}>
        {props.row.bookDetails.substring(0, 200) + "..."}
      </div>
      {type === "student" && (
        <div>
          <a href={props.row.book} className={classes.viewMore}>
            DOWNLOAD
          </a>
        </div>
      )}

      {type === "admin" && (
        <div className={classes.icon_container}>
          <a href={"/services/book/" + props.row._id}>EDIT</a>
          <a
            onClick={() => {
              clickH(props.row._id);
            }}
          >
            DELETE
          </a>
        </div>
      )}
    </div>
  );
};

export default BookCardView;
