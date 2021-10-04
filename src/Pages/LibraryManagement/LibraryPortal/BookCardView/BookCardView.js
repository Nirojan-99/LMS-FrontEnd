import classes from "./BookCardView.module.css";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const BookCardView = (props) => {
  const history = useHistory();
  const type = useSelector((state) => state.loging.type);
  const id = useSelector((state) => state.loging.id);

  const [onDelete, setOnDelete] = useState(false);

  const clickH = (id) => {
    setOnDelete((state) => !state);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };
  const addInsight = () => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const data = {
      ID: id,
      date_time: datetime,
      bookID: props.row._id,
    };
    axios
      .post("http://localhost:5000/library/add_insight", data)
      .then((res) => {});
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
          <a
            onClick={addInsight}
            href={props.row.book}
            className={classes.viewMore}
          >
            DOWNLOAD
          </a>
        </div>
      )}

      {type === "admin" && (
        <div className={classes.icon_container}>
          <a href={"/services/digital_library/report/" + props.row._id}>INSIGHT{" "}</a>
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
