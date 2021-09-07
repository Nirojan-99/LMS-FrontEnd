import React, { useState } from "react";

import RoleForm from "./RoleForm";
import classes from "./NewRole.module.css";
const NewRole = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className={classes.CardView}>
      <h2 className={classes.title}>User Roles</h2>
      <hr className={classes.line}></hr>
      <div className={classes.role_box}>ADMIN</div>
      <div className={classes.role_box}>LECTURER</div>
      <div className={classes.role_box}>INSTRCTOR</div>
      <div className={classes.role_box}>STUDENT</div>
      <div className={classes.newRole}>
        {!isEditing && (
          <button onClick={startEditingHandler}>ADD NEW ROLE</button>
        )}
      </div>
      <div>
        {isEditing && (
          <RoleForm
            // onSaveExpenseData={saveExpenseDataHandler}
            onCancel={stopEditingHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NewRole;
