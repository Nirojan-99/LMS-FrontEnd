import classes from "./ForumView.module.css";
import React, { useState } from "react";
import NewForumForm from "./NewForumForm";
const ForumView = () => {
  const content =
    "This is a good lecture.I ahcve ofoia jfnafjbshf sfbsijf hjs fjs fi hjhsf nfio aofiaifioanf oifaif ijajij jahi h lan ubfubauf aufbibaiobf abnfba;oibf;af abfajuif nwsfnsif sfnsifnsi nfjs fjsnfoisnfj sfj nsfj sfns fshfj fnwuifwf wjf uw f wf  wf w f wf nJD fubd fdn ";

  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  return (
    <div>
      <div>
        <div className={classes.CardView}>
          <div className={classes.User}>
            <div className={classes.Avatar}>
              <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            </div>
            <div className={classes.Name}>Arivaran IT20223458</div>
            <div className={classes.Time}>Today at 6.00PM</div>
          </div>
          <hr className={classes.line}></hr>
          <div class={classes.Content}>{content}</div>

          <div className={classes.replyForm}>
            {!isEditing && (
              <div className={classes.allbtn}>
                <button onClick={startEditingHandler} className={classes.reply}>
                  Reply
                </button>
                <button className={classes.edit}>Edit</button>
              </div>
            )}
          </div>
        </div>
        <div>
          {isEditing && (
            <NewForumForm type={"replyforum"}
              // onSaveExpenseData={saveExpenseDataHandler}
              onCancel={stopEditingHandler}
            />
          )}
        </div>
      </div>
      <div>
        <NewForumForm type={"newforum"}/>
      </div>
    </div>
  );
};

export default ForumView;
