import classes from "./DeleteFacultiesPopup.module.css";
import { ReactDOM } from "react-dom";
import React, { useState } from "react";

import showPwdImg from "../../../../../Assets/showPwdImg.png";
import hidePwdImg from "../../../../../Assets/hidePwdImg.png";


const DeleteFacultiesPopup = (props) => {
  const Id = props.id;
  const [pwd, pwdhandler] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);  
  // const [name, setNamehandlder] = useState();

  // const pwdhandler = (event) => {
  //   setpwdhandler(event.target.value);
  // };

  return (
    <>
      <div className={classes.backdrop} onClick={props.hide}></div>
      <div className={classes.container}>
        <h2 className={classes.title}>
          {"Are You Sure to Delete  " + props.name}?
        </h2>
         {/* <label for="Admin Password" className={classes.lables}>
          AdminPassword
        </label> */}
        <br /> 
        <br /> 
        <br /> 
        {/* <input type="password" className={classes.inputs}></input><br/>  */}

        {/* <input
          name="pwd"
          placeholder="Enter Password"
          className={classes.inputs}
          type={isRevealPwd ? "text" : "password"}
          value={pwd}
         
        /> */}
        {/* <img
       
          title={isRevealPwd ? "Show password" : "Hide password"}
          src={isRevealPwd ? showPwdImg : hidePwdImg}
          className={classes.img}
          onClick={() => setIsRevealPwd((prevState) => !prevState)}
        /> */}

        <div className={classes.buttons}>
          <button className={classes.deleteButton} onClick={props.onDelete}>
            Delete
          </button>
          <div className={classes.cancel} onClick={props.hide}>
            Cancel
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteFacultiesPopup;
