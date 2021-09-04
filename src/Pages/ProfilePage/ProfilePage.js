import Aside from "./Components/Aside";
import classes from './ProfilePage.module.css';
import EditProfile from './Components/Main';

const ProfilePage = () => {
  return (
    <main className={classes.mainSec}>
      <div className={classes.aside}>
        <Aside />
      </div>
      <div className={classes.main_side}>
        <EditProfile/>

      </div>
    </main>
  );
};
export default ProfilePage;
