import classes from "./PaperSave.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

const PaperSave = (props) => {
  const history = useHistory();

  const id = props.match.params.paperId;
  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("SAVE");

  // useEffect(() => {
  //   if (!id) {
  //     setEdit(false);
  //   } else {
  //     setEdit(true);
  //     axios
  //       .get("http://localhost:5000/get_paper?id=" + id)
  //       .then((res) => {
  //         console.log(res.data);
         
  //         setPaperTitle(res.data.name);
  //         setpaperPosterold(res.data.paperPoster);
  //         setpaperId(res.data._id);
  //       })
  //       .catch((er) => {
  //         console.log("error");
  //       });
  //   }
  // }, []);

  const [paperTitle, setPaperTitle] = useState();
  const [paperposter, setpaperPoster] = useState();
  const [paperPoster, setpaperPosterold] = useState();
  const [paperId, setpaperId] = useState();

  const OnPaperSubmit = (event) => {
    const paper = new FormData();

    event.preventDefault();

    paper.append("paperPoster", paperposter);
    paper.append("_id", paperId ? paperId : undefined);
    paper.append("edit", edit);
    paper.append("name", paperTitle);
  

    setBtn("SAVING...");
    // axios
    //   .post("http://localhost:5000/add_paper", paper)
    //   .then((res) => {
    //     console.log(res.data);
    //     // setBtn("Saved")
    //     history.replace("/services/library_portal");
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });
  };
  const paperTitleHandler = (event) => {
    setPaperTitle(event.target.value);
  };

  const paperPosterHandler = (event) => {
    setpaperPoster(event.target.files[0]);
  };

  return (
    <div className={classes.CardView}>
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
          {id && <img className={classes.posterView} src={paperPoster} />}
          Upload paper :
        </label>
        <br />

        {id && (
          <input
            onChange={paperPosterHandler}
            // value={paperposter}
            type="file"
            id="poster"
            name="author"
            className={classes.inputs}
          ></input>
        )}
        {!id && (
          <input
            onChange={paperPosterHandler}
            required
            type="file"
            id="poster"
            name="author"
            className={classes.inputs}
          ></input>
        )}

        <label for="faculty" className={classes.lables}>
          Visibility to the Student
        </label>
        <br />
        <input
          type="radio"
          name="visibility"
          id="visible"
          value="visible"
          className={classes.radio}
        ></input>
        <label className={classes.radioLabel}>Visible</label>
        <br />
        <input
          type="radio"
          name="visibility"
          id="invisible"
          value="invisible"
          className={classes.radio}
        ></input>
        <label className={classes.radioLabel}>Invisible</label>
        <br />

        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};

export default PaperSave;
