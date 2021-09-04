import classes from "./AddFile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";

const AddFile = (props) => {
  const week = props.match.params.weekID;
  const material = props.match.params.MaterialID;
  const history = useHistory();

  useEffect(() => {
    if (material) {
      axios
        .get("http://localhost:5000/admin/get_material?materialID=" + material)
        .then((resp) => {
          setVisibility(resp.data.visibility);
          setTitle(resp.data.title);
          setCurrentFile(resp.data.link);
        })
        .catch(() => {});
    }
  }, []);

  const [visibleRef, setVisibility] = useState("visible");
  const [selectedFile, setSelectedFile] = useState();
  const [title, setTitle] = useState();
  const [currentFile, setCurrentFile] = useState();
  const [error, setError] = useState(null);
  const [load, setload] = useState("SAVE");

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };
  const titlehandler = (event) => {
    setTitle(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
    window.location.reload();
  };

  const onSubmitted = (e) => {
    e.preventDefault();
    setload("SAVING..");
    const files = new FormData();

    if (!title.trim()) {
      setError("pleae input valid title");
      return;
    } else if (!setSelectedFile && !material) {
      setError("pleae input valid file");
      return;
    }

    const currentdate = new Date();
    const date = currentdate.getDate();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    files.append("_id", material ? material : undefined);
    files.append("edit", material ? true : false);
    files.append("title", title);
    files.append("file", selectedFile);
    files.append("type", "file");
    files.append("date_time", date + "/" + time);
    files.append("visibility", visibleRef);
    files.append("week", week);

    if (!material) {
      axios
        .post("http://localhost:5000/admin/add_file", files)
        .then((resp) => {
          // console.log(resp.data);

          axios
            .get("http://localhost:5000/admin/get_module?week=" + week)
            .then((res) => {
              setload("SAVE");
              history.replace("/my-courses/" + res.data[0].module);
            });
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post("http://localhost:5000/admin/add_file", files)
        .then((resp) => {
          setload("SAVE");
          history.goBack();
        })
        .catch(() => {});
    }
  };

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      <h2 className={classes.title}>FILE</h2>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        {material && (
          <>
            <a className={classes.viewFile} href={currentFile}>
              VIEW CURRENT FILE
            </a>
            <br />
          </>
        )}
        <label className={classes.labels} htmlFor="file">
          File
        </label>
        <br />
        {!material && (
          <input
            placeholder="drag And Drop"
            onChange={onFileChanged}
            name="file"
            className={(classes.inputs, classes.fileinput)}
            type="file"
            id="file"
            required
          />
        )}
        {material && (
          <input
            placeholder="drag And Drop"
            onChange={onFileChanged}
            name="file"
            className={(classes.inputs, classes.fileinput)}
            type="file"
            id="file"
          />
        )}

        <label className={classes.labels} htmlFor="title">
          Title
        </label>
        <br />
        <input
          onChange={titlehandler}
          value={title}
          className={classes.inputs}
          id="title"
          type="text"
          required
        />

        <label className={classes.labels}>Visibility</label>
        <br />

        <input
          checked={material && visibleRef === "visible" && true}
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
          checked={material && visibleRef === "invisible" && true}
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
          {load}
        </button>
      </form>
    </div>
  );
};

export default AddFile;
