import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import deleteI from "../../../../Assets/delete.svg";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";

import classes from "./ReplyForumView.module.css";

const ReplyForumView = (props) => {
  const currentLoginUserID = useSelector((state) => state.loging.userID);
  const replyForumID = props.data;
  const parentNormalForumID = props.parentNormalForumID;
  const [replyForum, setReplyForum] = useState();
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [postedDate, setPostedDate] = useState();
  const [msg, setMsg] = useState();
  const [userID, setUserID] = useState();

  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loging.type);
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const token = useSelector((state) => state.loging.token);
  const [success, setSuccess] = useState(false);

  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/ForumManagement/get_replyForum?replyForumID=" +
          replyForumID
      )
      .then((res) => {
        if (res.data.noData === true) {
          setError("No Reply Forums");
          setIsUploaded(false);
        } else {
          setReplyForum(res.data);
          setPostedDate(res.data.postedDate);
          setMsg(res.data.msg);
          setUserID(res.data.userID);
          axios
            .get(
              "http://localhost:5000/ForumManagement/get_userName?userID=" +
                res.data.userID,
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
                setError("Requested ID is wrong");
                setIsUploaded(false);
                setTimeout(() => {
                  dispatch(logout());
                }, 600);
              } else if (res.data.noData === true) {
                setError("No Data Avialable");
                setIsUploaded(false);
              } else if (res.data.error === true) {
                setError("Something wrong. Try again later");
                setIsUploaded(false);
              } else {
                setUserName(res.data.name);
                setLmsID(res.data.ID);
              }
            })
            .catch((er) => {
              setError("Something wrong. Try again later");
              setIsUploaded(false);
            });
        }
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
      .put(
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
          }, 700);
        } else if (res.data.fetch === false) {
          setError("Wrong Request");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 700);
        } else if (res.data.updated === false) {
          setError("No Updates");
          setIsUploaded(false);
          setTimeout(() => {
            window.location.reload();
          }, 700);
        } else {
          window.location.reload();
        }
      })
      .catch((er) => {
        setError("Cann't connect with database");
        setIsUploaded(false);
        setTimeout(() => {
          window.location.reload();
        }, 700);
      });
  };

  const MsgChangeHandler = (event) => {
    setMsg(event.target.value);
  };

  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  const clickD = (id) => {
    console.log("Clicked ", parentNormalForumID);
    setOnDelete((state) => !state);
    setOnDeleteID(id);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };

  const deleteMaterial = () => {
    const deleteIDs = {
      _id: deleteID,
      parentNormalForumID: parentNormalForumID,
    };
    axios
      .post(
        "http://localhost:5000/ForumManagement/delete_replyForum",
        deleteIDs,
        {
          headers: { Authorization: "lmsvalidation " + token },
        }
      )
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized!");
          setIsUploaded(false);
          setTimeout(() => {
            // dispatch(logout());
          }, 900);
        } else if (res.data.fetch === false) {
          setError("Wrong Request");
          setIsUploaded(false);
          setTimeout(() => {
            // dispatch(logout());
          }, 900);
        } else if (res.data.deleted === false) {
          setError("Not Deleted ReplyForum");
          setIsUploaded(false);
          setTimeout(() => {
            window.location.reload();
          }, 900);
        } else {
          setOnDelete((state) => !state);
          setIsUploaded(false);
          setError("ReplyForum Deleted!");
          setTimeout(() => {
            window.location.reload();
          }, 900);
        }
      })
      .catch((er) => {
        setIsUploaded(false);
        setError("Something went wrong try again");
        setTimeout(() => {
          window.location.reload();
        }, 600);
      });
  };

  const roleClass = classes.inputs;
  const cardClass = classes.replyCardView;
  return (
    <>
      {onDelete && (
        <DeletePopup hide={hide} onDelete={() => deleteMaterial("id")} />
      )}
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
            {"  ||  "}
            {lmsID}
          </div>
          <div className={classes.Time}>Posted on {postedDate}</div>
        </div>
        <hr className={classes.line}></hr>
        <form onSubmit={submitHandler}>
          <textarea
            readOnly={!((userID === currentLoginUserID) || (userType==="admin"))}
            id="discussForum"
            name="discussForum"
            className={roleClass}
            value={msg}
            onChange={MsgChangeHandler}
            // onBlur={roleBlurHandler}
            rows="3"
          ></textarea>

          <div className={classes.inline}>
            {((userID === currentLoginUserID) || (userType==="admin")) && (
              <>
                <button type="submit" className={classes.add}>
                  Update
                </button>
              </>
            )}
            <span className={classes.icons}>
              {((userID === currentLoginUserID) || (userType==="admin")) && (
                <a>
                  <div
                    className={classes.delete}
                    onClick={() => {
                      clickD(replyForumID);
                    }}
                  >
                    Delete
                  </div>
                </a>
              )}
            </span>
          </div>
        </form>
        {/* <span className={classes.icons}>
          {(userID === currentLoginUserID) && <a>
            <img
              src={deleteI}
              className={classes.img_buttonsD}
              onClick={() => {
                clickD(replyForumID);
              }}
            ></img>
          </a>}
        </span> */}
      </div>
    </>
  );
};

export default ReplyForumView;
