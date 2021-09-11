import React, { useState } from "react";

import classes from "./ReplyForumView.module.css";



const ReplyForumView = (props) => {
  
  const submitHandler = (event) => {
    event.preventDefault();

  };
  const roleClass =classes.inputs;
  const cardClass =classes.replyCardView;
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
          readOnly
          id="discussForum"
          name="discussForum"
          className={roleClass}
          // value={roleValue}
          // onChange={roleChangeHandler}
          // onBlur={roleBlurHandler}
          rows="3"
        ></textarea>

        <div className={classes.inline}>
          {/* <button type="submit" className={classes.add}>
            Edit
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default ReplyForumView;
