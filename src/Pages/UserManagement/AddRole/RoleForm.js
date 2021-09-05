import React, { useState } from "react";

import classes from "./RoleForm.module.css";
import useInput from "../AddUser/useInput";

const isNotEmpty = (value) => value.trim() !== "";

const RoleForm = (props) => {
  const {
    value: roleValue,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRole,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (roleIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(roleValue);

    resetRole();
  };
  const roleClass = roleHasError ? classes.invalid_inputs : classes.inputs;
  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>Add Role</h2>
      <hr className={classes.line}></hr>
      <form onSubmit={submitHandler}>
        <label className={classes.label}>Role</label>
        <input
          type="text"
          className={roleClass}
          value={roleValue}
          onChange={roleChangeHandler}
          onBlur={roleBlurHandler}
        />
        {roleHasError && (
          <p className={classes.errorText}>Please Enter a Role!!!</p>
        )}
        <div className={classes.inline}>
          <button type="submit" className={classes.add} disabled={!formIsValid}>
            ADD
          </button>
          <button
            type="button"
            onClick={props.onCancel}
            className={classes.cancel}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
