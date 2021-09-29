import classes from "./AddSubmission.module.css";
import insight1 from "../../../Assets/bar-graph.svg";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";

const AddSubmission = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const week = props.match.params.weekID;
  const material = props.match.params.MaterialID;
  const token = useSelector((state) => state.loging.token);

  const date1 = new Date();
  const month = date1.getMonth() + 1;
  const year = date1.getFullYear();
  const currentdate1 = date1.getDate();

  useEffect(() => {
    if (material) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + material,
          {
            headers: { Authorization: "lmsvalidation " + token },
          }
        )
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.fetch === false) {
            setError("No matching data found!");
            setTimeout(() => {
              history.goBack();
            }, 1300);
          } else {
            setVisibility(resp.data.visibility);
            setTitle(resp.data.title);
            setDate(resp.data.deadlineDate);
            setTime(resp.data.deadlineTime);
            setSize(resp.data.maxSize);
          }
        })
        .catch(() => {
          setError("Some error occured! try again");
        });
    }
  }, []);

  const [visibleRef, setVisibility] = useState();
  const [title, setTitle] = useState();
  const [Sdate, setDate] = useState();
  const [Stime, setTime] = useState();
  const [size, setSize] = useState();
  const [text, setText] = useState("SAVE");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const titlehandler = (event) => {
    setTitle(event.target.value);
  };
  const deadLineHandler = (event) => {
    setDate(event.target.value);
  };
  const deadlinetimehandler = (event) => {
    setTime(event.target.value);
  };
  const maxSizehandler = (event) => {
    setSize(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
    // window.location.reload();
  };

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onSubmitted = (e) => {
    e.preventDefault();
    setText("SAVING..");

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

    const selecetDate = new Date(Sdate);

    if (!title.trim()) {
      setError("please input a valid title");
      setText("SAVE");
      return;
    } else if (
      selecetDate.getFullYear() < year ||
      (selecetDate.getFullYear() === year &&
        selecetDate.getMonth() + 1 < month) ||
      (selecetDate.getMonth() + 1 === month &&
        selecetDate.getDate() < currentdate1)
    ) {
      setError("please select a valid Date");
      setText("SAVE");
      return;
    } else if (size > 20 || size < 1) {
      setError("Maximum Size should non negative and less than 20");
      setText("SAVE");
      return;
    }

    const submissionData = {
      _id: material ? material : undefined,
      title: title,
      deadlineDate: Sdate,
      deadlineTime: Stime,
      maxSize: size,
      visibility: visibleRef,
      type: "submission",
      date_time: datetime,
      week: week,
    };

    if (!error) {
      if (!material) {
        axios
          .post("http://localhost:5000/admin/add_submission", submissionData, {
            headers: { Authorization: "lmsvalidation " + token },
          })
          .then((resp) => {
            if (resp.data.auth === false) {
              dispatch(logout());
            } else if (resp.data.updated === false) {
              setError("Unable to add data! try again.");
              setText("SAVE");
            } else {
              setSuccess(true);
            }
          })
          .catch((er) => {
            console.log(er);
          });
      } else {
        axios
          .post("http://localhost:5000/admin/edit_submission", submissionData, {
            headers: { Authorization: "lmsvalidation " + token },
          })
          .then((resp) => {
            if (resp.data.auth === false) {
              dispatch(logout);
            } else if (resp.data.updated === false) {
              setError("Unable to update! try again.");
              setText("SAVE");
            } else {
              setSuccess(true);
            }
          })
          .catch(() => {
            setError("Some error occured! try again.");
          });
      }
    }
  };

  const onRedirect = () => {
    if (material) {
      history.goBack()
    } else {
      axios
        .get("http://localhost:5000/admin/get_module?week=" + week)
        .then((res) => {
          history.replace("/my-courses/" + res.data[0].module);
        });
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <div className={classes.title_div}>
        <h2 className={classes.title}>ADD SUBMISSION</h2>
        {material && (
          <a href={"../../submisson_insight/" + material}>
            <img src={insight1} className={classes.iconM} />
          </a>
        )}
      </div>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label htmlFor="title" className={classes.labels}>
          Title
        </label>
        <input
        placeholder="title"
          value={title}
          onChange={titlehandler}
          required
          className={classes.inputs}
          id="title"
          name="title"
          type="text"
        ></input>

        <label htmlFor="date" className={classes.labels}>
          Deadline Date
        </label>
        <input
          value={Sdate}
          onChange={deadLineHandler}
          required
          className={classes.inputs}
          id="date"
          name="date"
          type="date"
        ></input>

        <label htmlFor="time" className={classes.labels}>
          Deadline Time
        </label>
        <input
          value={Stime}
          onChange={deadlinetimehandler}
          required
          className={classes.inputs}
          name="time"
          id="time"
          type="time"
        ></input>

        <label htmlFor="size" className={classes.labels}>
          Maximum Size
        </label>
        <input
          value={size}
          onChange={maxSizehandler}
          required
          min="1"
          step="0.5"
          max="20"
          className={classes.inputs}
          name="size"
          id="size"
          type="number"
          placeholder="size in Mb"
        ></input>

        <label className={classes.labels} for="title">
          Visibility
        </label>
        <br />

        <input
          checked={material && visibleRef === "visible" && true}
          required
          onChange={onRadioClicked}
          value="visible"
          className={classes.radios}
          id="visible"
          type="radio"
          name="visibility"
          required
        />
        <label className={classes.labels_radio} for="visible">
          Visible
        </label>
        <br />

        <input
          checked={material && visibleRef === "invisible" && true}
          required
          onChange={onRadioClicked}
          value="invisible"
          className={classes.radios}
          id="invisible"
          type="radio"
          name="visibility"
          required
        />
        <label className={classes.labels_radio} for="invisible">
          Invisible
        </label>
        <br />

        <button type="submit" className={classes.submit}>
          {text}
        </button>
      </form>
    </div>
  );
};

export default AddSubmission;
