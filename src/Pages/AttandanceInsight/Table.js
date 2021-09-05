import classes from "./Table.module.css";

const ModulePageInsights = (props) => {
    return <div className={classes.container}>
        <table className={classes.table_container}>
            <tr>
                <td>Total Attandees</td>
                <td>{props.viewers}</td>
            </tr>
            {/* <tr>
                <td>Total Enrollments</td>
                <td>{props.enrollment}</td>
            </tr> */}
            {/* <tr>
                <td>Last Updated date</td>
                <td>{props.editDate}</td>
            </tr> */}
        </table>
    </div>;
  };
  
  export default ModulePageInsights;