import classes from "./AddUser.module.css";
import useInput from "./useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isContactNo = (value) => value.trim() !== "";

const AddUser = () => {
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

    console.log(
      nameValue,
      emailValue,
      dateValue,
      contactValue,
      addressValue,
      roleValue,
      facultyValue
    );

    resetEmail();
    resetName();
    resetDate();
    resetContact();
    resetAddress();
    resetFaculty();
    resetRole();
  };

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

  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>ADD USER</h2>
      <hr className={classes.line}></hr>
      <form className={classes.formContainer} onSubmit={submitHandler}>
        <label for="email" className={classes.lables}>
          Email ID :
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
        ></input>
        {dateHasError && (
          <p className={classes.errorText}>Please Select a Date !!!</p>
        )}

        <label for="contactNo" className={classes.lables}>
          Contact Number :
        </label>
        <br />
        <input
          type="tel"
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
          <option value="Humanities & Science">Humanities & Science</option>
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
          <option value="Admin">Admin</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Senior Lecturer">Senior Lecturer</option>
          <option value="Undergraduate Student">Undergraduate Student</option>
          <option value="Postgraduate Student">Postgraduate Student</option>
          <option value="Professor">Professor</option>
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
    </div>
  );
};

export default AddUser;
