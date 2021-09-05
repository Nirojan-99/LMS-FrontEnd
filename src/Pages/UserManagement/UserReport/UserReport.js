import classes from "./UserReport.module.css";
import UserTable from "./UserTable";
import UserDeatils from "./UserDetails";
import UserReportSearchBar from "./UserReportSearchBar";
import { useState } from "react";

const UserReport = () => {
  const users = [
    { UserID: "IT20223458", name: "Arivu", role: "Student" },
    { UserID: "IT20223458", name: "Arivu", role: "Student" },
    { UserID: "IT20223458", name: "Arivu", role: "Student" },
    { UserID: "IT20223458", name: "Arivu", role: "Student" },
    { UserID: "IT20223458", name: "Arivu", role: "Student" },
  ];

  const [updatedList, setList] = useState(users);
  const [isEmptyList, setEmpty] = useState(false);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(users);
      return;
    }

    const updated = users.filter((user) => user.UserID === value)
    setList(updated)
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>USER REPORT</h2>
      <hr className={classes.line}></hr>
      <UserTable totalUsers={1500} />
      
      <UserReportSearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
        <span>User ID</span>
        <span>Name</span>
        <span>UserRole</span>
        <span>Edit/Delete</span>
      </div>
      {updatedList.map((row) => {
        return <UserDeatils data={row} key={row.UserID} />;
      })}
      {isEmptyList && <div className={classes.message}>No Users Found !!!</div>}
    </div>
  );
};

export default UserReport;
