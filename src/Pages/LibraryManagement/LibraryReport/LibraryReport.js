import classes from "./LibraryReport.module.css";
import LibraryDeatils from "./LibraryDetails";
import LibraryReportSearchBar from "./LibraryReportSearchBar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const LibraryReport = () => {
  const users = [
    { userId: "IT20223458", accessTime: "2021-09-07" },
    { userId: "IT20223458", accessTime: "2021-09-07"},
    { userId: "IT20223458", accessTime: "2021-09-07" },
    { userId: "IT20223458", accessTime: "2021-09-07"},
    { userId: "IT20223458", accessTime: "2021-09-07"},
  ];

  const [updatedList, setList] = useState(users);
  const [isEmptyList, setEmpty] = useState(false);
  // const [users, setUsers] = useState([]);
 

  

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:5000/get_users")
  //     .then((res) => {
        
  //       setUsers(res.data);
  //       // history.goBack(); //to go back  should put in SubmitHandler
  //     })
  //     .catch((er) => {
  //       console.log("error");
  //     });
  // }, []);





  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(users);
      return;
    }

    const updated = users.filter((user) => user.userId === value)
    setList(updated)
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>USER REPORT</h2>
      <hr className={classes.line}></hr>
      <h3 className={classes.downloads}> Total Download: 100</h3>
      <LibraryReportSearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
        <span>Student ID</span>
        <span>Access Time</span>
      </div>
      {updatedList.map((row) => {
        return <LibraryDeatils data={row} key={row.userId} />;
      })}
      {isEmptyList && <div className={classes.message}>No Users Found !!!</div>}
    </div>
  );
};

export default LibraryReport;
