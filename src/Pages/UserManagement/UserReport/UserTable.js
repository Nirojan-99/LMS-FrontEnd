import classes from "./UserTable.module.css";
import generateUserReport from "./generateUserReport";

const UserTable = (props) => {
    return <div className={classes.container}>
        <table className={classes.table_container}>
            <tr>
                <td>Total Users</td>
                <td>{props.totalUsers}</td>
            </tr>
        </table>
        <button className={classes.add} onClick={()=>generateUserReport(props.allUsers)}>Generate Report</button>
    </div>;
  };
  
  export default UserTable;