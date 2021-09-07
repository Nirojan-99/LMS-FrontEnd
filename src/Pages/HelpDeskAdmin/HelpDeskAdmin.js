import classes from "./HelpDesk.module.css";
import Details from "./Details";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import SearchBar from "./SearchBar";

const HelpDeskAdmin = () => {
  const [queries, setQueries] = useState([]);
  const [updatedQueries, setUpdatedQueries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);

  const onSearch = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setUpdatedQueries(queries);
      return;
    }

    const updated = queries.filter((query) =>
      query.username.toUpperCase().includes(value.trim().toUpperCase())
    );
    setUpdatedQueries(updated);
    if (updated.length === 0) {
      setEmpty(true);
    }else{
      setEmpty(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/helpDesk/get_tickets")
      .then((res) => {
        setQueries(res.data);
        setUpdatedQueries(res.data);
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
          {/* <hr className={classes.line}></hr> */}
          <SearchBar onSearch={onSearch} />
          {updatedQueries.map((row) => {
            return <Details data={row} />;
          })}
          {empty && <div className={classes.nomatch}>No match found !</div>}
        </div>
      )}
      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {!queries && (
        <div className={classes.no_data}>No tickets available !!</div>
      )}
    </>
  );
};

export default HelpDeskAdmin;
