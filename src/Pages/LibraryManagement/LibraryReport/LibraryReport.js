import classes from "./LibraryReport.module.css";
import LibraryDeatils from "./LibraryDetails";
import LibraryReportSearchBar from "./LibraryReportSearchBar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import generatePDF from "./generatePDF";

const LibraryReport = (props) => {
  const id = props.match.params.ID;

  const [students, setStudents] = useState([]);
  const [updatedList, setList] = useState([]);
  const [isEmptyList, setEmpty] = useState(false);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/library/get_insight?bookID=" + id)
      .then((res) => {
        if (res.data.students) {
          setStudents(res.data.students);
          setList(res.data.students);
        }else{
          setEmpty(true)
        }
        
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const getSearchValue = (value) => {
    setEmpty(false);
    if (!value.trim()) {
      setEmpty(false);
      setList(students);
      return;
    }

    const updated = students.filter((user) =>
      user.id.toUpperCase().includes(value.toUpperCase())
    );
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.head_cont}>
      <h2 className={classes.title}>BOOK DOWNLOAD REPORT</h2>
      <a onClick={()=>{generatePDF(students,id)}}>Generate PDF</a>
      </div>
      
      <hr className={classes.line}></hr>
      <h3 className={classes.downloads}> Total Download: {students.length}</h3>
      <div className={classes.search_bar}>
        <LibraryReportSearchBar onSearch={getSearchValue} />
      </div>

      <div className={classes.report_container}>
        <span>Student ID</span>
        <span>Access Time</span>
      </div>
      {!isEmptyList && updatedList.map((row) => {
        return <LibraryDeatils data={row} key={row.userId} />;
      })}
      {isEmptyList && <div className={classes.message}>No Users Found !!!</div>}
    </div>
  );
};

export default LibraryReport;
