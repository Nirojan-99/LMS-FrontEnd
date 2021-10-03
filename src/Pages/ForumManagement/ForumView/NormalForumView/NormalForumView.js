import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NewForumForm from "../NewForumForm";
import ReplyForumView from "../ReplyForumView/ReplyForumView";

import classes from "./NormalForumView.module.css";

const NormalForumView = (props) => {
  const replies = props.data.replies;
  const normalForumID = props.data._id;
  const [msg, setMsg] = useState(props.data.msg);
  const userID = props.data.userID;
  const postedDate = props.data.postedDate;
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();

  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/ForumManagement/get_userName?userID=" + userID
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

  const MsgChangeHandler = (event) => {
    setMsg(event.target.value);
  };

  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const roleClass = classes.inputs;
  const cardClass = classes.newCardView;

  const ShowRepliesHandler = () => {
    if (showReplies === false) {
      setShowReplies(true);
    } else if (showReplies === true) {
      setShowReplies(false);
    }
  };

  return (
    <>
      <div className={cardClass}>
        <div className={classes.User}>
          <div className={classes.Avatar}>
            <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          </div>
          <div className={classes.Name}>
            {userName}
            {"  "}
            {lmsID}
          </div>
          <div className={classes.Time}>Posted on {postedDate}</div>
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
            <div className={classes.replyForm}>
              {!isEditing && (
                <div className={classes.allbtn}>
                  <button
                    onClick={startEditingHandler}
                    className={classes.reply}
                  >
                    Reply
                  </button>
                  {/* <button className={classes.edit}>Update</button> */}
                  <button className={classes.edit} onClick={ShowRepliesHandler}>
                    Replies..
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {showReplies && (
        <div>
          {replies.map((row, i) => {
            return <ReplyForumView data={row} key={i} />;
          })}
        </div>
      )}
      <div>
        {isEditing && (
          <NewForumForm
            type={"replyforum"}
            parentNormalForumID={normalForumID}
            // onSaveExpenseData={saveExpenseDataHandler}
            onCancel={stopEditingHandler}
          />
        )}
      </div>
    </>
  );
};

export default NormalForumView;
