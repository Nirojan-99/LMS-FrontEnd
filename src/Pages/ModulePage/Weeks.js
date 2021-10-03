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
  const type = useSelector((state) => state.loging.type);
  const [weeks, setWeeks] = useState([]);
  const [Loaded, setLoaded] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_week?module=" + module, {
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

  const addWeek = () => {
    axios
      .post(
        "http://localhost:5000/admin/add_week",
        { week: last+1, module },
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
        } else if (res.data.ack === true) {
          window.location.reload();
        }
      })
      .catch((er) => {
        console.log("error");
      });
  };
  const data = weeks.map((row) => {
    return +row.week;
  });
  let last;
  if (data.length === 0) {
    last = 0;
  } else {
    last = data.at(-1);
  }

  return (
    <>
      {weeks.map((week) => {
        return <Week row={week} week={week._id} key={week._id} />;
      })}
      {(type === "admin" || type === "lecturer") && <div onClick={addWeek} className={classes.addWeek}>
        Add week {last + 1}
      </div>}
      {Loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Weeks;
