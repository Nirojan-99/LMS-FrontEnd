import Aside from "./Components/Aside/Aside";
import classes from "./ModulePage.module.css";
import Weeks from "./Weeks";
import WeekForumView from "../ForumManagement/WeekForumView/WeekForumView";

import { useState } from "react";

const ModulePage = (props) => {
  const [weeks, setWeeks] = useState(true);
  const [grades, setGrades] = useState(false);
  const [discussions, setDiscussions] = useState(false);

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


  const moduleid = props.match.params.moduleID;
  return (
    <main className={classes.mainSec}>
      <div className={classes.aside}>
        <Aside moduleID = {moduleid} showWeeks={showWeeks} showGrades={showGrades} showDiscussions={showDiscussions}/>
      </div>
      { weeks && <div className={classes.main_side}>
         <Weeks moduleid={moduleid} />
      </div>}
      { discussions && <div className={classes.main_side}>
         <WeekForumView moduleid={moduleid} />
      </div>}
    </main>
  );
};
export default ModulePage;
