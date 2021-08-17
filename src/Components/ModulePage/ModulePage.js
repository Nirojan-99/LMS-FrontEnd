import Aside from "./Components/Aside";
import classes from './ModulePage.module.css'

const ModulePage = () => {
  return (
    <main className={classes.mainSec}>
      <div className={classes.aside}>
        <Aside />
      </div>
      <div className={classes.main_side}>
    
      </div>
    </main>
  );
};
export default ModulePage;
