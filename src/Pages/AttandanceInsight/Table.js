import classes from "./Table.module.css";

const ModulePageInsights = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table_container}>
        <tr>
          <td>Total Attandees : </td>
          <td>{props.viewers}</td>
        </tr>
      </table>
    </div>
  );
};

export default ModulePageInsights;
