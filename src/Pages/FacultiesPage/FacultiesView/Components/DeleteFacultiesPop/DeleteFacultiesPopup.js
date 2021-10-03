import classes from "./DeleteFacultiesPopup.module.css";
import { ReactDOM } from "react-dom";
// import React, { useState } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";



import showPwdImg from "../../../../../Assets/showPwdImg.png";
import hidePwdImg from "../../../../../Assets/hidePwdImg.png";


const DeleteFacultiesPopup = (props) => {
  const token = useSelector((state) => state.loging.token);
  const userID = useSelector((state) => state.loging.userID);
  const Id = props.id;
  const [pwd, pwdhandler] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);  
  const [password, getpassword] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [status, setstatus] = useState(false);

  // const [name, setNamehandlder] = useState();

  // const pwdhandler = (event) => {
  //   setpwdhandler(event.target.value);
  // };


  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/user/getpassword?ID=" + userID )
  //     .then((res) => {
       
       
     
  //         console.log(res.data.password);
  //         getpassword(res.data.password);
  //         setLoaded(true);
       
     
  //     })
  //     .catch((er) => {
  //       console.log("error");
  //     });
  // }, []);

  // const [Adminpassword, setpasswordhandlder] = useState();
  // const passwordHandler = (event) => {
  //   setpasswordhandlder(event.target.value);
  // };

  // if(Adminpassword === password){
  //   console.log("correct");
  //   setstatus(true)
  // }
  // else{
  //   console.log("wrong")
  //   setstatus(false)
  // }
  return (
    <>
      <div className={classes.backdrop} onClick={props.hide}></div>
      <div className={classes.container}>
        <h2 className={classes.title}>
          {"Are You Sure to Delete  " + props.name}?
        </h2>
          {/* <label for="Admin Password" className={classes.lables}>
          AdminPassword
        </label>  */}
        <br /> 
        <br /> 
        <br /> 
         {/* <input type="password" className={classes.inputs} onChange = {passwordHandler} value={Adminpassword}></input><br/>   */}

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
         <button className={classes.deleteButton} onClick={props.onDelete} >
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
