import Aside from "./Components/Aside/Aside";
import classes from "./ModulePage.module.css";
import Weeks from "./Weeks";

const ModulePage = (props) => {
  const moduleid = props.match.params.moduleID;
  return (
    <main className={classes.mainSec}>
      <div className={classes.aside}>
        <Aside moduleID = {moduleid} />
      </div>
      <div className={classes.main_side}>
        <Weeks moduleid={moduleid} />
      </div>
    </main>
  );
};
export default ModulePage;
