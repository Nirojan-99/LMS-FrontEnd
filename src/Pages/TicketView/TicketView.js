import classes from "./TicketView.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";

const TicketView = (props) => {
  const ticketID = props.match.params.ticketID;

  const [Iname, setName] = useState();
  const [email, setEmail] = useState();
  const [ID, setID] = useState();
  const [number, setnumber] = useState();
  const [query, setQuery] = useState();
  const [reply, setReply] = useState();
  const [btn, setBTN] = useState("SEND REPLY");
  const [error, setError] = useState(null);

  const userID = useSelector((state) => state.loging.userID);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/helpDesk/get_ticket?ticketID=" + ticketID)
      .then((res) => {
        if (res.data) {
          setName(res.data.username);
          setEmail(res.data.userMail);
          setID(res.data.IDNumber);
          setnumber(res.data.contact);
          setQuery(res.data.query);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const clickedHandler = (event) => {
    setError(null);
  };
  const replyHandler = (event) => {
    setReply(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setBTN("SENDING REPLY..");

    const data = {
      _id: ticketID,
      email: email,
      reply: reply,
    };

    axios
      .post("http://localhost:5000/helpDesk/send_reply" , data)
      .then((res) => {
        setBTN("SENT");
        if (res.data) {
            history.replace("/services/admin/help_desk")
        }
      })
      .catch((er) => {
        console.log("error");
      });
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      <h2 className={classes.title}>Help Desk</h2>
      <hr className={classes.line}></hr>
      <div className={classes.form_container}>
        <form onSubmit={onSubmit}>
          <div className={classes.first}>
            <div className={classes.sub_container}>
              <label className={classes.labels} htmlFor="name">
                Name
              </label>
              <br />
              <input
                readOnly
                type="text"
                id="name"
                value={Iname}
                className={classes.inputs}
              />
            </div>
            <div className={classes.sub_container3}></div>
            <div className={classes.sub_container}>
              <label htmlFor="email" className={classes.labels}>
                Email
              </label>
              <br />
              <input
                type="email"
                readOnly
                id="email"
                value={email}
                className={classes.inputs}
              />
            </div>
          </div>

          <div className={classes.first}>
            <div className={classes.sub_container}>
              <label className={classes.labels} htmlFor="ID">
                ID Number
              </label>
              <br />
              <input
                type="text"
                readOnly
                id="ID"
                value={ID}
                className={classes.inputs}
              />
            </div>
            <div className={classes.sub_container}>
              <label htmlFor="number" className={classes.labels}>
                Conatct Number
              </label>
              <br />
              <input
                type="number"
                readOnly
                id="number"
                value={number}
                className={classes.inputs}
              />
            </div>
          </div>

          <div className={classes.sub_container2}>
            <label htmlFor="query" className={classes.labels}>
              Query
            </label>
            <br />
            <textarea
              type="text"
              readOnly
              id="query"
              value={query}
              className={classes.text}
            />
          </div>
          <div className={classes.sub_container2}>
            <label htmlFor="query" className={classes.labels}>
              Reply*
            </label>
            <br />
            <textarea
              type="text"
              required
              onChange={replyHandler}
              id="query"
              value={reply}
              className={classes.text1}
            />
          </div>
          <button className={classes.btn}>{btn}</button>
        </form>
      </div>
    </div>
  );
};
export default TicketView;
