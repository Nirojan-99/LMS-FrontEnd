import classes from "./AddEvent.css";
import React from "react";

const MyEvents =(props) =>{
           return(<div className={classes.squareview}>
           <h2 className={classes.title}>Add Calendar Event</h2>
           <hr className={classes.line}></hr>
           <form className={classes.formContainer}>
           <label for="EventName" className={classes.lables}>Event  Name:</label><br/>
           <input type="text" id="EventName"  name="EventName" className={classes.inputs}/>
       
           <label for="Select date" className={classes.lables}>Select Date </label><br/>
           <input type="Date" id="Date"  name="Selectdate" className={classes.inputs}/>
       
           
           <button className={classes.save}>Save</button>
           </form>
           </div>
       
    );
}
export default MyEvents;