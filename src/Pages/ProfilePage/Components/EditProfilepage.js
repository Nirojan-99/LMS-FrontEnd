import classes from "./EditProfilepage.css";
import {MdAccountCircle} from "react-icons/md";
import ImageUploader from "./ImageUploader.js";

const EditProfile = () => {
  return (
    <div>
      <form className={classes.form_container}>
        <label htmlFor="username" className={classes.labels}>
          User Name
        </label>
        <input
          //value={username}
          //onChange={usernamehandler}
          className={classes.inputs}
          id="username"
          name="username"
          type="text"
        ></input>

        <label htmlFor="address" className={classes.labels}>
          Address
        </label>
        <input
          //value={address}
          //onChange={addressHandler}
          className={classes.inputs}
          id="address"
          name="address"
          type="text"
        ></input>

        <label htmlFor="phonenumber" className={classes.labels}>
          Contact Number
        </label>
        <input
          //value={phonenumber}
          //onChange={phonenumberhandler}
          className={classes.inputs}
          name="phonenumber"
          id="phonenumber"
          type="tel" 
          pattern="+94[7-9]{2}-[0-9]{3}-[0-9]{4}" value="+94"
        ></input>

        <label htmlFor="password" className={classes.labels}>
          Password
        </label>
        <input
          //value={password}
          //onChange={passwordhandler}
          className={classes.inputs}
          name="password"
          id="password"
          type="password" 
        ></input>
        
        <label htmlFor="aboutme" className={classes.labels}>
          About Me
        </label>
        <textarea row = "10"
          className={classes.inputs}
          id="aboutme"
          name="aboutme"
          type="textarea"
        ></textarea>

        <button type="submit" className={classes.submit}>
          Save Changes
        </button>
      
      <hr className={classes.line}></hr>
      <div>
        <MdAccountCircle size ={100}/>
        <br></br>
        <text className={classes.change}>
          Change Photo
        </text>
      </div>
      <ImageUploader/>
      <button type="submit" className={classes.submit}>
          Save Picture
        </button>
      
      <hr className={classes.line}></hr>
      <button type="submit" className={classes.delete}>
          Delete Account
        </button>
      

      </form>
    </div>
  );
};
export default EditProfile;


