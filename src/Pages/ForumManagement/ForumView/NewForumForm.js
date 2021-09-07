import React, { useState } from "react";

import classes from "./NewForumForm.module.css";
import useInput from "../../UserManagement/AddUser/useInput";

const isNotEmpty = (value) => value.trim() !== "";

const NewForumForm = (props) => {
  const forumtype = props.type;

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
  const roleClass = (roleHasError && forumtype=="replyforum") ? classes.invalid_inputs : classes.inputs;
  const cardClass= forumtype=="replyforum" ? classes.replyCardView : classes.newCardView;
  return (
    <div className={cardClass}>
      <div className={classes.User}>
        <div className={classes.Avatar}>
          <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        </div>
        <div className={classes.Name}>Arivaran IT20223458</div>
      </div>
      <hr className={classes.line}></hr>
      <form onSubmit={submitHandler}>
        <textarea
          id="discussForum"
          name="discussForum"
          className={roleClass}
          value={roleValue}
          onChange={roleChangeHandler}
          onBlur={roleBlurHandler}
          rows="3"
        ></textarea>
        {(roleHasError && forumtype=="replyforum") && (
          <p className={classes.errorText}>Forum Should not Empty !!!</p>
        )}

        {forumtype == "replyforum" && (
          <div className={classes.inline}>
            <button
              type="submit"
              className={classes.add}
              disabled={!formIsValid}
            >
              Post
            </button>
            <button
              type="button"
              onClick={props.onCancel}
              className={classes.cancel}
            >
              Cancel
            </button>
          </div>
        )}

{forumtype == "newforum" && (
          <div className={classes.inlineNew}>
            <button
              type="submit"
              className={classes.add}
              disabled={!formIsValid}
            >
              Post
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewForumForm;
