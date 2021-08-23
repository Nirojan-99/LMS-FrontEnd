import FacultieName from "./Components/FacultiesName";
import classes from "./FacultiesView.module.css";
import plus from "../../../Assets/plus.svg"



const FacultiesView = (props) => {
  return (
     <div className={classes.main}>
        <FacultieName/>
        <FacultieName/>
        <FacultieName/>
        <FacultieName/>
        <div className={classes.main_space1}>
       <div className={classes.main_space}>
        <a className={classes.addFaculites} href="/faculties/Addfaculties">
          <img src={plus} className={classes.plusIcon} />
        </a>
        </div>
        </div>
    </div>
  );
};
export default FacultiesView;