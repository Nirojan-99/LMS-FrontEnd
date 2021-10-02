import classes from "./AddLink.module.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";

const AddLink = (props) => {
  const week = props.match.params.weekID;
  const MaterialID = props.match.params.MaterialID;
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (MaterialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + MaterialID,
          {
            headers: { Authorization: "lmsvalidation " + token },
          }
        )
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.fetch === false) {
            setError("Unable to fetch data ! try again.");
            setTimeout(() => {
              history.goBack();
            }, 700);
          } else {
            setVisibility(resp.data.visibility);
            setLink(resp.data.link);
            setTitle(resp.data.title);
          }
        });
    }
  }, []);

  const [visibleRef, setVisibility] = useState("visible");
  const [link, setLink] = useState();
  const [title, setTitle] = useState();
  const [loaded, setLoaded] = useState("SAVE");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    // window.location.reload();
  };

  const onSubmitted = (event) => {
    event.preventDefault();
    setLoaded("SAVING...");

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

    if (!(link.includes("http") || link.includes("https"))) {
      setError("please input a valid link");
      setLoaded("SAVE");
      return;
    } else if (!title.trim()) {
      setError("please input a valid title");
      setLoaded("SAVE");
      return;
    }
    const material = {
      _id: MaterialID ? MaterialID : undefined,
      type: "link",
      week: week,
      title: title,
      link: link,
      visibility: visibleRef,
      date_time: datetime,
    };
    console.log(error);
    if (!error) {
      console.log(error);
      if (!MaterialID) {
        axios
          .post("http://localhost:5000/admin/add_material", material, {
            headers: { Authorization: "lmsvalidation " + token },
          })
          .then((resp) => {
            if (resp.data.auth === false) {
              dispatch(logout());
            } else if (resp.data.inserted === false) {
              setError("Unable to add material! try again.");
            } else {
              setSuccess(true);
            }
          })
          .catch((er) => {
            setError("Some error oocured , try again !");
          });
      } else {
        axios
          .post("http://localhost:5000/admin/edit_link", material, {
            headers: { Authorization: "lmsvalidation " + token },
          })
          .then((resp) => {
            if (resp.data.auth === false) {
              dispatch(logout());
            } else if (resp.data.updated === false) {
              setError("Unable to update! try again.");
            } else {
              setSuccess(true);
            }
          })
          .catch(() => {
            setError("Some error occured ! try again.");
          });
      }
    } else {
      return;
    }
  };

  const onRedirect = () => {
    if (MaterialID) {
      history.goBack();
    } else {
      axios
        .get("http://localhost:5000/admin/get_module?week=" + week)
        .then((res) => {
          history.replace("/my-courses/" + res.data[0].module);
        });
    }
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>ADD LINK</h2>
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
          placeholder="link.."
          required
        />

        <label className={classes.labels} for="title">
          Title
        </label>
        <br />
        <input
        placeholder="title.."
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
