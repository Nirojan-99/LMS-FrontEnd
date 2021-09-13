import classes from "./ModuleEnrollmentReport.module.css";

import SearchBar from "./SearchBar";
import Details from "./Details";
import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

const ModuleEnrollmentReport = (props) => {
  const moduleId = props.match.params.moduleId;
  const students = [
    { id: "210000005", FirstAccess: "13/9/2021 @ 8:43:27", LastAccess: "13/9/2021 @ 9:43:27" },
    { id: "210000005", FirstAccess: "13/9/2021 @ 8:43:27", LastAccess: "13/9/2021 @ 9:43:27" },

  ];

  const [updatedList, setList] = useState(students);
  const [isEmptyList, setEmpty] = useState(false);
  const [Module, setModule] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [list, setlist] = useState(false);
  const [totalEnrollments, settotalEnrollments] = useState("0");
  const [moduleName, setmoduleName] = useState(false);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(students);
      return;
    }

    const updated = students.filter((student) => student.id === value);
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/Module/get_Modulecheck?moduleId=" + moduleId)
      .then((res) => {
     
        setmoduleName(res.data[0].Modulename);
      
        setModule(res.data);
        
        
 
        console.log(res.data);
     
        setLoaded(true);
      })
      .catch((er) => {
        console.log(er);
      });




      

    axios
      .post("http://localhost:5000/Enroll/get_enrollcount",{moduleId:moduleId})
      .then((resp) => {
        console.log("hiii");
        // setstudentdetails(resp.data);
        // console.log(resp.data);
        console.log("heelo")
     
        
        settotalEnrollments(resp.data.students.length);
       
  
     
        // setUsers(res.data);

        // setLoaded(true);
      })
      .catch((er) => {
        console.log("error");
      });

     
   
     }, []);

     //Module:moduleName

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        {Module.map((row1) => (
          <div>{row1.Modulename}</div>
        ))}
      </h2>
      <hr className={classes.line}></hr>

      {loaded && Module.map((row) => {
        return (
          <Table
            ModuleName={row.Modulename}
            ModuleCode={row.ModuleCode}
            LectureInCharage={row.ModuleLectureIncharge}
            EnrollmentsKey={row.ModuleEnrollmentkey}
            TotalEnrollments={totalEnrollments}
          />
        );
      })}
      {/* <Table
        ModuleName={Module.Modulename}
        ModuleCode={Module.ModuleCode}
        LectureInCharage={Module.ModuleLectureIncharge}
        EnrollmentsKey={Module.ModuleEnrollmentkey}
        TotalEnrollments={100}
      /> */}
      <SearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
        <span>Student ID</span>
        <span>First Access</span>
        <span>Last Access</span>
      </div>
      {updatedList.map((row) => {
        return <Details data={row} key={row.id} />;
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    </div>
  );
};

export default ModuleEnrollmentReport;
