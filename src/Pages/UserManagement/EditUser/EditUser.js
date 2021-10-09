import classes from "./EditUser.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";
import { logout } from "../../../Store/auth";
import Success from "../../../Components/SuccessPopup/Success";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.loging.type);

  const history = useHistory();
  const id = props.match.params.editID;
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const token = useSelector((state) => state.loging.token);
  const [success, setSuccess] = useState(false);

  const [userID, setUserID] = useState();
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
      .get("http://localhost:5000/userManagement/edit_user?id=" + id, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized!");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 800);
        } else if (res.data.fetch === false) {
          setError("Requested ID is wrong");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 800);
        } else if (res.data.noData === true) {
          setError("Cann't find user");
          setIsUploaded(false);
          setTimeout(() => {
            history.goBack();
          }, 600);
        } else if (res.data.dbError === true) {
          setError("Cann't connect with database");
          setIsUploaded(false);
          setTimeout(() => {
            history.goBack();
          }, 600);
        } else {
          setUserID(res.data.ID);
          setEmail(res.data.email);
          setName(res.data.name);
          setDOB(res.data.date);
          setContact(res.data.contact);
          setAddress(res.data.address);
          setFaculty(res.data.faculty);
          setRole(res.data.type);
          setPassword(res.data.password);
        }

      })
      .catch((er) => {
        setError("Cann't connect with database");
        setIsUploaded(false);
        setTimeout(() => {
          history.goBack();
        }, 600);
      });
  }, []);

  const updateHandler = (event) => {
    event.preventDefault();

    if(name.trim()=="" || dob.trim()=="" || address.trim()=="" || faculty.trim()=="" || role.trim()=="" || password.trim()==""){
        setError("Check the input field. Fill it");
        setIsUploaded(false);
        return;
    }
    if(contact.trim()=="" || contact.length !== 10){
      setError("Invalid Contact Number");
      setIsUploaded(false);
      return;

    }
    if(email.trim()=="" || !email.includes("@") || !email.includes(".com")){
      setError("Invalid Email");
      setIsUploaded(false);
      return;

    }

    const updatedUser = {
      _id: id,
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
      .put("http://localhost:5000/userManagement/update_user", updatedUser, {
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized!");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 800);
        } else if (res.data.fetch === false) {
          setError("Wrong Request");
          setIsUploaded(false);
          setTimeout(() => {
            dispatch(logout());
          }, 800);
        } else if (res.data.updated === false) {
          setError("No Updates");
          setIsUploaded(false);
          setTimeout(() => {
            history.goBack();
          }, 700);
        } else {
          setSuccess(true);
          // history.replace("/user-report");
        }
      })
      .catch((er) => {
        setError("Cann't connect with database");
        setIsUploaded(false);
        setTimeout(() => {
          history.goBack();
        }, 600);
      });
  };

  const CancelHandler = () => {
    history.replace("/user-report");
  };

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
  const clickedHandler = (event) => {
    setIsUploaded(true);
  };
  const onRedirect = () => {
    history.replace("/user-report");
  };

  return (
    <div className={classes.CardView}>
      {!isUploaded && (
        <ErrorPopup error={error} clickedHandler={clickedHandler} />
      )}
      {success && <Success redirect={onRedirect} />}
      <h2 className={classes.title}>EDIT USER</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={updateHandler}>
        <label for="userID" className={classes.lables}>
          User ID :
        </label>
        <br />
        <input
          readOnly
          type="text"
          id="userID"
          name="userID"
          value={userID}
          className={classes.inputs}
        ></input>
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
          type="number"
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
          <option selected="true" value={faculty} hidden>
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
          <button type="submit" className={classes.btnUpdate}>
            UPDATE
          </button>
          <button className={classes.btnCancel} onClick={CancelHandler}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
