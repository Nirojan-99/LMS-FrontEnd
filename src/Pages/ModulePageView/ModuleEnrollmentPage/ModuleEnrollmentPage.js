import classes from "./ModuleEnrollmentPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";

const ModuleEnrollment = (props) => {
  const id = props.match.params.moduleID;
  const [lic, setLIC] = useState();
  const [name, setNAme] = useState();
  const [studentIDNo, setstudentIDNo] = useState();
  const dispatch = useDispatch();

  const [valid, setvalid] = useState(true);
  const [Ekey, setKey] = useState();
  const userID = useSelector((state) => state.loging.userID);
  const history = useHistory();
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.loging.token);

  const clickedHandler = () => {
    setvalid(true);
  };
  const keyhandler = (event) => {
    setKey(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Module/get_LIC?moduleID=" + id, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        if (resp.data.auth === false) {
          setError("You Are not Authorized to get module details !");
         // setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1000);
        }
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
      .post("http://localhost:5000/Module/enroll", data, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        if (resp.data.auth === false) {
          setError("You Are not Authorized to make enrollment !");
         // setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1000);
        }
        else if (resp.data.ack === true) {
          history.replace("/my-courses/" + id);
        } else if (resp.data.ack === false){
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
      <h1 className={classes.ModuleName}>{props.module}</h1>
      <h3 className={classes.InCharge}>LECTURE INCHARGE : {lic}</h3>
      <h3 className={classes.back2}>MODULE : {name}</h3>
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
              name="enrollmentkey"
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
