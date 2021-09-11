import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


import classes from "./NormalForumView.module.css";



const NormalForumView = (props) => {
 const [msg,setMsg]=useState(props.data.msg);
 const userID=props.data.userID;
 const postedDate=props.data.postedDate;
 const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();

 useEffect(() => {
  
      axios
        .get(
          "http://localhost:5000/ForumManagement/get_userName?userID=" +
            userID
        )
        .then((res) => {
          setUserName(res.data.name);
          setLmsID(res.data.ID);
        })
        .catch((er) => {
          console.log("error");
        });
    
}, []);



  const submitHandler = (event) => {
    event.preventDefault();

  };

  const MsgChangeHandler=(event)=>{
    setMsg(event.target.value);

  }
  const roleClass =classes.inputs;
  const cardClass =classes.newCardView;
  return (
    <div className={cardClass}>
      <div className={classes.User}>
        <div className={classes.Avatar}>
          <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        </div>
        <div className={classes.Name}>{userName}{"  "}{lmsID}</div>
        <div className={classes.Time}>{postedDate}</div>
      </div>
      <hr className={classes.line}></hr>
      <form onSubmit={submitHandler}>
        <textarea
          readOnly
          id="discussForum"
          name="discussForum"
          className={roleClass}
          value={msg}
          onChange={MsgChangeHandler}
          rows="3"
        ></textarea>

        <div className={classes.inline}>
          {/* <button type="submit" className={classes.add}>
            Edit
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default NormalForumView;
