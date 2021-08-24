import { getDefaultNormalizer } from "@testing-library/react";
import classes from "./EditUser.module.css";

const EditUser = () => {
    const email="arivu2000@gmail.com";
  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>EDIT USER</h2>
        <hr className={classes.line}></hr>
        <form className={classes.formContainer}>
            <label for="email" className={classes.lables}>Email ID :</label><br/>
            <input type="email" id="email"  name="userEmail" value={email} className={classes.inputs}></input>

            <label for="Uname" className={classes.lables}>Name :</label><br/>
            <input type="text" id="Uname"  name="userName" className={classes.inputs}></input>

            <label for="DOB" className={classes.lables}>Date of Birth :</label><br/>
            <input type="date" id="DOB"  name="DOB" className={classes.inputs}></input>

            <label for="contactNo" className={classes.lables}>Contact Number :</label><br/>
            <input type="tel" id="contactNo"  name="contactNo" className={classes.inputs}></input>

            <label for="address" className={classes.lables}>Address :</label><br/>
            <input id="address"  name="address" className={classes.inputs}></input>

            <label for="faculty" className={classes.lables}>Faculty :</label><br/>
            <select id="faculty"  name="faculty" className={classes.select}>
                <option selected="true" disabled="disabled" hidden>Select a Faculty...</option>
                <option value="Computing">Computing</option>
                <option value="Enginnering">Enginnering</option>
                <option value="Bussiness">Bussiness</option>
                <option value="Humanities & Science">Humanities & Science</option>
            </select>

            <label for="role" className={classes.lables}>Role :</label><br/>
            <select id="role"  name="role" className={classes.select}>
                <option selected="true" disabled="disabled" hidden>Select a UserRole...</option>
                <option value="Admin">Admin</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Senior Lecturer">Senior Lecturer</option>
                <option value="Undergraduate Student">Undergraduate Student</option>
                <option value="Postgraduate Student">Postgraduate Student</option>
                <option value="Professor">Professor</option>
            </select>

            <label for="password" className={classes.lables}>Password :</label><br/>
            <input type="password" id="password"  name="password" className={classes.inputs}></input>

            <div className={classes.inline}>
            <button className={classes.btnUpdate}>UPDATE</button>
            <button className={classes.btnCancel}>CANCEL</button>
            </div>
        </form>
    </div>
  );
};

export default EditUser;
