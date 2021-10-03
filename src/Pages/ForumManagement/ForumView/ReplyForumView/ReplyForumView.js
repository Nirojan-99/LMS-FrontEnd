import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import classes from "./ReplyForumView.module.css";



const ReplyForumView = (props) => {
  const replyForumID=props.data;
  const [replyForum,setReplyForum]=useState();
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [postedDate, setPostedDate] = useState();
  const [msg, setMsg] = useState();
  
  const submitHandler = (event) => {
    event.preventDefault();

  };


  useEffect(() => {
      axios
          .get(
            "http://localhost:5000/ForumManagement/get_replyForum?replyForumID=" +replyForumID
          )
          .then((res) => {
            setReplyForum(res.data);
            setPostedDate(res.data.postedDate);
            setMsg(res.data.msg);
            axios
            .get(
              "http://localhost:5000/ForumManagement/get_userName?userID=" +
                res.data.userID
            )
            .then((res) => {
              setUserName(res.data.name);
              setLmsID(res.data.ID);
            })
            .catch((er) => {
              console.log("error");
            });
            
          })
          .catch((er) => {
            console.log("error");
          });
  }, []);



  const roleClass =classes.inputs;
  const cardClass =classes.replyCardView;
  return (
    <div className={cardClass}>
      <div className={classes.User}>
        <div className={classes.Avatar}>
          <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        </div>
        <div className={classes.Name}>{userName}{"  "}{lmsID}</div>
        <div className={classes.Time}>Posted on  {postedDate}</div>
      </div>
      <hr className={classes.line}></hr>
      <form onSubmit={submitHandler}>
        <textarea
          readOnly
          id="discussForum"
          name="discussForum"
          className={roleClass}
          value={msg}
          // onChange={roleChangeHandler}
          // onBlur={roleBlurHandler}
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

export default ReplyForumView;
