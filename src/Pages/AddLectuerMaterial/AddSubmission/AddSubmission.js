import classes from "./AddSubmission.module.css";
import insight1 from "../../../Assets/bar-graph.svg";
import { useRef } from "react";
import { useState } from "react";

const AddSubmission = (props) => {
  const week = props.match.params.week;
  const module = props.match.params.module;

  const dateRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const sizeRef = useRef();
  const [visibleRef, setVisibility] = useState("visible");

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onSubmitted = (e) => {
    e.preventDefault();

    dateRef.current.value.trim();
    titleRef.current.value.trim();
    timeRef.current.value.trim();
    sizeRef.current.value.trim();

    console.log(
      titleRef.current.value,
      dateRef.current.value,
      timeRef.current.value,
      sizeRef.current.value
    );
    console.log(visibleRef);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title_div}>
        <h2 className={classes.title}>ADD SUBMISSION</h2>
        <a href="../../submisson_insight/id"><img src={insight1} className={classes.iconM} /></a>
      </div>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label htmlFor="title" className={classes.labels}>
          Title
        </label>
        <input
          required
          ref={titleRef}
          className={classes.inputs}
          id="title"
          name="title"
          type="text"
        ></input>

        <label htmlFor="date" className={classes.labels}>
          Deadline Date
        </label>
        <input
          required
          ref={dateRef}
          className={classes.inputs}
          id="date"
          name="date"
          type="date"
        ></input>

        <label htmlFor="time" className={classes.labels}>
          Deadline Time
        </label>
        <input
          required
          ref={timeRef}
          className={classes.inputs}
          name="time"
          id="time"
          type="time"
        ></input>

        <label ref={sizeRef} htmlFor="size" className={classes.labels}>
          Maximum Size
        </label>
        <input
        ref={sizeRef}
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
          SAVE
        </button>
      </form>
    </div>
  );
};

export default AddSubmission;
