import SpecializationName from "./SpecializationName";
import classes from "./AllSpecializationName.module.css";
import plus from "../../../../Assets/plus.svg";

const AllSpecializationName = () => {
  return (
    <div className={classes.space}>
      <div className={classes.spacemore}>
        <SpecializationName SpecializationName="software engineering"/>
      </div>
      <div className={classes.spacemore}>
        <SpecializationName SpecializationName="software engineering"/>
      </div>
      <div className={classes.spacemore}>
        <SpecializationName SpecializationName="software engineering"/>
      </div>
      <div className={classes.spacemore}>
        <SpecializationName SpecializationName="software engineering"/>
      </div>
      <div className={classes.space_more}>
        <div className={classes.space_more_more}>
        <a className={classes.addcourse} href="/faculties/Addcourse">
          <img src={plus} className={classes.plusIcon} />
        </a>
        </div>
      </div>
    </div>
  );
};
export default AllSpecializationName;
