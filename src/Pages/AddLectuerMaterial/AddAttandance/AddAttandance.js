import classes from "./AddAttandance.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddAttandance = (props) => {
  const week = props.match.params.weekID;
  const materialID = props.match.params.MaterialID;

  useEffect(() => {
    if (materialID) {
      axios
        .get(
          "http://localhost:5000/admin/get_material?materialID=" + materialID
        )
        .then((resp) => {
          console.log(resp.data);
          setVisibility(resp.data.visibility);
        });
    }
  }, []);

  const history = useHistory();

  const [visibleRef, setVisibility] = useState("visible");
  const [loaded, setLoaded] = useState("Save");

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
        .post("http://localhost:5000/admin/update_attandance", material)
        .then((resp) => {
          history.goBack();
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
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
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>ATTANDANCE</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={onAttandanceSubmit} className={classes.form_container}>
        {/* <label for="file" className={classes.labels}>Add File</label><br/>
            <input className={classes.inputs} type="file" id="file" /> */}
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
