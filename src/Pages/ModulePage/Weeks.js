import Week from "./Components/Week/Week";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import classes from "./ModulePage.module.css";
import { useSelector, useDispatch } from "react-redux";

const Weeks = (props) => {
  const module = props.moduleid;
  const token = useSelector((state) => state.loging.token);
  const [weeks, setWeeks] = useState([]);
  const [Loaded, setLoaded] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_week?module=" + module,{
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        setWeeks(res.data);
        setLoaded(false);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const addWeek = () => {};
  return (
    <>
      {weeks.map((week) => {
        return <Week row={week} week={week._id} key={week._id} />;
      })}
      {Loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Weeks;
