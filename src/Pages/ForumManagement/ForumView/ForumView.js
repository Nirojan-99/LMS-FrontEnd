import { useEffect } from "react";
import axios from "axios";

import classes from "./ForumView.module.css";
import React, { useState } from "react";
import NewForumForm from "./NewForumForm";
import NormalForumView from "../ForumView/NormalForumView/NormalForumView";

const ForumView = (props) => {
  const moduleID=props.match.params.moduleID;
  const forumID = props.match.params.forumID;
  const weekID=props.match.params.weekID;
  const [msg, setMsg] = useState();
  const [topic, setTopic] = useState();
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [lmsID, setLmsID] = useState();
  const [postedDate, setPostedDate] = useState();
  const [normalForums, setNormalForums]=useState([]);

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

      axios
          .get(
            "http://localhost:5000/ForumManagement/get_normalForums?moduleID=" +moduleID+"&weekID="+weekID
          )
          .then((res) => {
            setNormalForums(res.data);
            
          })
          .catch((er) => {
            console.log("error");
          });
  }, []);

  
  
  // const [isEditing, setIsEditing] = useState(false);

  // const startEditingHandler = () => {
  //   setIsEditing(true);
  // };

  // const stopEditingHandler = () => {
  //   setIsEditing(false);
  // };
  return (
    <div>
      <div>
        <div className={classes.CardView}>
          <div className={classes.User}>
            <div className={classes.Avatar}>
              <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            </div>
            <div className={classes.Name}>{userName}{"  "}{lmsID}</div>
            <div className={classes.Time}>{postedDate}</div>
          </div>
          <hr className={classes.line}></hr>
          <div class={classes.ContentTopic}>{topic}</div>
          <div class={classes.Content}>{msg}</div>

          {/* <div className={classes.replyForm}>
            {!isEditing && (
              <div className={classes.allbtn}>
                <button onClick={startEditingHandler} className={classes.reply}>
                  Reply
                </button>
                <button className={classes.edit}>Edit</button>
              </div>
            )}
          </div> */}
        </div>
        
        {/* <div>
          {isEditing && (
            <NewForumForm
              type={"replyforum"}
              // onSaveExpenseData={saveExpenseDataHandler}
              onCancel={stopEditingHandler}
            />
          )}
        </div> */}
      </div>
        <div>
        {normalForums.map((row) => {
        return <NormalForumView data={row} key={row._id} />;
      })}
        </div>
      <div>
        <NewForumForm type={"newforum"} moduleID={moduleID} weekID={weekID}/>
      </div>
    </div>
  );
};

export default ForumView;
