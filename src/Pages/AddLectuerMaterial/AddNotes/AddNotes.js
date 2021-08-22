import classes from "./AddNotes.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddNotes = (props) => {
  const week = props.match.params.weekID;
  const history = useHistory();

  const [visibleRef, setVisibility] = useState("visible");
  const [notes, setNotes] = useState();
  const [loaded, setLoaded] = useState("SAVE");

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

    const currentdate = new Date();
    const date = currentdate.getDate();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    const material = {
      type: "notes",
      week: week,
      title: notes,
      visibility: visibleRef,
      date_time: date + "/" + time,
    };

    axios
      .post("http://localhost:5000/admin/add_material", material)
      .then((resp) => {
        // console.log(resp.data);

        axios
          .get("http://localhost:5000/admin/get_module?week=" + week)
          .then((res) => {
            history.replace("/my-courses/" + res.data[0].module);
          });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className={classes.container}>
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
