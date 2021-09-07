import react from "react";
import classes from "./Main.module.css";
import { useState } from "react";
import Grades from "../MyGradePage/Grades";

const UserGrade = () => {
  const gradedetail = [
    { id: "2021-02-21", access: "10" },
    { id: "2021-02-21", access: "10" },
    { id: "2021-02-21", access: "10" },
    { id: "2021-02-21", access: "10" },
  ];

  const [updatedList, setList] = useState(gradedetail);
  const [isEmptyList, setEmpty] = useState(false);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(gradedetail);
      return;
    }

    const updated = gradedetail.filter((student) => student.id === value);
    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }
  };

  return (
    <div className={classes.grades_container}>
      <h2 className={classes.title}>communication skills</h2>
      <hr className={classes.line}></hr>
      <div className={classes.report_container}>
        <span>Date</span>
        <span>Grades</span>
      </div>
      {updatedList.map((row) => {
        return <Grades data={row} key={row.id} />;
      })}
      {isEmptyList && <div className={classes.message}>no results found !</div>}
    </div>
  );
};
export default UserGrade;
