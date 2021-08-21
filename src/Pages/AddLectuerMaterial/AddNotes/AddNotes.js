import classes from "./AddNotes.module.css";
import { useState } from "react";
import { useRef } from "react";

const AddNotes = (props) => {
  const week = props.match.params.week;
  const module = props.match.params.module;

  const [visibleRef, setVisibility] = useState("visible");
  const notes = useRef();
  const titleRef = useRef();

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onNotesSubmit = (e) => {
    e.preventDefault();

    console.log(notes.current.value);
    console.log(titleRef.current.value);
    console.log(visibleRef);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>NOTES</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onNotesSubmit} className={classes.form_container}>
        <label className={classes.labels} htmlFor="title">
          Title
        </label>
        <br />
        <input
          ref={titleRef}
          className={classes.inputs_text}
          id="title"
          type="text"
          required
        />
        <label htmlFor="type" className={classes.labels}>
          Add Notes
        </label>
        <br />
        <textarea required ref={notes} className={classes.inputs}></textarea>
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
          SAVE
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
