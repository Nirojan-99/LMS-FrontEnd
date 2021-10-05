import classes from "./Table.module.css";

const ModulePageInsights = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table_container}>
        <tr className={classes.row1}>
          <td>Module Name</td>
          <td>{props.ModuleName}</td>
        </tr>

        <tr className={classes.row1}>
          <td>Module Code</td>
          <td>{props.ModuleCode}</td>
        </tr>

        <tr className={classes.row1}>
          <td>Lecture in Charage</td>
          <td>{props.LectureInCharage}</td>
        </tr>
        <tr className={classes.row1}>
          <td>Enrollments key</td>
          <td>{props.EnrollmentsKey}</td>
        </tr>
        <tr className={classes.row1}>
          <td>Total Enrollments</td>
          <td>{props.TotalEnrollments}</td>
        </tr>
      </table>
    </div>
  );
};

export default ModulePageInsights;
