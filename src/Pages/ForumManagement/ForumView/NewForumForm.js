import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import classes from "./NewForumForm.module.css";
import useInput from "../../UserManagement/AddUser/useInput";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";


const isNotEmpty = (value) => value.trim() !== "";

const NewForumForm = (props) => {
  const forumtype = props.type;
  const parentNormalForumID=props.parentNormalForumID;
  const type = useSelector((state) => state.loging.type);
  const userID = useSelector((state) => state.loging.userID);
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const history=useHistory();

  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);


 //For New Forum
  const moduleID = props.moduleID;
  const weekID = props.weekID;

  const {
    value: roleValue,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRole,
  } = useInput(isNotEmpty);

  let formIsValid = false;

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


  if (roleIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      setError("Forum should not be Empty");
        setIsUploaded(false);
      return;
    }
    if (forumtype == "newforum") {
      const normalForum = {
        weekID: weekID,
        moduleID: moduleID,
        msg: roleValue,
        userID: userID,
        type: type,
      };

      axios
      .post("http://localhost:5000/ForumManagement/add_normalForum", normalForum)
      .then((res) => {
        if(res.data){
         window.location.reload();
        };
        
      })
      .catch((er) => {
        console.log(er);
      });
    } else if (forumtype == "replyforum") {

      const replyForum = {
        parentNormalForumID:parentNormalForumID,
        msg: roleValue,
        userID: userID,
        type: type,
      };

      axios
      .post("http://localhost:5000/ForumManagement/add_replyForum", replyForum)
      .then((res) => {
        if(res.data){
         window.location.reload();
        };
        
      })
      .catch((er) => {
        console.log(er);
      });

    }

    resetRole();
  };
  const roleClass =
    roleHasError && forumtype == "replyforum"
      ? classes.invalid_inputs
      : classes.inputs;
  const cardClass =
    forumtype == "replyforum" ? classes.replyCardView : classes.newCardView;


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
        <div className={classes.Name}>{userName}{"  "}{lmsID}</div>
      </div>
      <hr className={classes.line}></hr>
      <form onSubmit={submitHandler}>
        <textarea
          id="discussForum"
          name="discussForum"
          className={roleClass}
          value={roleValue}
          onChange={roleChangeHandler}
          onBlur={roleBlurHandler}
          rows="3"
        ></textarea>
        {roleHasError && forumtype == "replyforum" && (
          <p className={classes.errorText}>Forum Should not Empty !!!</p>
        )}

        {forumtype == "replyforum" && (
          <div className={classes.inline}>
            <button
              type="submit"
              className={classes.add}
              
            >
              Post
            </button>
            <button
              type="button"
              onClick={props.onCancel}
              className={classes.cancel}
            >
              Cancel
            </button>
          </div>
        )}

        {forumtype == "newforum" && (
          <div className={classes.inlineNew}>
            <button
              type="submit"
              className={classes.add}
            >
              Post
            </button>
          </div>
        )}
      </form>
    </div>
    </>
  );
};

export default NewForumForm;
