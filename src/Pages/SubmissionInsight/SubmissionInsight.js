import classes from "./SubmissionInsight.module.css";
import Table from "./Table";
import Search from "./Search";
import { useState } from "react";
import Details from "./Details";

const SubmissionInsight = () => {
  const students = [
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
    {
      id: "it20221928",
      file: "some.pdf",
      time: "2021-02-21",
      status: "pre submitted",
    },
  ];

  const [updatedList, setList] = useState(students);
  const [isEmptyList, setEmpty] = useState(false);

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

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>REPORT</h2>
      <hr className={classes.line}></hr>
      <Table submission="10" enrollment="20" late="20"/>
      <Search onSearch={getSearchValue} />
      <div className={classes.report_title}>
        <span className={classes.title_list}>Student ID</span>
        <span className={classes.title_list}>Submission</span>
        <span className={classes.title_list}>Submitted Time</span>
        <span className={classes.title_list}>Status</span>
      </div>
      {updatedList.map((row)=>{
          return<Details data={row}/>
      })}
      {isEmptyList && <div className={classes.error}>no matching results found !</div>}
    </div>
  );
};
export default SubmissionInsight;
