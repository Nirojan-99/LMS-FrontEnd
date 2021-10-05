import classes from "./ModuleEnrollmentReport.module.css";

import SearchBar from "./SearchBar";
import Details from "./Details";
import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import GeneratePDF from "./generateEnrollReport";
import Loader from "../../../Components/Loader/Loader";

const ModuleEnrollmentReport = (props) => {
  const moduleId = props.match.params.moduleId;

  const [students, setStudents] = useState([]);
  const [updatedList, setList] = useState([]);

  const [isEmptyList, setEmpty] = useState(false);
  const [Module, setModule] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [totalEnrollments, settotalEnrollments] = useState("0");
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(true);
  const [load, setLoad] = useState(false);


  const getSearchValue = (value) => {
    setEmpty(false);
    if (!value.trim()) {
      setEmpty(false);
      setList(students);
      return;
    }

    const updated = students.filter((student) => {
      return (
        student.ID.toUpperCase().includes(value.toUpperCase().trim()) ||
        student.type.toUpperCase().includes(value.toUpperCase().trim()) ||
        student.name.toUpperCase().includes(value.toUpperCase().trim())
      );
    });
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };
  const clickedHandler = (event) => {
    setIsUploaded(true);
  };
  useEffect(() => {
    axios
      .get(
        // Module details fetch
        "http://localhost:5000/Module/get_Moduledetails?moduleId=" + moduleId,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized to get Module !");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1600);
        } else if (res.data.fetch === false) {
          setError("No matching Module details found !");
          setIsUploaded(false);
         
        } else {
          //setmoduleName(res.data[0].Modulename);
          setLoaded(false);
          setModule(res.data);

          //console.log(res.data);

          setLoaded(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });

    axios
      .post(
        "http://localhost:5000/Enroll/get_enrollcount",
        { moduleId: moduleId },
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized to get Module !");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 1600);
        } else if (res.data.students.length !== 0) {
          settotalEnrollments(res.data.students.length);
        }
      })
      .catch((er) => {
        console.log("error");
      });

    axios
      .get("http://localhost:5000/Enroll/get_enroll?id=" + moduleId, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        console.log("ho");
        console.log(res.data);
        if (res.data.ack === false) {
          setLoaded(false);
          
      
         
        } else if (res.data) {
       
          setLoaded(true);
          setList(res.data);
          setStudents(res.data);
          
        }
 
      });
  }, []);



  return (
  <>
    <div className={classes.container}>
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
      {/* <div className={classes.head_cont}> */}
      <div className={classes.head_container}>
        <h2 className={classes.title}>
          {Module.map((row1) => (
            <div>{row1.Modulename.toUpperCase() + " REPORT"}</div>
          ))}
        </h2>
   
        <a
          onClick={() => {
            GeneratePDF(students, moduleId,Module);
          }}
          className={classes.btn_pdf}
        >
          Generate PDF
        </a>
      </div>

      <hr className={classes.line}></hr>

      {Module.map((row) => {
        return (
          <Table
            ModuleName={row.Modulename.toUpperCase()}
            ModuleCode={row.ModuleCode.toUpperCase()}
            LectureInCharage={row.ModuleLectureIncharge.toUpperCase()}
            EnrollmentsKey={row.ModuleEnrollmentkey}
            TotalEnrollments={totalEnrollments}
          />
        );
      })}

      <SearchBar onSearch={getSearchValue} />
      <div className={classes.report_container}>
        <span>Student ID</span>
        <span>Name</span>
        <span>Type</span>
        <span>Faculty</span>
      </div>
      {loaded && updatedList.map((row) => {
        return <Details data={row} key={row.id} />;
      })}
      {!loaded && <div className={classes.message}>no enrollment found !</div> }
      {isEmptyList && <div className={classes.message}>no results found !</div>}
 
    </div>

    </>
  );
};

export default ModuleEnrollmentReport;
