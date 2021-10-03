import classes from "./Aside.module.css";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Aside = (props) => {

  let moduleID = props.moduleID;
  const [weeks,setWeeks] = useState([])
  const token = useSelector((state) => state.loging.token);
  const dispatch =useDispatch()

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_week?module=" + moduleID,{
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((resp) => {
          setWeeks(resp.data)
      });
  }, []);
  return (
    <aside className={classes.aside}>
      <h3>Module Name</h3>
      <Navigation weeks={weeks} showWeeks={props.showWeeks} showGrades={props.showGrades} showDiscussions={props.showDiscussions}/>
    </aside>
  );
};

export default Aside;
