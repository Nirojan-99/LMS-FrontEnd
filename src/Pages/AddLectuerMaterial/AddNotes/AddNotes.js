import classes from "./AddNotes.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";

const AddNotes = (props) => {
  const week = props.match.params.weekID;
  const MaterialID = props.match.params.MaterialID;
  const token = useSelector((state) => state.loging.token);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (MaterialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + MaterialID,
          {
            headers: { Authorization: "lmsvalidation " + token },
          }
        )
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.fetch === false) {
            setError("Unable to fetch data! try again.");
            setTimeout(() => {
              history.goBack();
            }, 800);
          } else {
            setVisibility(resp.data.visibility);
            setNotes(resp.data.title);
          }
        })
        .catch(() => {
          setError("some error occured! try again");
        });
    }
  }, []);

  const clickedHandler = () => {
    setError(null);
    // window.location.reload();
  };

  const [visibleRef, setVisibility] = useState("visible");
  const [notes, setNotes] = useState();
  const [loaded, setLoaded] = useState("SAVE");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const notesHandler = (event) => {
    setNotes(event.target.value);
  };

  const onNotesSubmit = (e) => {
    setLoaded("SAVING...");
    e.preventDefault();

    if (!notes.trim() && notes.length < 40) {
      setError("notes shout be more longer");
      setLoaded("SAVE");
      return;
    }

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

    const material = {
      _id: MaterialID ? MaterialID : null,
      type: "notes",
      week: week,
      title: notes,
      visibility: visibleRef,
      date_time: datetime,
    };

    if (!MaterialID) {
      axios
        .post("http://localhost:5000/admin/add_material", material, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.inserted === false) {
            setError("unable to add material! try again.");
            setLoaded("SAVE");
          } else {
            setSuccess(true);
          }
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post("http://localhost:5000/admin/edit_notes", material, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.updated === false) {
            setError("Unable to update! try again.");
            setLoaded("SAVE");
          } else {
            setLoaded("SAVE");
            setSuccess(true);
          }
        })
        .catch(() => {});
    }
  };

  const onRedirect = () => {
    if (MaterialID) {
      history.goBack()
    } else {
      axios
        .get("http://localhost:5000/admin/get_module?week=" + week)
        .then((res) => {
          setLoaded("SAVE");
          history.replace("/my-courses/" + res.data[0].module);
        });
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>ADD NOTES</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onNotesSubmit} className={classes.form_container}>
        <label htmlFor="type" className={classes.labels}>
          Add Notes
        </label>
        <br />
        <textarea
          value={notes}
          onChange={notesHandler}
          required
          className={classes.inputs}
        ></textarea>
        <label className={classes.labels} htmlFor="title">
          Visibility
        </label>
        <br />
        <input
          checked={MaterialID && visibleRef === "visible" && true}
          onChange={onRadioClicked}
          value="visible"
          className={classes.radios}
          id="visible"
          type="radio"
          name="visibility"
          required
        />

        <label className={classes.labels_radio} htmlFor="visible">
          Visible
        </label>
        <br />

        <input
          checked={MaterialID && visibleRef === "invisible" && true}
          onChange={onRadioClicked}
          value="invisible"
          className={classes.radios}
          id="invisible"
          type="radio"
          name="visibility"
          required
        />
        <label className={classes.labels_radio} htmlFor="invisible">
          Invisible
        </label>
        <br />

        <button type="submit" className={classes.submit}>
          {loaded}
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
