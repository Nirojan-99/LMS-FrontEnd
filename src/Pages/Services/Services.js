import classes from "./Services.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Services = () => {
    const type = useSelector((state) => state.loging.type);
    const id = useSelector((state) => state.loging.userID);
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
            <a href={type === "admin" ? "services/admin/help_desk" : "services/help_desk"}>
                <div className={classes.links}>HELP DESK</div>
            </a>
            <a href={ type === "admin" ?"services/student_portal":"services/student_portal/view/"+id}>
                <div className={classes.links}>STUDENT PORTAL</div>
            </a>
            <a href="services/timetable">
                <div className={classes.links}>TIMETABLE</div>
            </a>
            <Link to="/services/exams">
                <div className={classes.links}>EXAMS</div>
            </Link>
            <Link to="/services/exam_marks">
                <div className={classes.links}>EXAM MARKS</div>
            </Link>
        </div>
    );
};
export default Services;
