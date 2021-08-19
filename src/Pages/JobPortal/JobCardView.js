import classes from "./JobCardView.module.css";
import jobimg from "../../Assets/job.jpg";
import edit from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";


const JobCardView = (props) => {
  return (
    <div className={classes.card}>
      <img src={jobimg} className={classes.jobPoster}></img>
      <div className={classes.jobname}>{props.jobName}</div>
      <div className={classes.companyname}>{props.jobName}</div>
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
      {/* <div>
          <a href={`job_portal/`+props.jobName} className={classes.viewMore}>VIEW MORE</a>
      </div> */}

      <div className={classes.icon_container}>
        <a href={`job_portal/editJob/jobID`}><img src={edit} className={classes.icons}/></a>
        <a><img src={deleteIcon} className={classes.icons}/></a>
      </div>
    </div>
  );
};

export default JobCardView;
