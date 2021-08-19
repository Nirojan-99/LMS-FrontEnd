import classes from "./JobFullView.module.css"
import jobimg from "../../Assets/job.jpg";

const JobFullView=()=>{
    return( <div className={classes.card}>
        <img src={jobimg} className={classes.jobPoster}></img>
        <div className={classes.jobname}>Job Name</div>
        <div className={classes.companyname}>Company Name</div>
        <div className={classes.description}>
          Video provides a powerful way to help you prove your point. When you
          click Online Video, you can paste in the embed code for the video you
          want to add. You can also type a keyword to search online for the video
          that best fits your document. To make your document look professionally
          produced, Word provides header, footer, cover page, and text box designs
          that complement each other. For example, you can add a matching cover
          page, header, and sidebar. Click Insert and then choose the elements you
          want from the different galleries.
        </div>
       
      </div>);
}

export default JobFullView