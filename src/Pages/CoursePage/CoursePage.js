
import classes from "./CoursePage.module.css"
import Course from "./Components/Course"


const CoursePage = (props)=>{
    
    
    
    return(

<div className={classes.Allcourse}>
    <div className={classes.Allcourse_course}>
<Course/>
<Course/>
<Course/>
<Course/>
</div>

</div>

    )
}
export default  CoursePage;
