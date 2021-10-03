import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NewForumForm from "../NewForumForm";
import ReplyForumView from "../ReplyForumView/ReplyForumView";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";

import classes from "./NormalForumView.module.css";

const NormalForumView = (props) => {
  const currentLoginUserID = useSelector((state) => state.loging.userID);
  const replies = props.data.replies;
  const normalForumID = props.data._id;
  const [msg, setMsg] = useState(props.data.msg);
  const userID = props.data.userID;
  const postedDate = props.data.postedDate;
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [showReplies, setShowReplies] = useState(false);

  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loging.type);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const token = useSelector((state) => state.loging.token);
  const [success, setSuccess] = useState(false);

  console.log(userID === currentLoginUserID);
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

    const updatedNormalForum = {
      _id: normalForumID,
      msg: msg,
    };

    axios
      .post(
        "http://localhost:5000/ForumManagement/update_normalForum",
        updatedNormalForum,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized!");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 500);
        } else if (res.data.fetch === false) {
          setError("Wrong Request");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 600);
        } else if (res.data.updated === false) {
          setError("Cann't find user");
          setIsUploaded(false);
          setTimeout(() => {
            window.location.reload();
          }, 600);
        } else {
          window.location.reload();
        }
      })
      .catch((er) => {
        setError("Cann't connect with database");
        setIsUploaded(false);
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
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

  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  return (
    <>
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
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
            readOnly={!(userID === currentLoginUserID)}
            id="discussForum"
            name="discussForum"
            className={roleClass}
            value={msg}
            onChange={MsgChangeHandler}
            rows="3"
          ></textarea>

          <div className={classes.inlineEdit}>
            {userID === currentLoginUserID && (
              <button type="submit" className={classes.add}>
                Update
              </button>
            )}
          </div>
        </form>
        <div className={classes.inline}>
          <div className={classes.replyForm}>
            {!isEditing && (
              <div className={classes.allbtn}>
                <button onClick={startEditingHandler} className={classes.reply}>
                  Reply
                </button>
                <button className={classes.edit} onClick={ShowRepliesHandler}>
                  Replies..
                </button>
              </div>
            )}
          </div>
        </div>
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
            onCancel={stopEditingHandler}
          />
        )}
      </div>
    </>
  );
};

export default NormalForumView;
