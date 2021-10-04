import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";


import classes from "./WeekForum.module.css";
import forum from "../../../Assets/forum.png";

const WeekForum = (props) => {
  const [userName, setUserName] = useState();

  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.loging.token);

  useEffect(() => {
    
        axios
          .get(
            "http://localhost:5000/ForumManagement/get_userName?userID=" +
              props.data.userID, {
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
            }
            else if(res.data.error===true){
              setError("Something wrong. Try again later");
              setIsUploaded(false);
            }
            else{
            setUserName(res.data.name);
            }
          })
          .catch((er) => {
            setError("Something wrong. Try again later");
              setIsUploaded(false);
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
    </>
  );
};

export default WeekForum;
