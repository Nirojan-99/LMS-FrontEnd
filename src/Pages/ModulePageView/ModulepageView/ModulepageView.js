import ModuleView from "./Components/ModuleView";
import classes from "./ModulepageView.module.css";
// import plus from "../../../Assets/plus.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import plus from "../../../Assets/plusFaculty.png";

const ModulepageView = (props) => {
  const moduleid = props.match.params.ModuleID;
  const year = props.match.params.Year;
  const semester = props.match.params.semester;

  const [Modules, setModule] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/Module/get_Modules?year=" +
          year +
          "&semester=" +
          semester +
          "&courseID=" +
          moduleid,
      )
      .then((res) => {
        console.log(res.data)
        setModule(res.data)
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className={classes.ModulepageView}>
      {/* <ModuleView Module="CM" /> */}

      {Modules.map((row)=>{
        return(<ModuleView Module={row} />)
      })}

      <div className={classes.ModulepageView_view}>
        <a
          href={
            "/faculties/course/Addmodule/" +
            year +
            "/" +
            semester +
            "/" +
            moduleid
          }
        >
          <img src={plus} className={classes.img_buttons}></img>
        </a>
      </div>
    </div>
  );
};
export default ModulepageView;
