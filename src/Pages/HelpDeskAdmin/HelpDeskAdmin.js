import classes from "./HelpDesk.module.css";
import Details from "./Details";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

const HelpDeskAdmin = () => {
  const [queries, setQueries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/helpDesk/get_tickets")
      .then((res) => {
        setQueries(res.data);
        setLoaded(true);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);
  return (
    <>
      {loaded && queries && (
        <div className={classes.container}>
          <h2 className={classes.title}>E-Tickets</h2>
          <hr className={classes.line}></hr>
          {queries.map((row) => {
            return <Details data={row} />;
          })}
        </div>
      )}
      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {!queries && <div className={classes.no_data}>no tickets available !!</div>}
    </>
  );
};

export default HelpDeskAdmin;
