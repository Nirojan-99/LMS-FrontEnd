import Aside from "./Components/Aside/Aside";
import classes from "./ModulePage.module.css";
import Weeks from "./Weeks";
import WeekForumView from "../ForumManagement/WeekForumView/WeekForumView";
import { useState, useEffect } from "react";
import { logout } from "../../Store/auth";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import Loader from "../../Components/Loader/Loader";

const ModulePage = (props) => {
  const [weeks, setWeeks] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [grades, setGrades] = useState(false);
  const [discussions, setDiscussions] = useState(false);
  const moduleID = props.match.params.moduleID;
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.loging.token);
  const id = useSelector((state) => state.loging.userID);

  const showWeeks = () => {
    setWeeks(true);
    setGrades(false);
    setDiscussions(false);
  };
  const showGrades = () => {
    setWeeks(false);
    setGrades(true);
    setDiscussions(false);
  };
  const showDiscussions = () => {
    setWeeks(false);
    setGrades(false);
    setDiscussions(true);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/admin//check_enrollment?moduleID=" +
          moduleID +
          "&id=" +
          id,

        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.auth === false) {
          dispatch(logout());
        } else if (resp.data.ack === false) {
          history.replace("/faculties/enroll/" + moduleID);
        } else {
          setLoaded(true);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const moduleid = props.match.params.moduleID;
  return (
    <>
      {loaded && (
        <main className={classes.mainSec}>
          <div className={classes.aside}>
            <Aside
              moduleID={moduleid}
              showWeeks={showWeeks}
              showGrades={showGrades}
              showDiscussions={showDiscussions}
            />
          </div>
          {weeks && (
            <div className={classes.main_side}>
              <Weeks moduleid={moduleid} />
            </div>
          )}
          {discussions && (
            <div className={classes.main_side}>
              <WeekForumView moduleid={moduleid} />
            </div>
          )}
        </main>
      )}
      {!loaded && <div className={classes.loader}><Loader/></div>}
    </>
  );
};
export default ModulePage;
