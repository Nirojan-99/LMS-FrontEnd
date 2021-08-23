import classes from "./Table.module.css";

const ModulePageInsights = (props) => {
    return <div className={classes.container}>
        <table className={classes.table_container}>
        
            <tr>
                <td>Module Name</td>
                <td>{props.ModuleName}</td>
            </tr>
          
            <tr>
                <td>Module Code</td>
                <td>{props.ModuleCode}</td>
            </tr>
      
            <tr>
                <td>Lecture in Charage</td>
                <td>{props.LectureInCharage}</td>
            </tr>
            <tr>
                <td>Enrollments key</td>
                <td>{props.EnrollmentsKey}</td>
            </tr>
            <tr>
                <td>Total Enrollments</td>
                <td>{props.TotalEnrollments}</td>
            </tr>
           
        </table>
    </div>;
  };
  
  export default ModulePageInsights;