import classes from "./ModuleEnrollmentReport.module.css";

import SearchBar from "./SearchBar";
import Details from "./Details";
import { useState } from "react";
import Table from "./Table";


const ModuleEnrollmentReport = () => {

  const students =[
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
    {"id":"it20221928","FirstAccess":"2019-02-21","LastAccess":"2021-02-23"},
 
  ]

  const [updatedList , setList] = useState(students)
  const [isEmptyList , setEmpty] = useState(false)

  const getSearchValue = (value) => {
    if(!value.trim()){
      setEmpty(false)
      setList(students)
      return
    }
   
    const updated = students.filter(student=>student.id === value)
   setList(updated)
   if(updated.length === 0){
    setEmpty(true)
   }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Communication Skills Report</h2>
      <hr className={classes.line}></hr>
      <Table ModuleName={"Communication Skills"} ModuleCode={"IT2010"} LectureInCharage={"Dr.NIMAL"} EnrollmentsKey={"IT2020"} TotalEnrollments={100}/>
      <SearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
      <span>Student ID</span>
      <span>First Access</span>
      <span>Last Access</span>
      </div>
      {updatedList.map((row)=>{
        return <Details data={row} key={row.id}/>;
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    
    </div>
  );
};

export default ModuleEnrollmentReport;
