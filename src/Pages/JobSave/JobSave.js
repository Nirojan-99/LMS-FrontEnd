import classes from "./JobSave.module.css"

const JobSave = ()=>{
    return(<div className={classes.CardView}>
        <h2 className={classes.title}>Add Job</h2>
        <hr className={classes.line}></hr>
        <form className={classes.formContainer}>
            <label for="name" className={classes.lables}>Job Name :</label><br/>
            <input type="text" id="name"  name="jobName" className={classes.inputs}></input>

            <label for="company" className={classes.lables}>Company Name :</label><br/>
            <input type="text" id="company"  name="companyName" className={classes.inputs}></input>

            <label for="details" className={classes.lables}>Details :</label><br/>
            <textarea id="details"  name="details" className={classes.textArea}></textarea>

            <label for="poster" className={classes.lables}>Job Poster :</label><br/>
            <input type="file" id="poster"  name="companyName" className={classes.inputs}></input>

            <button className={classes.save}>SAVE</button>
        </form>
    </div>)
}

export default JobSave;