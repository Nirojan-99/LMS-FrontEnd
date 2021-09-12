import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import classes from "./WeekForumView.module.css";
import forum from "../../../Assets/forum.png";
import WeekForum from "./WeekForum";

const WeekForumView = (props) => {
  const moduleID=props.moduleid;
  const [topicForums, setTopicForums]=useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/ForumManagement/get_topicForums?moduleID="+moduleID)
      .then((res) => {
        console.log(res.data);
        setTopicForums(res.data);
        
        
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  return (

    
    
    <div className={classes.week_container} >
      {topicForums.map((row) => {
        return <WeekForum data={row} key={row._id} />;
      })}
     
      
    </div>
  );
};

export default WeekForumView;
