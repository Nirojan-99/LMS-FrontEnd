import classes from "./ModulePageInsights.module.css";
import Table from "./Table";
import SearchBar from "./SearchBar";
import Details from "./Details";
import { useState } from "react";

const ModulePageInsights = () => {

  const students =[
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"},
    {"id":"it20221928","access":"2021-02-21"}
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
      <h2 className={classes.title}>REPORT</h2>
      <hr className={classes.line}></hr>
      <Table enrollment={200} viewers={200} />
      <SearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
      <span>Student ID</span>
      <span>Access Time</span>
      </div>
      {updatedList.map((row)=>{
        return <Details data={row} key={row.id}/>;
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    
    </div>
  );
};

export default ModulePageInsights;
