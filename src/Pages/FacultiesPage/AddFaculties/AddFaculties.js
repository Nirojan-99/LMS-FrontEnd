import classes from "./AddFaculties.module.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";

const AddFaculties = (props) => {
  const history = useHistory();

  const id = props.match.params.facultyId;
  const [edit, setEdit] = useState(false);
  const [btn, setBtn] = useState("ADD");

  useEffect(() => {
    if (!id) {
      setEdit(false);
    } else {
      setEdit(true);
      setBtn("Edit");
      axios
        .post("http://localhost:5000/Faculty/getfaculty", { id: id })
        .then((res) => {
          // console.log(res.data._id);
          // console.log(res.data.name);

          setNamehandlder(res.data.name);
          setidhandlder(res.data.id);
          setInchargehandlder(res.data.Incharge);
        })
        .catch((er) => {
          console.log("error in data coming");
        });
    }
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const Facultydata = {
      _id: id ? id : null,
      id: facultyid,
      name: name,
      Incharge: Incharge,
      courses: [],
    };

    if (!id) {
      axios
        .post("http://localhost:5000/Faculty/addFaculty", Facultydata)
        .then((res) => {
          console.log(res.data);
          history.replace("/faculties");
          // setBtn("Saved")
          // history.replace("/services/job_portal");
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post("http://localhost:5000/Faculty/UpdateFaculty", Facultydata)
        .then((res) => {
          console.log(res.data);
          history.replace("/faculties");
          // setBtn("Saved")
          // history.replace("/services/job_portal");
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const [name, setNamehandlder] = useState();
  const [facultyid, setidhandlder] = useState();
  const [Incharge, setInchargehandlder] = useState();

  const Namehandlder = (event) => {
    setNamehandlder(event.target.value);
  };
  const IDhandlder = (event) => {
    setidhandlder(event.target.value);
  };
  const Inchargehandlder = (event) => {
    setInchargehandlder(event.target.value);
  };

  return (
    <div className={classes.squareview}>
      <h2 className={classes.title}>Add Faculties</h2>

      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={onSubmitHandler}>
        <label for="FacultieName" className={classes.lables}>
          Facultie Name:
        </label>
        <br />
        <input
          type="text"
          id="FacultieName"
          name="FacultieName"
          className={classes.inputs}
          onChange={Namehandlder}
          value={name}
        />

        <label for="FacultieID" className={classes.lables}>
          Facultie ID
        </label>
        <br />
        <input
          type="text"
          id="FacultieID"
          name="FacultieID"
          className={classes.inputs}
          onChange={IDhandlder}
          value={facultyid}
        />

        <label for="FacultieIncharge" className={classes.lables}>
          Facultie Incharge :
        </label>
        <br />
        <select
          id="faculty"
          name="faculty"
          className={classes.inputs1}
          value={Incharge}
          onChange={Inchargehandlder}
          value={Incharge}
        >
          <option selected="true" value="" hidden></option>
          <option value="DR.Kamal">DR.Kamal</option>
          <option value="pro.Nirupa">Prof.Nirupa</option>
          <option value="DR.Kumara">DR.Kumara</option>
          <option value="DR.Kumara">Prof.Nimal</option>
        </select>
        <button className={classes.save}>{btn}</button>
      </form>
    </div>
  );
};
export default AddFaculties;
