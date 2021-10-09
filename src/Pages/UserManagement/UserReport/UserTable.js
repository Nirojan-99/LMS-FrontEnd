import classes from "./UserTable.module.css";
import generateUserReport from "./generateUserReport";

const UserTable = (props) => {
  const allUsers = props.allUsers;
  const computingUsers = allUsers.filter(function (el) {
    return el.faculty === "Computing";
  });
  const enginneringUsers = allUsers.filter(function (el) {
    return el.faculty === "Enginnering";
  });
  const bussinessUsers = allUsers.filter(function (el) {
    return el.faculty === "Bussiness";
  });
  const HumSciUsers = allUsers.filter(function (el) {
    return el.faculty === "Humanities&Science";
  });

  const allTypeUsers={
    computingUsers:computingUsers,
    enginneringUsers:enginneringUsers,
    bussinessUsers:bussinessUsers,
    HumSciUsers:HumSciUsers,

  }

  
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
        onClick={() => generateUserReport(allUsers,allTypeUsers)}
      >
        Generate Report
      </button>
    </div>
  );
};

export default UserTable;
