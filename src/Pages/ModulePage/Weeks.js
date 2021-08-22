import Week from "./Components/Week/Week";
import { useState } from "react";

const Weeks = () => {
  const datas = [
    // {
    //   _id: "2",
    //   week: "1",
    //   module: "it2020",
    //   title: "lecture 1",
    //   visibility: "visible",
    //   type: "file",
    // },
    // {
    //   _id: "2",
    //   week: "2",
    //   module: "it2020",
    //   title: "lecture 1",
    //   visibility: "visible",
    //   type: "file",
    // },
  ];

  const addWeek = () => {};
  return (
    <>
      {datas.map((row) => {
        return <Week row={row} />;
      })}
    </>
  );
};

export default Weeks;
