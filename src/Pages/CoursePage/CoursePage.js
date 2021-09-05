
import classes from "./CoursePage.module.css"
import Course from "./Components/Course"


const CoursePage = (props)=>{
    
    
    
    return(

<div className={classes.Allcourse}>
    <div className={classes.Allcourse_course}>
<Course year="1st Year" />
<Course year="2st Year"/>
<Course year="3st Year"/>
<Course year="4st Year"/>
</div>

</div>

    )
}
export default  CoursePage;
