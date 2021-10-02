import classes from "./Table.module.css";

const ModulePageInsights = (props) => {
    return <div className={classes.container}>
        <table className={classes.table_container}>
            <tr className={classes.row1}>
                <td>Total Viewers</td>
                <td>{props.viewers}</td>
            </tr>
            <tr>
                <td>Last Updated Date</td>
                <td>{props.editDate}</td>
            </tr>
        </table>
    </div>;
  };
  
  export default ModulePageInsights;