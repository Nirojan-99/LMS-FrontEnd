import classes from "./Week.module.css";
import WeekContainer from "./WeekMaterial";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";

const Week = (props) => {
  const [isempty, setIsEmpty] = useState(false);
  const userType = useSelector((state) => state.loging.type);
  const token = useSelector((state) => state.loging.token);
  const dispatch = useDispatch()

  if (props.row.contents == null) {
    setIsEmpty(true);
  }

  const week = props.row.contents;

  const [contents, setContents] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/get_materials?contents=" + week, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if(res.data.auth === false){
          dispatch(logout())
        }else if (res.data.available !== false) {
          setContents(res.data);
          setLoaded(false);
        } else {
          setContents([]);
          setLoaded(false);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  let visibleCount = contents.filter((row) => {
    return row.visibility === "visible";
  });

  return (
    <div className={classes.week_container} id={props.row.week}>
      <div className={classes.week_box}>
        <div className={classes.week_title} id={props.id}>
          {"WEEK  " + props.row.week}
        </div>
        {contents.map((row) => {
          return <WeekContainer key={row._id} week={props.week} data={row} />;
        })}
        {contents.length === 0 || visibleCount.length === 0 ? (
          <span className={classes.noMaterials}>No materials available !!</span>
        ) : null}
        <div className={classes.loader}>{loaded && <Loader />}</div>

        {userType === "admin" && (
          <>
            <div className={classes.addNew}>
              <a href={"select_type/" + props.row._id} className={classes.add}>
                Add New
              </a>
            </div>
            {/* <hr className={classes.line}></hr> */}
          </>
        )}
      </div>
    </div>
  );
};
export default Week;
