import Aside from "./Components/Aside";
import classes from './ProfilePage.module.css';
import UserGrade from './Components/Main';

const ProfilePage = () => {
  return (
    <main className={classes.mainSec}>
      <div className={classes.aside}>
        <Aside />
      </div>
      <div className={classes.main_side}>
        <UserGrade/>

      </div>
    </main>
  );
};
export default ProfilePage;
