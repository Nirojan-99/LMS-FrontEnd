import classes from "./UserTable.module.css";
import generateUserReport from "./generateUserReport";

const UserTable = (props) => {
  const allUsers = props.allUsers;
  var computingUsers = allUsers.filter(function (el) {
    return el.faculty === "Computing";
  });
  var enginneringUsers = allUsers.filter(function (el) {
    return el.faculty === "Enginnering";
  });
  var bussinessUsers = allUsers.filter(function (el) {
    return el.faculty === "Bussiness";
  });
  var HumSciUsers = allUsers.filter(function (el) {
    return el.faculty === "Humanities&Science";
  });

  
  return (
    <div className={classes.container}>
      <table className={classes.table_container}>
        <tr>
          <td>COMPUTING USERS</td>
          <td>{computingUsers.length}</td>
        </tr>
        <tr>
          <td>ENGINNERING USERS</td>
          <td>{enginneringUsers.length}</td>
        </tr>
        <tr>
          <td>BUSSINESS USERS</td>
          <td>{bussinessUsers.length}</td>
        </tr>
        <tr>
          <td>HUMANITIES & SCIENCE USERS</td>
          <td>{HumSciUsers.length}</td>
        </tr>
        <tr>
          <td>TOTAL USERS</td>
          <td>{allUsers.length}</td>
        </tr>
      </table>
      <button
        className={classes.add}
        onClick={() => generateUserReport(allUsers)}
      >
        Generate Report
      </button>
    </div>
  );
};

export default UserTable;
