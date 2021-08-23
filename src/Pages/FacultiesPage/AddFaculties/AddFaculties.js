
import classes from "./AddFaculties.module.css";
const AddFaculties = (props) =>{

    
    return(<div className={classes.squareview}>
    <h2 className={classes.title}>Add Faculties</h2>
    <hr className={classes.line}></hr>
    <form className={classes.formContainer}>
    <label for="name" className={classes.lables}>Facultie Name:</label><br/>
    <input type="text" id="name"  name="jobName" className={classes.inputs}/>

    <label for="company" className={classes.lables}>Facultie ID: </label><br/>
    <input type="text" id="company"  name="companyName" className={classes.inputs}/>

    <label for="company" className={classes.lables}>Facultie Incharge :</label><br/>
    <input type="text" id="company"  name="companyName" className={classes.inputs}/>
    <button className={classes.save}>ADD</button>
    </form>
    </div>
)
} 
export default AddFaculties;

