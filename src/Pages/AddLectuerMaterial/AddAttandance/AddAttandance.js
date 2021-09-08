import classes from "./AddAttandance.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../../Store/auth";

const AddAttandance = (props) => {
  const week = props.match.params.weekID;
  const materialID = props.match.params.MaterialID;
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (materialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + materialID,
          {
            headers: { Authorization: "lmsvalidation " + token },
          }
        )
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.fetch === false) {
            setError("No matching Material found !");
            setDidUpdated(false);
            setTimeout(() => {
              history.replace("/my-courses");
            }, 500);
          } else {
            setVisibility(resp.data.visibility);
            console.log(resp.data);
          }
        });
    }
  }, []);
  const clickHandler = () => {
    setDidUpdated(true);
  };

  const history = useHistory();

  const [visibleRef, setVisibility] = useState("visible");
  const [loaded, setLoaded] = useState("Save");
  const [error, setError] = useState();
  const [didUpdated, setDidUpdated] = useState(true);

  const onRadioClicked = (event) => {
    const valueq = event.target.value;
    setVisibility(valueq);
  };

  const onAttandanceSubmit = (event) => {
    setLoaded("Saving...");

    const currentdate = new Date();
    const date = currentdate.getDate();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    event.preventDefault();
    const material = {
      type: "attandance",
      week: week,
      title: "attandance",
      visibility: visibleRef,
      date_time: date + "/" + time,
      _id: materialID ? materialID : undefined,
    };

    if (materialID) {
      axios
        .post("http://localhost:5000/admin/update_attandance", material, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.updated === false) {
            setError("Unable to update!");
            setDidUpdated(false);
            setLoaded("Save");
          } else {
            window.location.reload();
          }
        })
        .catch((er) => {
          setError("check your network connection !");
          setDidUpdated(false);
          setLoaded("Save");
        });
    } else {
      axios
        .post("http://localhost:5000/admin/add_material", material, {
          headers: { Authorization: "lmsvalidation " + token },
        })
        .then((resp) => {
          if (resp.data.auth === false) {
            dispatch(logout());
          } else if (resp.data.inserted === false) {
            setError("Unable to create!");
            setDidUpdated(false);
            setLoaded("Save");
          } else {
            axios
              .get("http://localhost:5000/admin/get_module?week=" + week)
              .then((res) => {
                history.replace("/my-courses/" + res.data[0].module);
              });
          }
        })
        .catch((er) => {});
    }
  };

  return (
    <div className={classes.container}>
      {!didUpdated && (
        <ErrorPopup error={error} clickedHandler={clickHandler} />
      )}
      <h2 className={classes.title}>ATTANDANCE</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onAttandanceSubmit} className={classes.form_container}>
        <input
          checked={materialID && visibleRef === "visible" && true}
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
          checked={materialID && visibleRef === "invisible" && true}
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

export default AddAttandance;
