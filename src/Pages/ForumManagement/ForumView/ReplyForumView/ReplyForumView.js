import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";

import classes from "./ReplyForumView.module.css";



const ReplyForumView = (props) => {
  const currentLoginUserID = useSelector((state) => state.loging.userID);
  const replyForumID=props.data;
  const [replyForum,setReplyForum]=useState();
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [postedDate, setPostedDate] = useState();
  const [msg, setMsg] = useState();
  const [userID,setUserID]=useState();

  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loging.type);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const token = useSelector((state) => state.loging.token);
  const [success, setSuccess] = useState(false);
  
 


  useEffect(() => {
      axios
          .get(
            "http://localhost:5000/ForumManagement/get_replyForum?replyForumID=" +replyForumID
          )
          .then((res) => {
            setReplyForum(res.data);
            setPostedDate(res.data.postedDate);
            setMsg(res.data.msg);
            setUserID(res.data.userID);
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


  const submitHandler = (event) => {
    event.preventDefault();

    const updatedReplyForum = {
      _id: replyForumID,
      msg: msg,
    };

    axios
      .post(
        "http://localhost:5000/ForumManagement/update_replyForum",
        updatedReplyForum,
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
          setError("Cann't find the ReplyForum");
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

  const clickedHandler = (event) => {
    setIsUploaded(true);
  };


  const roleClass =classes.inputs;
  const cardClass =classes.replyCardView;
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
        <div className={classes.Name}>{userName}{"  "}{lmsID}</div>
        <div className={classes.Time}>Posted on  {postedDate}</div>
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
          // onBlur={roleBlurHandler}
          rows="3"
        ></textarea>

        <div className={classes.inline}>
        {userID === currentLoginUserID && (
              <button type="submit" className={classes.add}>
                Update
              </button>
            )}
        </div>
      </form>
    </div>
    </>
  );
};

export default ReplyForumView;
