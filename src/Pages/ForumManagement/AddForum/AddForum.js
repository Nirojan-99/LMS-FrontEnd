import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import classes from "./AddForum.module.css";

import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";


const AddForum = (props) => {
  const history = useHistory();
  const weekID = props.match.params.week;

  const type = useSelector((state) => state.loging.type);
  const userID = useSelector((state) => state.loging.userID);
  const userType = useSelector((state) => state.loging.type);

  const [topic, setTopic] = useState();
  const [msg, setMsg] = useState();
  const [visibility, setVisibility] = useState();
  const [moduleID, setModuleID] = useState();
  const [weekNo, setWeekNo] = useState();

  const [isUploaded, setIsUploaded] = useState(true);
  const [error, setError] = useState(null);


  const TopicHandler = (event) => {
    setTopic(event.target.value);
  };
  const MsgHandler = (event) => {
    setMsg(event.target.value);
  };
  const VisibilityHandler = (event) => {
    setVisibility(event.target.value);
  };

  const CancelHandler=(event)=>{
    event.preventDefault();
    history.goBack();
  }


  useEffect(() => {
    axios
      .get("http://localhost:5000/ForumManagement/get_moduleID?weekID="+weekID)
      .then((res) => {
        setModuleID(res.data.module);
        setWeekNo(res.data.week);
        
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if(topic ==null || msg==null || msg.trim()=="" || topic.trim()==""){
      setError("Please Fill the Field");
      setIsUploaded(false);
      return;
    }

    const forum = {
      topic: topic,
      weekID: weekID,
      weekNo: weekNo,
      moduleID: moduleID,
      msg: msg,
      // visibility: visibility,
      visibility: "visible",
      userID:userID,
      type:type
    };

    axios
      .post("http://localhost:5000/ForumManagement/add_forum", forum)
      .then((res) => {
        if(res.data){
          history.goBack();
        };
        
      })
      .catch((er) => {
        console.log(er);
      });
  }
  const clickedHandler = (event) => {
    setIsUploaded(true);
  };
  
  return (
    <>
    {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
    {userType==="admin" && (
    <div className={classes.CardView}>
      <h2 className={classes.title}>ADD DISCUSSION FORUM</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <label for="userID" className={classes.lables}>
          Topic :
        </label>
        <br />
        <input
          type="text"
          onChange={TopicHandler}
          value={topic}
          className={classes.inputs}
        ></input>
        <label for="discussForum" className={classes.lables}>
          Discussion Message :
        </label>
        <br />
        <textarea
          id="discussForum"
          name="discussForum"
          className={classes.textarea}
          value={msg}
          onChange={MsgHandler}
        ></textarea>

        {/* <label for="faculty" className={classes.lables}>
          Visibility to the Student
        </label>
        <br />
        <input
          type="radio"
          name="visibility"
          id="visible"
          value="visible"
          onChange={VisibilityHandler}
          className={classes.radio}
        ></input>
        <label className={classes.radioLabel}>Visible</label>
        <br />
        <input
          type="radio"
          name="visibility"
          id="invisible"
          value="invisible"
          onChange={VisibilityHandler}
          className={classes.radio}
        ></input>
        <label className={classes.radioLabel}>Invisible</label>
        <br /> */}

        <div className={classes.inline}>
          <button className={classes.btnUpdate}>ADD FORUM</button>
          <button className={classes.btnCancel} onClick={CancelHandler}>CANCEL</button>
        </div>
      </form>
    </div>)}
    </>
  );
};

export default AddForum;
