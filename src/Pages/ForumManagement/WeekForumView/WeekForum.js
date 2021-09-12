import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";


import classes from "./WeekForum.module.css";
import forum from "../../../Assets/forum.png";

const WeekForum = (props) => {

  const [userName, setUserName] = useState();

  useEffect(() => {
    
        axios
          .get(
            "http://localhost:5000/ForumManagement/get_userName?userID=" +
              props.data.userID
          )
          .then((res) => {
            setUserName(res.data.name);
          })
          .catch((er) => {
            console.log("error");
          });
     
      
  }, []);

  return (
   
<a href={"/forum/" + props.data.moduleID +"/"+props.data.weekID+"/" + props.data._id}>
    <div className={classes.week_container} id={props.data.weekNo}>
      <div className={classes.week_box}>
        <div className={classes.week_title} id={props.data.weekNo}>
          {"WEEK  " + props.data.weekNo}
        </div>
        <div className={classes.inline}>
        <img src={forum} className={classes.Avatar}/>

        <div className={classes.content}>
        <h2>{props.data.topic}</h2>
        <h3>{userName}</h3>
        <h4>{props.data.postedDate}</h4>
        </div>
        </div>
        
       
      </div>
    </div>
    </a>
  );
};

export default WeekForum;
