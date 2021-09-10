import classes from "./AddModule.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddModule = (props) => {
  const courseID = props.match.params.moduleid;
  const year = props.match.params.Year;
  const semester = props.match.params.semester;
  const moduleID = props.match.params.moduleid1;
  const [Edit,setEdit]  = useState();

  const history = useHistory();
  
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

    const Moduledata = {

      _id:moduleID?moduleID:undefined,
      courseID,
      Modulename: ModuleName,
      ModuleCode: ModuleCode,
      ModuleEnrollmentkey: ModuleEnrollmentkey,
      ModuleWeekCounts: ModuleWeekCounts,
      ModuleLectureIncharge: ModuleLectureIncharge,
      year,
      semester,
    };
    if(!moduleID) {
    axios
      .post("http://localhost:5000/Module/addModule", {
        data: Moduledata,
        courseID: courseID,
      })
      .then((res) => {
        console.log(res.data);
        history.goBack();
        // setBtn("Saved")
        // history.replace("/services/job_portal");
      })
      .catch((er) => {
        console.log(er);
      });
  
} 
else {
  axios
  .post("http://localhost:5000/Module/UpdateModule", 
 Moduledata,
    
  )
  .then((res) => {
    console.log(res.data);
    history.goBack();
    // setBtn("Saved")
    // history.replace("/services/job_portal");
  })
  .catch((er) => {
    console.log(er);
  });
};

}

  const [ModuleName, setModuleNameHandler] = useState();
  const [ModuleCode, setModuleCodeHandler] = useState();
  const [ModuleEnrollmentkey, setModuleEnrollmentkeyHandler] = useState();
  const [ModuleWeekCounts, setModuleWeekCountsHandler] = useState();
  const [ModuleLectureIncharge, setModuleLectureInchargeHandler] = useState();

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
          className={classes.inputs}
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
