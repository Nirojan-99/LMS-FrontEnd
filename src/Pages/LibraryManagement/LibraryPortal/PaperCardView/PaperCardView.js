import classes from "./PaperCardView.module.css";
import edit from "../../../../Assets/edit.svg";
import deleteIcon from "../../../../Assets/delete.svg";
import downloadIcon from "../../../../Assets/download.svg";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BookCardView = (props) => {
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
      .delete("http://localhost:5000/library/delete_paper?id=" + props.row._id)
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
      <div className={classes.jobname}>{props.row.name}</div>
      <div></div>

      {type === "admin" && (
        <div className={classes.icon_container}>
          <a href={"/services/paper/" + props.row._id}>
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
          <a href={props.row.paperLink}>
            <img src={downloadIcon} className={classes.icons} />
          </a>
        </div>
      )}
    </div>
  );
};

export default BookCardView;
