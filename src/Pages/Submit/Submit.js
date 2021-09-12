import classes from "./Submit.module.css";
import upload from "../../Assets/upload.svg";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Submit = (props) => {
  const token = useSelector((state) => state.loging.token);
  const materialID = props.match.params.ID;
  const [selectedFile, setSelectedFile] = useState();
  const [duedate, setDueDate] = useState();
  const [maxSize, setMaxSize] = useState();
  const [status, setStatus] = useState();
  const [dueTime, setDueTime] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_material?materialID=" + materialID,{
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        console.log(resp.data)
        setDueDate(resp.data.deadlineDate);
        setMaxSize(resp.data.maxSize);
        setDueTime(resp.data.deadlineTime);
      });
  }, [null]);

  const onFileSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log("called");
  };

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>SUBMISSION</h2>
      <hr className={classes.line}></hr>
      <div className={classes.box}>
        <label htmlFor="file" className={classes.inputs}>
          <img src={upload} />
          <br />
        </label>
        <input
          required
          onChange={onFileChanged}
          className={classes.inputsA}
          type="file"
          id="file"
          name="file"
        />
      </div>
      <div className={classes.details}>
        <span>Due date : {duedate + " / " + dueTime}</span>
        <br />
        <span>Max Size : {maxSize + "Mb"}</span>
        <br />
        <span>status : {}</span>
      </div>
      <button onClick={onFileSubmit} className={classes.btn}>
        {"SUBMIT"}
      </button>
    </div>
  );
};

export default Submit;
