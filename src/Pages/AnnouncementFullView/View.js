import classes from "./View.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import pdf from "../../Assets/pdf.svg";

const View = (props) => {
  const annID = props.match.params.annID;
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [link, setlink] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/announcement/get_announcement?ID=" + annID)
      .then((res) => {
        if (res.data.error !== true) {
          setSubject(res.data.subject);
          setMessage(res.data.message);
          setlink(res.data.link);
          setTime(res.data.time);
          setDate(res.data.date);
          setAuthor(res.data.author);
        } else {
          console.log(res.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.subject}>{subject}</div>
      <div className={classes.message}>{message}</div>
      <div className={classes.footer}>
        <div>
          <img className={classes.image} src={pdf} />
          <a href={link} className={classes.link}>
            {subject}
          </a>
        </div>
        <div className={classes.main}>
          {author} |
          <span className={classes.datedetails}> {date + "/" + time}</span>
        </div>
      </div>
    </div>
  );
};

export default View;
