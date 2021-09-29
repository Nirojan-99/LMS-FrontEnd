import classes from "./Services.module.css";
import { useSelector } from "react-redux";

const Services = () => {
  const type = useSelector((state) => state.loging.type);
  return (
    <div className={classes.service_container}>
      <h2 className={classes.title}>Services</h2>
      <hr className={classes.line}></hr>
      <a href="../services/job_portal">
        <div className={classes.links}>JOB PORTAL</div>
      </a>
      <a href="services/digital_library">
        <div className={classes.links}>DIGITAL LIBRARY</div>
      </a>
      <a
        href={
          type === "admin" ? "services/admin/help_desk" : "services/help_desk"
        }
      >
        <div className={classes.links}>HELP DESK</div>
      </a>
      <a href="services/student_portal">
        <div className={classes.links}>STUDENT PORTAL</div>
      </a>
      <a href="services/timetable">
        <div className={classes.links}>TIMETABLE</div>
      </a>
    </div>
  );
};
export default Services;
