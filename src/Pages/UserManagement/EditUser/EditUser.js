import classes from "./EditUser.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const EditUser = (props) => {
  const history = useHistory();
  const id = props.match.params.editID;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDOB] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [faculty, setFaculty] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/userManagement/edit_user", { id: id })
      .then((res) => {
        setEmail(res.data.email);
        setName(res.data.name);
        setDOB(res.data.date);
        setContact(res.data.contact);
        setAddress(res.data.address);
        setFaculty(res.data.faculty);
        setRole(res.data.type);
        setPassword(res.data.password);
        // history.goBack(); //to go back  should put in SubmitHandler
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const updateHandler = (event) => {
    event.preventDefault();

    const updatedUser = {
      _id:id,
      name: name,
      email: email,
      date: dob,
      contact: contact,
      address: address,
      faculty: faculty,
      type: role,
      password: password,
    };

    axios
      .post("http://localhost:5000/userManagement/update_user", updatedUser)
      .then((res) => {
        console.log(res.data);
        // setBtn("Saved")
        history.replace("/user-report");
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const CancelHandler=()=>{
    history.replace("/user-report");

  }

  const NameHandler = (event) => {
    setName(event.target.value);
  };
  const EmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const DOBHandler = (event) => {
    setDOB(event.target.value);
  };
  const AddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const ContactHandler = (event) => {
    setContact(event.target.value);
  };
  const FacultyHandler = (event) => {
    setFaculty(event.target.value);
  };
  const RoleHandler = (event) => {
    setRole(event.target.value);
  };
  const PasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  console.log(email, name);
  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>EDIT USER</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={updateHandler}>
        <label for="email" className={classes.lables}>
          Email ID :
        </label>
        <br />
        <input
          onChange={EmailHandler}
          type="email"
          id="email"
          name="userEmail"
          value={email}
          className={classes.inputs}
        ></input>

        <label for="Uname" className={classes.lables}>
          Name :
        </label>
        <br />
        <input
          onChange={NameHandler}
          type="text"
          id="Uname"
          name="userName"
          value={name}
          className={classes.inputs}
        ></input>

        <label for="password" className={classes.lables}>
          Password :
        </label>
        <br />
        <input
          onChange={PasswordHandler}
          type="text"
          id="password"
          name="password"
          value={password}
          className={classes.inputs}
        ></input>

        <label for="DOB" className={classes.lables}>
          Date of Birth :
        </label>
        <br />
        <input
          onChange={DOBHandler}
          type="date"
          id="DOB"
          name="DOB"
          value={dob}
          className={classes.inputs}
        ></input>

        <label for="contactNo" className={classes.lables}>
          Contact Number :
        </label>
        <br />
        <input
          onChange={ContactHandler}
          type="tel"
          id="contactNo"
          name="contactNo"
          value={contact}
          className={classes.inputs}
        ></input>

        <label for="address" className={classes.lables}>
          Address :
        </label>
        <br />
        <input
          onChange={AddressHandler}
          id="address"
          name="address"
          value={address}
          className={classes.inputs}
        ></input>

        <label for="faculty" className={classes.lables}>
          Faculty :
        </label>
        <br />
        <select
          id="faculty"
          name="faculty"
          className={classes.select}
          onChange={FacultyHandler}
        >
          <option selected="true" value={faculty}>
            {faculty}
          </option>
          <option value="Computing">Computing</option>
          <option value="Enginnering">Enginnering</option>
          <option value="Bussiness">Bussiness</option>
          <option value="Humanities&Science">Humanities & Science</option>
        </select>

        <label for="role" className={classes.lables}>
          Role :
        </label>
        <br />
        <select
          id="role"
          name="role"
          className={classes.select}
          onChange={RoleHandler}
          
        >
          <option selected="true" value={role} hidden>
            {role}
          </option>
          <option value="admin">admin</option>
          <option value="lecturer">lecturer</option>
          <option value="instructor">instructor</option>
          <option value="student">student</option>
        </select>

        <div className={classes.inline}>
          <button type="submit" className={classes.btnUpdate}>UPDATE</button>
          <button className={classes.btnCancel} onClick={CancelHandler}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
