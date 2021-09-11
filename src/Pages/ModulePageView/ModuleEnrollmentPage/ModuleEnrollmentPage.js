import classes from "./ModuleEnrollmentPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const ModuleEnrollment = (props) => {
  const id = props.match.params.moduleID;
  const [lic, setLIC] = useState();
  const [name, setNAme] = useState();
  const [valid, setvalid] = useState(true);
  const [Ekey, setKey] = useState();
  const userID = useSelector((state) => state.loging.userID);
  const history = useHistory();

  const clickedHandler = () => {
    setvalid(true);
  };
  const keyhandler = (event) => {
    setKey(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Module/get_LIC?moduleID=" + id)
      .then((resp) => {
        if (resp.data.LIC) {
          setLIC(resp.data.LIC);
          setNAme(resp.data.name);
        }
      })
      .catch((er) => {});
  }, []);

  const enrollHandler = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      key: Ekey,
      moduleID: id,
      studentID: userID,
    };
    axios
      .post("http://localhost:5000/Module/enroll", data)
      .then((resp) => {
        if (resp.data.ack === true) {
          history.replace("/my-courses/" + id);
        } else {
          setvalid(false);
        }
      })
      .catch((er) => {});
  };
  return (
    <div className={classes.ModuleEnrollment_cardView}>
      {!valid && (
        <ErrorPopup error={"Invalid Key"} clickedHandler={clickedHandler} />
      )}
      <h1 className={classes.title}>{props.module}</h1>
      <h3 className={classes.back2}>Lecturer InCharge: {lic}</h3>
      <h3 className={classes.back2}>Module: {name}</h3>
      <h1 className={classes.back3}>Enroll</h1>
      <div>
        <div className={classes.formContainer}>
          <from>
            <input
              onChange={keyhandler}
              value={Ekey}
              type="text"
              id="enroll"
              placeholder="******"
              name="companyName"
              className={classes.inputs}
            />

            <button onClick={enrollHandler} className={classes.save}>
              ENROLL
            </button>
          </from>
        </div>
      </div>
    </div>
  );
};
export default ModuleEnrollment;
