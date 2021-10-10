import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NewForumForm from "../NewForumForm";
import ReplyForumView from "../ReplyForumView/ReplyForumView";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../Store/auth";
import ErrorPopup from "../../../../Components/ErrorPopup/ErrorPopup";
import deleteI from "../../../../Assets/delete.svg";
import DeletePopup from "../../../../Components/DeletePopup/DeletePopup";


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

  const [onDelete, setOnDelete] = useState(false);
  const [deleteID, setOnDeleteID] = useState("");

  console.log(userID === currentLoginUserID);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/ForumManagement/get_userName?userID=" + userID, {
          headers: { Authorization: "lmsvalidation " + token },
        })
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
        }
        else if(res.data.error===true){
          setError("Something wrong. Try again later");
          setIsUploaded(false);
        }
        else{
        setUserName(res.data.name);
        setLmsID(res.data.ID);
        }
      })
      .catch((er) => {
        setError("Something wrong. Try again later");
        setIsUploaded(false);
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedNormalForum = {
      _id: normalForumID,
      msg: msg,
    };

    axios
      .put(
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
          setError("No Update");
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


  const clickD = (id) => {
    setOnDelete((state) => !state);
    setOnDeleteID(id);
  };
  const hide = () => {
    setOnDelete((state) => !state);
  };


  const deleteMaterial = () => {
    
    axios
      .delete(
        "http://localhost:5000/ForumManagement/delete_normalForum?_id="+normalForumID,
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
          setError("Cann't find ReplyForum");
          setIsUploaded(false);
          setTimeout(() => {
            window.location.reload();
          }, 900);
        } else {
          setOnDelete((state) => !state);
          setIsUploaded(false);
          setError("NormalForum Deleted!");
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
            rows="3"
          ></textarea>

          <div className={classes.inlineEdit}>
            {((userID === currentLoginUserID) || (userType==="admin")) && (
              <button type="submit" className={classes.add}>
                Update
              </button>
            )}
            <span className={classes.icons}>
         {((userID === currentLoginUserID) || (userType==="admin")) && <a>
          <div
              className={classes.delete}
              onClick={() => {
                clickD(normalForumID);
              }}
            >Delete</div>
          </a>} 
        </span>
          </div>
        </form>
        {/* <span className={classes.icons}>
         {(userID === currentLoginUserID) && <a>
            <img
              src={deleteI}
              className={classes.img_buttonsD}
              onClick={() => {
                clickD(normalForumID);
              }}
            ></img>
          </a>} 
        </span> */}
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
            return <ReplyForumView data={row} key={i} parentNormalForumID={normalForumID}/>;
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
