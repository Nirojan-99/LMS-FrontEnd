import classes from "./AddFile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";

const AddFile = (props) => {
  const week = props.match.params.weekID;
  const material = props.match.params.MaterialID;
  const history = useHistory();
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();

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
            setError("Unable to fetch data !");
            setTimeout(() => {
              history.goBack();
            }, 600);
          } else {
            setVisibility(resp.data.visibility);
            setTitle(resp.data.title);
            setCurrentFile(resp.data.link);
          }
        })
        .catch(() => {
          setError("Check your network connection");
        });
    }
  }, []);

  const [visibleRef, setVisibility] = useState("visible");
  const [selectedFileout, setSelectedFileout] = useState();
  const [title, setTitle] = useState();
  const [currentFile, setCurrentFile] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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
    // window.location.reload();
  };

  const onSubmitted = (e) => {
    e.preventDefault();
    setload("SAVING..");
    const files = new FormData();

    if (!title.trim()) {
      setError("Please input valid title");
      setload("SAVE");
      return;
    } else if (!setSelectedFile && !material) {
      setError("Please input valid file");
      setload("SAVE");
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

    files.append("_id", material ? material : undefined);
    files.append("edit", material ? true : false);
    files.append("title", title);
    files.append("file", selectedFile);
    files.append("type", "file");
    files.append("date_time", datetime);
    files.append("visibility", visibleRef);
    files.append("week", week);

    if (!material) {
      axios
        .post("http://localhost:5000/admin/add_file", files, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.updated === true) {
            setSuccess(true);
          } else {
            setError("Unable to make changes! try again.");
          }
        })
        .catch((er) => {
          setError("Check your network connection");
        });
    } else {
      axios
        .post("http://localhost:5000/admin/add_file", files, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.updated === false) {
            setError("Unable to update ! try again.");
            setload("SAVE");
          } else {
            setSuccess(true);
          }
        })
        .catch(() => {
          setError("Check your network connection");
        });
    }
  };

  const onFileChanged = (event) => {
    setSelectedFile(event.target.files[0]);
    event.target.files[0] && setSelectedFileout(event.target.files[0].name);
  };
  const onRedirect = () => {
    if (material) {
      history.goBack();
    } else {
      axios
        .get("http://localhost:5000/admin/get_module?week=" + week)
        .then((res) => {
          setload("SAVE");
          history.replace("/my-courses/" + res.data[0].module);
        });
    }
  };
  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>ADD FILE</h2>
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
          <div className={classes.file_container}>
            {" "}
            <input
              placeholder="drag And Drop"
              onChange={onFileChanged}
              name="file"
              className={(classes.inputs, classes.fileinput)}
              type="file"
              id="file"
              required
            />
            <label htmlFor="file" className={classes.file_label}>
              Drag and Drop
            </label>
          </div>
        )}
        {material && (
          <div className={classes.file_container}>
            {" "}
            <input
              placeholder="drag And Drop"
              onChange={onFileChanged}
              name="file"
              className={(classes.inputs, classes.fileinput)}
              type="file"
              id="file"
            />
            <label htmlFor="file" className={classes.file_label}>
              Drag and Drop
            </label>
          </div>
        )}
        {selectedFileout && (
          <div className={classes.preview}>
            Selected File : {selectedFileout}
          </div>
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
