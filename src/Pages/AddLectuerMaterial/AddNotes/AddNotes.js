import classes from "./AddNotes.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const AddNotes = (props) => {
  const week = props.match.params.weekID;
  const MaterialID = props.match.params.MaterialID;

  const history = useHistory();

  useEffect(() => {
    if (MaterialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + MaterialID
        )
        .then((resp) => {
          setVisibility(resp.data.visibility);
          setNotes(resp.data.title);
        })
        .catch(() => {});
    }
  }, []);

  const clickedHandler = () => {
    setError(null);
    window.location.reload();
  };

  const [visibleRef, setVisibility] = useState("visible");
  const [notes, setNotes] = useState();
  const [loaded, setLoaded] = useState("SAVE");
  const [error, setError] = useState();

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
      setError("notes shout be greater than 40 words in length");
      return;
    }

    const currentdate = new Date();
    const date = currentdate.getDate();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    const material = {
      _id:MaterialID?MaterialID:null,
      type: "notes",
      week: week,
      title: notes,
      visibility: visibleRef,
      date_time: date + "/" + time,
    };

    if (!MaterialID) {
      axios
        .post("http://localhost:5000/admin/add_material", material)
        .then((resp) => {
          // console.log(resp.data);

          axios
            .get("http://localhost:5000/admin/get_module?week=" + week)
            .then((res) => {
              setLoaded("SAVE");
              history.replace("/my-courses/" + res.data[0].module);
            });
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
      .post("http://localhost:5000/admin/edit_notes", material)
      .then((resp) => {
        setLoaded("SAVE");
        history.goBack();
      })
      .catch(() => {});
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      <h2 className={classes.title}>NOTES</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onNotesSubmit} className={classes.form_container}>
        {/* <label className={classes.labels} htmlFor="title">
          Title
        </label>
        <br />
        <input
          ref={titleRef}
          className={classes.inputs_text}
          id="title"
          type="text"
          required
        /> */}
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
