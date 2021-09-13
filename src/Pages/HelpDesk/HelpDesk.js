import classes from "./HelpDesk.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPopup from "../../Components/ErrorPopup/ErrorPopup";
import { useHistory } from "react-router";
import Success from "../../Components/SuccessPopup/Success";

const HelpDesk = () => {
  const [Iname, setName] = useState();
  const [email, setEmail] = useState();
  const [ID, setID] = useState();
  const [number, setnumber] = useState();
  const [query, setQuery] = useState();
  const [btn, setBTN] = useState("SUBMIT");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const userID = useSelector((state) => state.loging.userID);
  const history = useHistory();

  useEffect(() => {
    axios
      .post("http://localhost:5000/user/find_user", { _id: userID })
      .then((res) => {
        if (res.data.auth !== false) {
          setName(res.data.name);
          setEmail(res.data.email);
          setID(res.data.ID);
          setnumber(res.data.contact);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const clickedHandler = (event) => {
    setError(null);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const IDHandler = (event) => {
    setID(event.target.value);
  };
  const numberHandler = (event) => {
    setnumber(event.target.value);
  };
  const queryhandler = (event) => {
    setQuery(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!Iname.trim()) {
      setError("Invalid Name");
      return;
    } else if (!email.includes("@") || !email.includes(".com")) {
      setError("Invalid email");
      return;
    } else if (!ID.trim()) {
      setError("Invalid ID number");
      return;
    } else if (number.trim().length < 9) {
      setError("Invalid contact Number");
      return;
    } else if (query.trim().length < 10) {
      setError("Invalid query");
      return;
    }

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    const data = {
      username: Iname,
      userID: userID,
      userMail: email,
      IDNumber: ID,
      contact: number,
      query: query,
      date_time: datetime,
    };

    axios
      .post("http://localhost:5000/helpDesk/add_ticket", data)
      .then((res) => {
        if (res.data.ack === true) {
          setSuccess(true);
        } else {
          setError("Unable to submit your Query! try again");
        }
      })
      .catch((er) => {
        console.log("error");
      });
  };

  const onRedirect = () => {
    history.goBack();
  };

  return (
    <div className={classes.container}>
      {error && <ErrorPopup clickedHandler={clickedHandler} error={error} />}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>Help Desk</h2>
      <hr className={classes.line}></hr>
      <div className={classes.form_container}>
        <form onSubmit={onSubmit}>
          <div className={classes.first}>
            <div className={classes.sub_container}>
              <label className={classes.labels} htmlFor="name">
                Name*
              </label>
              <br />
              <input
                type="text"
                required
                id="name"
                onChange={nameHandler}
                value={Iname}
                className={classes.inputs}
              />
            </div>
            <div className={classes.sub_container3}></div>
            <div className={classes.sub_container}>
              <label htmlFor="email" className={classes.labels}>
                Email*
              </label>
              <br />
              <input
                type="email"
                required
                id="email"
                onChange={emailHandler}
                value={email}
                className={classes.inputs}
              />
            </div>
          </div>

          <div className={classes.first}>
            <div className={classes.sub_container}>
              <label className={classes.labels} htmlFor="ID">
                ID Number*
              </label>
              <br />
              <input
                type="text"
                required
                id="ID"
                onChange={IDHandler}
                value={ID}
                className={classes.inputs}
              />
            </div>
            <div className={classes.sub_container}>
              <label htmlFor="number" className={classes.labels}>
                Conatct Number*
              </label>
              <br />
              <input
                type="number"
                required
                id="number"
                onChange={numberHandler}
                value={number}
                className={classes.inputs}
              />
            </div>
          </div>

          <div className={classes.sub_container2}>
            <label htmlFor="query" className={classes.labels}>
              Query*
            </label>
            <br />
            <textarea
              type="text"
              required
              id="query"
              onChange={queryhandler}
              value={query}
              className={classes.text}
            />
          </div>
          <button className={classes.btn}>{btn}</button>
        </form>
      </div>
    </div>
  );
};

export default HelpDesk;
