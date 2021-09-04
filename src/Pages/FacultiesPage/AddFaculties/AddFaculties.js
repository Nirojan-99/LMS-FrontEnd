
import classes from "./AddFaculties.module.css";
const AddFaculties = (props) =>{

    
    return(<div className={classes.squareview}>
    <h2 className={classes.title}>Add Faculties</h2>
    <hr className={classes.line}></hr>
    <form className={classes.formContainer}>
    <label for="FacultieName" className={classes.lables}>Facultie Name:</label><br/>
    <input type="text" id="FacultieName"  name="FacultieName" className={classes.inputs}/>

    <label for="FacultieID" className={classes.lables}>Facultie ID: </label><br/>
    <input type="text" id="FacultieID"  name="FacultieID" className={classes.inputs}/>

    <label for="FacultieIncharge" className={classes.lables}>Facultie Incharge :</label><br/>
    <input type="text" id="FacultieIncharge"  name="FacultieIncharge " className={classes.inputs}/>
    <button className={classes.save}>ADD</button>
    </form>
    </div>
)
} 
export default AddFaculties;

