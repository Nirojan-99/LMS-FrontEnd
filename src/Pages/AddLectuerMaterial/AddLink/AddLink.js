import classes from "./AddLink.module.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const AddLink = (props) => {
  const week = props.match.params.weekID;
  const MaterialID = props.match.params.MaterialID;

  const history = useHistory();

  useEffect(() => {
    if (MaterialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + MaterialID
        )
        .then((resp) => {
          setVisibility(resp.data.visibility);
          setLink(resp.data.link);
          setTitle(resp.data.title);
        });
    }
  }, []);

  const [visibleRef, setVisibility] = useState("visible");
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [loaded, setLoaded] = useState("SAVE");
  const [error, setError] = useState(null);

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const linkHandler = (event) => {
    setLink(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const clickedHandler = () => {
    setError(null);
    window.location.reload();
  };

  const onSubmitted = (event) => {
    event.preventDefault();
    setLoaded("SAVING...");

    const currentdate = new Date();
    const month = currentdate.getMonth()+1
    const date = currentdate.getDate() + "-" + month;
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    if (!(link.includes("http") || link.includes("https"))) {
      setError("please input a valid link");
      setLoaded("SAVE");
      return;
    } else if (!title.trim()) {
      setError("please input a valid title");
      setLoaded("SAVE");
      return
    }
    const material = {
      _id: MaterialID ? MaterialID : undefined,
      type: "link",
      week: week,
      title: title,
      link: link,
      visibility: visibleRef,
      date_time: date + "/" + time,
    };
    console.log(error)
    if (!error) {
      console.log(error)
      if (!MaterialID) {
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
      } else {
        axios
          .post("http://localhost:5000/admin/edit_link", material)
          .then((resp) => {
            console.log("called");
            history.goBack();
          })
          .catch(() => {});
      }
    }
    else{
      return
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <h2 className={classes.title}>LINK</h2>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label className={classes.labels} for="link">
          Link
        </label>
        <br />
        <input
          required
          value={link}
          onChange={linkHandler}
          className={classes.inputs}
          type="text"
          id="link"
          required
        />

        <label className={classes.labels} for="title">
          Title
        </label>
        <br />
        <input
          required
          value={title}
          onChange={titleHandler}
          className={classes.inputs}
          id="title"
          type="text"
          required
        />

        <label className={classes.labels} for="title">
          Visibility
        </label>
        <br />

        <input
          checked={MaterialID && visibleRef === "visible" && true}
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
          checked={MaterialID && visibleRef === "invisible" && true}
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
          {loaded}
        </button>
      </form>
    </div>
  );
};

export default AddLink;
