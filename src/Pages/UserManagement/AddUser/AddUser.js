import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

import classes from "./AddUser.module.css";
import useInput from "./useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isContactNo = (value) => value.trim() !== "";

const AddUser = () => {
  //get today date
  const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const history = useHistory();
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [userID, setUserID] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/userManagement/get_userID")
      .then((res) => {
        setUserID(res.data);
      })
      .catch((er) => {
        console.log("error");
      });
  }, []);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate,
  } = useInput(isNotEmpty);

  const {
    value: contactValue,
    isValid: contactIsValid,
    hasError: contactHasError,
    valueChangeHandler: contactChangeHandler,
    inputBlurHandler: contactBlurHandler,
    reset: resetContact,
  } = useInput(isContactNo);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: facultyValue,
    isValid: facultyIsValid,
    hasError: facultyHasError,
    valueChangeHandler: facultyChangeHandler,
    inputBlurHandler: facultyBlurHandler,
    reset: resetFaculty,
  } = useInput(isNotEmpty);

  const {
    value: roleValue,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRole,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    emailIsValid &&
    nameIsValid &&
    dateIsValid &&
    contactIsValid &&
    addressIsValid &&
    roleIsValid &&
    facultyIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const user = {
      name: nameValue,
      email: emailValue,
      date: dateValue,
      contact: contactValue,
      address: addressValue,
      role: roleValue,
      faculty: facultyValue,
    };

    axios
      .post("http://localhost:5000/userManagement/add_user", user)
      .then((res) => {
        console.log(res.data);
        if (res.data == true) {
          setIsEmailExist(true);
          resetEmail();
        } else {
          resetEmail();
          resetName();
          resetDate();
          resetContact();
          resetAddress();
          resetFaculty();
          resetRole();
          setIsEmailExist(false);
          window.location.reload();
        }
      })
      .catch((er) => {
        console.log(er);
      });
    // if (isEmailExist) {
    //   resetEmail();
    //   resetName();
    //   resetDate();
    //   resetContact();
    //   resetAddress();
    //   resetFaculty();
    //   resetRole();
    //   window. location. reload()

    // } else {

    //   resetEmail();

    // }
  };

  const IDClass = classes.inputs;
  const emailClass = emailHasError ? classes.invalid_inputs : classes.inputs;
  const nameClass = nameHasError ? classes.invalid_inputs : classes.inputs;
  const dateClass = dateHasError ? classes.invalid_inputs : classes.inputs;
  const addressClass = addressHasError
    ? classes.invalid_inputs
    : classes.inputs;
  const contactClass = contactHasError
    ? classes.invalid_inputs
    : classes.inputs;
  const roleClass = roleHasError ? classes.invalid_select : classes.select;
  const facultyClass = facultyHasError
    ? classes.invalid_select
    : classes.select;

  const labelOfEmail = isEmailExist
    ? "Email is Taken. Enter a New Email:"
    : "Email ID";
  const lables = isEmailExist ? classes.invalid_lables : classes.lables;

  const BackHandler = () => {
    history.replace("/user-report");
  };

  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>ADD USER</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <label for="Uname" className={classes.lables}>
          User ID :
        </label>
        <br />
        <input
          type="text"
          id="uID"
          name="uID"
          className={IDClass}
          value={userID}
          readonly
        ></input>
        <label for="email" className={lables}>
          {labelOfEmail}
        </label>
        <br />

        <input
          type="email"
          id="email"
          name="userEmail"
          className={emailClass}
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></input>
        {emailHasError && (
          <p className={classes.errorText}>Please Enter a Valid Email !!!</p>
        )}
        {/* {ISEmailExist && (
          <p className={classes.errorText}> Email is Already Taken. Enter a new Email</p>
        )} */}

        <label for="Uname" className={classes.lables}>
          Name :
        </label>
        <br />
        <input
          type="text"
          id="Uname"
          name="userName"
          className={nameClass}
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        ></input>
        {nameHasError && (
          <p className={classes.errorText}>Please Enter a Name !!!</p>
        )}

        <label for="DOB" className={classes.lables}>
          Date of Birth :
        </label>
        <br />
        <input
          type="date"
          id="DOB"
          name="DOB"
          value={dateValue}
          className={dateClass}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          min="1930-01-01"
          max={getTodayDate}
        ></input>
        {dateHasError && (
          <p className={classes.errorText}>Please Select a Date !!!</p>
        )}

        <label for="contactNo" className={classes.lables}>
          Contact Number :
        </label>
        <br />
        <input
          type="number"
          id="contactNo"
          name="contactNo"
          value={contactValue}
          className={contactClass}
          onChange={contactChangeHandler}
          onBlur={contactBlurHandler}
        ></input>
        {contactHasError && (
          <p className={classes.errorText}>
            Please Enter a Valid Contact No!!!
          </p>
        )}

        <label for="address" className={classes.lables}>
          Address :
        </label>
        <br />
        <input
          id="address"
          name="address"
          className={addressClass}
          value={addressValue}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        ></input>
        {addressHasError && (
          <p className={classes.errorText}>Please Enter a Address !!!</p>
        )}

        <label for="faculty" className={classes.lables}>
          Faculty :
        </label>
        <br />
        <select
          id="faculty"
          name="faculty"
          className={facultyClass}
          value={facultyValue}
          onChange={facultyChangeHandler}
          onBlur={facultyBlurHandler}
        >
          <option selected="true" value="" hidden></option>
          <option value="Computing">Computing</option>
          <option value="Enginnering">Enginnering</option>
          <option value="Bussiness">Bussiness</option>
          <option value="Humanities&Science">Humanities & Science</option>
        </select>
        {facultyHasError && (
          <p className={classes.errorText}>Please Select a Faculty !!!</p>
        )}

        <label for="role" className={classes.lables}>
          Role :
        </label>
        <br />
        <select
          id="role"
          name="role"
          className={roleClass}
          value={roleValue}
          onChange={roleChangeHandler}
          onBlur={roleBlurHandler}
        >
          <option selected="true" value="" hidden></option>
          <option value="admin">Admin</option>
          <option value="lecturer">Lecturer</option>
          <option value="instructor">Instructor</option>
          <option value="student">Student</option>
        </select>
        {roleHasError && (
          <p className={classes.errorText}>Please Select a Role!!!</p>
        )}

        {/* <label for="password" className={classes.lables}>Password :</label><br/>
            <input type="password" id="password"  name="password" className={classes.inputs}></input> */}

        <button disabled={!formIsValid} className={classes.add}>
          ADD
        </button>
      </form>
      <button className={classes.add} onClick={BackHandler}>
        Back
      </button>
    </div>
  );
};

export default AddUser;
