import { useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

import classes from "./ForumView.module.css";
import React, { useState } from "react";
import NewForumForm from "./NewForumForm";
import NormalForumView from "../ForumView/NormalForumView/NormalForumView";

const ForumView = (props) => {
  const moduleID = props.match.params.moduleID;
  const forumID = props.match.params.forumID;
  const weekID = props.match.params.weekID;
  const [msg, setMsg] = useState();
  const [topic, setTopic] = useState();
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [postedDate, setPostedDate] = useState();
  const [normalForums, setNormalForums] = useState([]);

  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.loging.token);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/ForumManagement/get_topicForum?forumID=" +
          forumID
      )
      .then((res) => {
        setUserID(res.data.userID);
        setTopic(res.data.topic);
        setMsg(res.data.msg);
        setPostedDate(res.data.postedDate);

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
      })
      .catch((er) => {
        console.log("error");
      });

    axios
      .get(
        "http://localhost:5000/ForumManagement/get_normalForums?moduleID=" +
          moduleID +
          "&weekID=" +
          weekID
      )
      .then((res) => {
        if (res.data.noData === true) {
          setError("No NormalForum Available");
          setIsUploaded(false);
        } else if (res.data.error === true) {
          setError("Something wrong. Try again later");
          setIsUploaded(false);
        } else {
          setNormalForums(res.data);
        }
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const clickedHandler = (event) => {
    setIsUploaded(true);
  };

  return (
    <>
    {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
      <div className={classes.MainView}>
        <div>
          <div className={classes.CardView}>
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
            <div class={classes.ContentTopic}>{topic}</div>
            <div class={classes.Content}>{msg}</div>
          </div>
        </div>
        <div>
          {normalForums.map((row) => {
            return <NormalForumView data={row} key={row._id} />;
          })}
        </div>
      </div>
      <div>
        <NewForumForm type={"newforum"} moduleID={moduleID} weekID={weekID} />
      </div>
    </>
  );
};

export default ForumView;
