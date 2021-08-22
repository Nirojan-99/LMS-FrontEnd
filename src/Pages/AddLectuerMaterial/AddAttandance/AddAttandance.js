import classes from "./AddAttandance.module.css";
import { useState } from "react";
import axios from "axios";

const AddAttandance = (props) => {
  const week = props.match.params.weekID;

  const [visibleRef, setVisibility] = useState("visible");

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onAttandanceSubmit = (event) => {
    event.preventDefault()
    const attandance = {
      type: "attandance",
      week: week,
      title: "attandance",
      visibility: visibleRef,
    };

    axios
      .post("http://localhost:5000/admin/add_attandance", attandance)
      .then((res) => {
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>ATTANDANCE</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onAttandanceSubmit} className={classes.form_container}>
        {/* <label for="file" className={classes.labels}>Add File</label><br/>
            <input className={classes.inputs} type="file" id="file" /> */}
        <input
          //  checked={false}
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

export default AddAttandance;
