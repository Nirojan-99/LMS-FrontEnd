import classes from "./Semester.module.css"
const Semester = () =>{
     return (
         <div className={classes.semesterNumber}>
             <ul>
                <li><a href="/faculties/semesteryear/:semester/Module">1st Semester</a></li>
                <li><a href="/faculties/semesteryear/:semester/Module"> 2st Semester</a></li>
             </ul>
       



         </div>
     )
}
export default Semester;