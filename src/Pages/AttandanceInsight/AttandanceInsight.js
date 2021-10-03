import classes from "./ModulePageInsights.module.css";
import Table from "./Table";
import SearchBar from "./SearchBar";
import Details from "./Details";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/auth";
import generatePDF from "./GeneratePDF";

const AttandanceInsight = (props) => {
  const material = props.match.params.ID;
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch()
  useEffect(() => {
    axios
      .get("http://localhost:5000/attandance/get_attandances?ID=" + material, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
        if (resp.data.auth === false) {
          dispatch(logout())
        } else if (resp.data.avalilable === false) {
          setLoaded(true);
          setIsEmpty(true);
        } else {
          setStudents(resp.data);
          setList(resp.data);
          setLoaded(true);
        }
      })
      .catch(() => {});
  }, []);

  const [updatedList, setList] = useState([]);
  const [isEmptyList, setEmpty] = useState(false);
  const [students, setStudents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState();

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(students);
      return;
    }

    const updated = students.filter((student) =>
      student.studentName.toUpperCase().includes(value.toUpperCase())
    );
    console.log(value);
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <>
      {loaded && !isEmpty && students && (
        <div className={classes.container}>
          <div className={classes.head_container}>
          <h2 className={classes.title}>REPORT</h2>
          <a onClick={()=>{generatePDF(students,material)}} className={classes.btn_pdf}>Generate PDF</a>
          </div>
          
          <hr className={classes.line}></hr>
          <Table viewers={students.length} />
          <SearchBar onSearch={getSearchValue} />
          <div className={classes.report_container}>
            <span>Student Name</span>
            <span>Marked Time</span>
          </div>
          {updatedList.map((row) => {
            return <Details data={row} />;
          })}
          {isEmptyList && (
            <div className={classes.message}>no results found !</div>
          )}
        </div>
      )}
      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {isEmpty && <div className={classes.no_data}>no data available !!</div>}
    </>
  );
};

export default AttandanceInsight;
