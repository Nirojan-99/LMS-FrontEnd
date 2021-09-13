import classes from "./PaperSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import Success from "../../../../Components/SuccessPopup/Success";

const PaperSave = (props) => {
  const history = useHistory();

  const id = props.match.params.paperId;
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [btn, setBtn] = useState("SAVE");

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      axios
        .get("http://localhost:5000/library/get_paper?id=" + id)
        .then((res) => {
          if (res.data.ack !== false) {
            setPaperTitle(res.data.name);
            setpaperPosterold(res.data.paperLink);
          }
        })
        .catch((er) => {
          console.log("error");
        });
    }
  }, []);

  const [paperTitle, setPaperTitle] = useState();
  const [paperposter, setpaperPoster] = useState();
  const [pastpaperPoster, setpaperPosterold] = useState();

  const OnPaperSubmit = (event) => {
    const paper = new FormData();
    event.preventDefault();

    if (!paperTitle.trim() || paperTitle.length < 5) {
      setError("Pastpaper name should be longer");
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

    paper.append("paperfile", paperposter);
    paper.append("_id", id ? id : undefined);
    paper.append("edit", edit);
    paper.append("name", paperTitle);
    paper.append("type", "paper");
    paper.append("date_time", datetime);

    setBtn("SAVING...");
    axios
      .post("http://localhost:5000/library/add_paper", paper)
      .then((res) => {
        if (res.data.ack === true) {
          setSuccess(true);
        } else if (res.data.fileError === true) {
          setError("Invalid file type!");
          setBtn("SAVE");
        } else {
          setError("Unable to save! try again.");
          setBtn("SAVE");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const paperTitleHandler = (event) => {
    setPaperTitle(event.target.value);
  };

  const paperPosterHandler = (event) => {
    setpaperPoster(event.target.files[0]);
  };
  const clickedHandler = () => {
    setError(null);
  };

  const onRedirect = () => {
    history.replace("/services/digital_library");
  };

  return (
    <div className={classes.CardView}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>Add Paper</h2>
      <hr className={classes.line}></hr>
      <form
        enctype="multipart/form-data"
        className={classes.formContainer}
        onSubmit={OnPaperSubmit}
      >
        <label htmlFor="name" className={classes.lables}>
          Paper Title :
        </label>
        <br />
        <input
          onChange={paperTitleHandler}
          value={paperTitle}
          type="text"
          id="name"
          name="paperTitle"
          className={classes.inputs}
        ></input>

        <label htmlFor="poster" className={classes.lables}>
          Upload paper :
        </label>
        <br />

        {id && (
          <input
            onChange={paperPosterHandler}
            type="file"
            id="poster"
            name="pastpaper"
            className={classes.inputs}
          ></input>
        )}
        {!id && (
          <input
            onChange={paperPosterHandler}
            required
            type="file"
            id="poster"
            name="pastpaper"
            className={classes.inputs}
          ></input>
        )}
        {id && (
          <a className={classes.posterView} href={pastpaperPoster}>
            view current file
          </a>
        )}
        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default PaperSave;
