import classes from "./Aside.module.css";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Aside = (props) => {

  let moduleID = props.moduleID;
  const [weeks,setWeeks] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_week?module=" + moduleID)
      .then((resp) => {
          setWeeks(resp.data)
      });
  }, []);
  return (
    <aside className={classes.aside}>
      <h3>Module Name</h3>
      <Navigation weeks={weeks} />
    </aside>
  );
};

export default Aside;
