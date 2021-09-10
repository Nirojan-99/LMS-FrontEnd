import classes from "./UserReport.module.css";
import UserTable from "./UserTable";
import UserDeatils from "./UserDetails";
import UserReportSearchBar from "./UserReportSearchBar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../../Components/Loader/Loader";

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [updatedList, setList] = useState(users);
  const [isEmptyList, setEmpty] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/userManagement/get_users")
      .then((res) => {
        setUsers(res.data);
        setList(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(users);
      return;
    }

    // const updated = users.filter(
    //   (user) => user.ID === value || user.name === value
    // );

    const updated = users.filter(
      (user) =>
        user.ID.toUpperCase().includes(value.toUpperCase()) ||
        user.name.toUpperCase().includes(value.toUpperCase()) ||
        user.type.toUpperCase().includes(value.toUpperCase()) ||
        user.faculty.toUpperCase().includes(value.toUpperCase())
    );

    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>USER REPORT</h2>
      <hr className={classes.line}></hr>
      <UserTable totalUsers={users.length} />

      <UserReportSearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
        <span>User ID</span>
        <span>Name</span>
        <span>UserRole</span>
        <span>Faculty</span>
        <span>Edit/Delete</span>
      </div>

      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {updatedList.map((row) => {
        return <UserDeatils data={row} key={row._id} />;
      })}
      {isEmptyList && <div className={classes.message}>No Users Found !!!</div>}
    </div>
  );
};

export default UserReport;
