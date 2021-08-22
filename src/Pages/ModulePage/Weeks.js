import Week from "./Components/Week/Week";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Weeks = (props) => {
  const module = props.moduleid;

  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_week?module=" + module)
      .then((res) => {
        console.log(res.data);
        setWeeks(res.data);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const addWeek = () => {};
  return (
    <>
      {weeks.map((week) => {
        return <Week row={week} key={week._id} />;
      })}
    </>
  );
};

export default Weeks;
