import classes from "./Announcement.module.css";
import plus from "../../Assets/plus.svg";
import List from "./List";
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { useSelector } from "react-redux";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);
  const type = useSelector((state) => state.loging.type);

  useEffect(() => {
    axios
      .get("http://localhost:5000/announcement/get_announcements")
      .then((res) => {
        if (res.data.error !== true) {
          setAnnouncements(res.data);
          setLoaded(true);
          console.log(res.data);
        } else {
          setLoaded(true);
          setEmpty(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <>
      {announcements && loaded && (
        <div className={classes.container}>
          <div className={classes.Announcement_container}>
            <h2 className={classes.title}>ANNOUNCEMENTS</h2>
            <a href={"/dashboard/new_announcement"}>
              {type === "admin" && (
                <div className={classes.add_new}>
                  <img className={classes.image} src={plus} />
                  <span className={classes.prompt}>add Announcement</span>
                </div>
              )}
            </a>
            {empty && (
              <div className={classes.nodata}>No Announcements Avilable !!</div>
            )}
            {announcements.map((row) => {
              return <List data={row} />;
            })}
          </div>
          <div className={classes.side}></div>
        </div>
      )}
      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Announcement;
