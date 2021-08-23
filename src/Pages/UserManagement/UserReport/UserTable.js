import classes from "./UserTable.module.css";

const UserTable = (props) => {
    return <div className={classes.container}>
        <table className={classes.table_container}>
            <tr>
                <td>Total Users</td>
                <td>{props.totalUsers}</td>
            </tr>
        </table>
    </div>;
  };
  
  export default UserTable;