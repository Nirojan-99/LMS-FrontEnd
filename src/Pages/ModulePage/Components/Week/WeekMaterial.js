import classes from "./WeekMaterial.module.css";
import pdf from "../../../../Assets/pdf.svg";
import pencil from "../../../../Assets/pencil.svg";
import insight1 from "../../../../Assets/bar-graph.svg";
import deleteI from "../../../../Assets/delete.svg";

import attandance from "../../../../Assets/attandance.svg";
import quiz from "../../../../Assets/quiz.svg";
import notes from "../../../../Assets/notes.svg";
import link from "../../../../Assets/link.svg";
import submit from "../../../../Assets/submit.svg";
import discussion from "../../../../Assets/discussion.svg";

import axios from "axios";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const WeekContainer = (props) => {
  let logo = pdf;
  let option = "";
  let edit = "";

  const userType = useSelector((state) => state.loging.type);
  const userEmail = useSelector((state) => state.loging.userMail);

  const history = useHistory();

  switch (props.data.type) {
    case "quiz":
      logo = quiz;
      edit = "./edit_quiz/";
      option = "./quiz/" + props.data._id;
      break;
    case "file":
      logo = pdf;
      edit = "./edit_file/";
      option = props.data.link;
      break;
    case "submission":
      logo = submit;
      edit = "edit_submission/";
      option = "./submission/" + props.data._id;
      break;
    case "link":
      logo = link;
      edit = "edit_link/";
      option = props.data.link;
      break;
    case "discussion":
      edit = "edit_discussion/";
      option = "./discussion/" + props.data._id;
      logo = discussion;
      break;
    case "attandance":
      edit = "edit_attandance/";
      option = "./attandance/" + props.data._id;
      logo = attandance;
      break;
    case "notes":
      option = null;
      edit = "edit_notes/";
      logo = notes;
      break;
  }
  const [onDelete, setOnDelete] = useState(false);

  const clickH = (id) => {
    setOnDelete((state) => !state);
  };

  const insightHandler = () => {
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

    const insightData = {
      student: userEmail,
      date_time: datetime,
      material_id: props.data._id,
    };

    axios
      .post("http://localhost:5000/insight/add_insight", insightData)
      .then((resp) => {})
      .catch(() => {});
  };

  const hide = () => {
    setOnDelete((state) => !state);
  };
  const deleteMaterial = (id) => {
    axios
      .post("http://localhost:5000/admin/delete_material", {
        id: props.data._id,
        week: props.week,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.error) {
          window.location.reload();
          setOnDelete((state) => !state);
        } else {
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <>
      <div className={classes.containerM}>
        <div className={classes.popup}>
          {onDelete && (
            <DeletePopup
              hide={hide}
              onDelete={() => deleteMaterial(props.data._id)}
            />
          )}
        </div>

        <span className={classes.left_items}>
          <img src={logo} className={classes.iconM} />
          <span className={classes.title}>
            <a onClick={insightHandler} href={option}>
              {props.data.title}
            </a>
          </span>
          {userType === "admin" && props.data.visibility === "invisible" && (
            <span className={classes.hidden_popup}>Hidden to Students</span>
          )}
        </span>
        {userType === "admin" && <span className={classes.right_items}>
          <span className={classes.icons}>
            <a href={"./insight/" + props.data._id}>
              <img src={insight1} className={classes.img_buttons}></img>
            </a>
            <a href={edit + props.data._id}>
              <img src={pencil} className={classes.img_buttons}></img>
            </a>
            <a
              onClick={() => {
                clickH(props.data._id);
              }}
            >
              <img src={deleteI} className={classes.img_buttons}></img>
            </a>
          </span>
          <span>
            {/* <input
              type="checkbox"
              value=""
              className={classes.check_box}
            ></input> */}
          </span>
        </span>}
      </div>
      <hr className={classes.line}></hr>
    </>
  );
};
export default WeekContainer;
