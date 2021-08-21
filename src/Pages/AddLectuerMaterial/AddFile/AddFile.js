import classes from "./AddFile.module.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

const AddFile = (props) => {
  const week = props.match.params.week;
  const module = props.match.params.module;

  const titleRef = useRef();
  const [visibleRef, setVisibility] = useState("visible");
  const [selectedFile, setSelectedFile] = useState();

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onSubmitted = (e) => {
    e.preventDefault();

    titleRef.current.value.trim();

    console.log(titleRef.current.value);
    console.log(visibleRef);
    console.log(selectedFile.name);
    const formData = new FormData();
    formData.append("File", selectedFile);
    //   axios.post("../../../",{
    //     method: 'POST',
    //     body: formData,
    // })
  };

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>FILE</h2>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label className={classes.labels} htmlFor="file">
          File
        </label>
        <br />
        <input
        
        placeholder="drag And Drop"
          onChange={onFileChanged}
          name="file"
          className={(classes.inputs, classes.fileinput)}
          type="file"
          id="file"
          required
        />

        <label className={classes.labels} htmlFor="title">
          Title
        </label>
        <br />
        <input
          ref={titleRef}
          className={classes.inputs}
          id="title"
          type="text"
          required
        />

        <label className={classes.labels}>Visibility</label>
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

export default AddFile;
