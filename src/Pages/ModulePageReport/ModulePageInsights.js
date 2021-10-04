import classes from "./ModulePageInsights.module.css";
import Table from "./Table";
import SearchBar from "./SearchBar";
import Details from "./Details";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import generatePDF from "./PDFGenerate";

const ModulePageInsights = (props) => {
  const material = props.match.params.moduleID;

  useEffect(() => {
    axios
      .get("http://localhost:5000/insight/material?materialID=" + material)
      .then((resp) => {
        setStudents(resp.data.students);
        setList(resp.data.students);
        if (!resp.data.students) {
          setLoaded(true);
          setIsEmpty(true);
        }
        axios
          .get(
            "http://localhost:5000/admin/get_material/date?materialID=" +
              material
          )
          .then((resp) => {
            setEditedDate(resp.data.date_time);
            setLoaded(true);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const [updatedList, setList] = useState([]);
  const [isEmptyList, setEmpty] = useState(false);
  const [students, setStudents] = useState([]);
  const [editedDate, setEditedDate] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState();

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(students);
      return;
    }

    const updated = students.filter((student) =>
      student.student.toUpperCase().includes(value.toUpperCase())
    );
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <>
      {loaded && students && (
        <div className={classes.container}>
          <div className={classes.head_container}>
            <h2 className={classes.title}>REPORT</h2>
            <a
              // href={
              //   "http://localhost:5000/Reports/ModuleMaterial/insight" +
              //   material +
              //   ".pdf"
              // }
              onClick={()=>{generatePDF(students,material)}}
              className={classes.btn_pdf}
            >
              Generate PDF
            </a>
          </div>

          {/* <hr className={classes.line}></hr> */}
          <Table editDate={editedDate} viewers={students.length} />
          <SearchBar onSearch={getSearchValue} />
          <div className={classes.report_container}>
            <span>Student ID</span>
            <span>Access Time</span>
          </div>
          {updatedList.map((row) => {
            return <Details data={row} key={row.id} />;
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

export default ModulePageInsights;
