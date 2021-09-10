import classes from "./ModuleEnrollmentPage.module.css"
const ModuleEnrollment =(props)=>{
    return(
       <div className={classes.ModuleEnrollment_cardView}>
          <h1 className={classes.title}>{props.module}</h1>
          <h3 className={classes.back2}>LectureINcharge:</h3>
          <h1 className={classes.back3}>Enroll</h1>
          <div >
          
          <div className={classes.formContainer}>
           <from >
           <label for="poster" className={classes.lables}><h2>Enrollmentkey</h2></label>
            <input type="Text" id="poster" placeholder="******"  name="companyName" className={classes.inputs}/>

            <button className={classes.save}>SAVE</button>
           </from>
         
</div>

          </div>


       </div>

    )
}
export default ModuleEnrollment;