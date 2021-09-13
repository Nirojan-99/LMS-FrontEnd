import classes from "./AddModule.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";

const AddModule = (props) => {
  const courseID = props.match.params.moduleid;
  const year = props.match.params.Year;
  const semester = props.match.params.semester;
  const moduleID = props.match.params.moduleid1;

  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (moduleID) {
      axios
        .get("http://localhost:5000/Module/get_module?moduleID=" + moduleID)
        .then((res) => {
          if (res) {
            setModuleNameHandler(res.data.Modulename);
            setModuleCodeHandler(res.data.ModuleCode);
            setModuleEnrollmentkeyHandler(res.data.ModuleEnrollmentkey);
            setModuleWeekCountsHandler(res.data.ModuleWeekCounts);
            setModuleLectureInchargeHandler(res.data.ModuleLectureIncharge);
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, []);

  const onSubmitModule = (event) => {
    event.preventDefault();

    if (ModuleCode.trim().length <6) {
      setError("please enter 6 digit ModuleCode!!");

      return;
    } else if (ModuleEnrollmentkey.trim().length <6) {
      setError(" please enter 6 digit ModuleEnrollmentkey!!! ");
      return;
    } else if (ModuleCode.trim().length > 6) {
      setError("please enter 6 digit ModuleCode!!! don't enter more than 6");
      return;
    } else if (ModuleEnrollmentkey.trim().length >6) {
      setError(
        "please enter 6 digit ModuleEnrollmentkey!!! don't enter more than 6"
      );
      return;
    } else if (ModuleWeekCounts.trim() <= 8) {
      setError("please enter 8 - 18 range ModuleWeekCounts !!! don't enter less than 8");
      return;
    } else if (ModuleWeekCounts.trim() >= 18) {
      setError("please enter 8 - 18 range ModuleWeekCounts !!! don't enter greater than 18");
      return;
    
    } else if (ModuleEnrollmentkey=== ModuleCode) {
      setError("please enter different 'ModuleCode' and 'ModuleEnrollmentkey'");
      return;
    }
    else if (!ModuleName.trim()) {
      setError("invaild ModuleName");
      return;
    }

    const Moduledata = {
      _id: moduleID ? moduleID : undefined,
      courseID,
      Modulename: ModuleName,
      ModuleCode: ModuleCode,
      ModuleEnrollmentkey: ModuleEnrollmentkey,
      ModuleWeekCounts: ModuleWeekCounts,
      ModuleLectureIncharge: ModuleLectureIncharge,
      year,
      semester,
    };
    if (!moduleID) {
      axios
        .post("http://localhost:5000/Module/addModule", {
          data: Moduledata,
          courseID: courseID,
        })
        .then((res) => {
      
          setError("successfully created Module !!");
          setTimeout(() => {
            setError(null);
            history.goBack();
          }, 2200);

          // setBtn("Saved")
          // history.replace("/services/job_portal");
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      axios
        .post("http://localhost:5000/Module/UpdateModule", Moduledata)
        .then((res) => {
          setError(" Module successfully update !!");
          setTimeout(() => {
            setError(null);
            history.goBack();
          }, 2200);
          // history.goBack();
          // setError("successfully updated Module");
        
         

          // setBtn("Saved")
          // history.replace("/services/job_portal");
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  const [ModuleName, setModuleNameHandler] = useState();
  const [ModuleCode, setModuleCodeHandler] = useState();
  const [ModuleEnrollmentkey, setModuleEnrollmentkeyHandler] = useState();
  const [ModuleWeekCounts, setModuleWeekCountsHandler] = useState();
  const [ModuleLectureIncharge, setModuleLectureInchargeHandler] = useState();
  const clickedHandler = (event) => {
    setError(null);
  };
  const ModuleNameHandler = (event) => {
    setModuleNameHandler(event.target.value);
  };
  const ModuleCodeHandler = (event) => {
    setModuleCodeHandler(event.target.value);
  };
  const ModuleEnrollmentkeyHandler = (event) => {
    setModuleEnrollmentkeyHandler(event.target.value);
  };
  const ModuleWeekCountsHandler = (event) => {
    setModuleWeekCountsHandler(event.target.value);
  };
  const ModuleLectureInchargeHandler = (event) => {
    setModuleLectureInchargeHandler(event.target.value);
  };

  return (
    <div className={classes.squareview}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <h2 className={classes.title}>Add Module</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={onSubmitModule}>
        <label for="ModuleName" className={classes.lables}>
          Module Name:
        </label>
        <br />
        <input
          type="text"
          id="ModuleName"
          value={ModuleName}
          onChange={ModuleNameHandler}
          className={classes.inputs}
        />

        <label for="ModuleCode" className={classes.lables}>
          Module Code:
        </label>
        <br />
        <input
          type="text"
          id="ModuleCode"
          className={classes.inputs}
          value={ModuleCode}
          onChange={ModuleCodeHandler}
        />

        <label for="ModuleEnrollmentkey" className={classes.lables}>
          Module Enrollment key :
        </label>
        <br />
        <input
          type="text"
          id="ModuleEnrollmentkey"
          className={classes.inputs}
          value={ModuleEnrollmentkey}
          onChange={ModuleEnrollmentkeyHandler}
        />

        <label for="ModuleWeekCounts" className={classes.lables}>
          Module Week Counts :
        </label>
        <br />
        <input
          type="text"
          id=" ModuleWeekCounts"
          name="companyName"
          className={classes.inputs}
          value={ModuleWeekCounts}
          onChange={ModuleWeekCountsHandler}
        />

        <label for="ModuleLectureIncharge" className={classes.lables}>
          Module Lecture Incharge :
        </label>
        <select
          id="ModuleLectureIncharge"
          className={classes.inputs1}
          value={ModuleLectureIncharge}
          onChange={ModuleLectureInchargeHandler}
        >
          <option selected="true" value="" hidden></option>
          <option value="DR.Kamal">DR.Kamal</option>
          <option value="pro.Nirupa">Prof.Nirupa</option>
          <option value="DR.Kumara">DR.Kumara</option>
          <option value="DR.Jayatha">Prof.Nimal</option>
        </select>

        <button className={classes.save}>ADD</button>
      </form>
    </div>
  );
};
export default AddModule;
