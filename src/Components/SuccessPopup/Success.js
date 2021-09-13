import classes from "./Success.module.css";
import set from "../../Assets/set.png";
import { useState, useEffect } from "react";

const Success = (props) => {
  const [counter, setCounter] = useState(10);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 300);
    return () => clearInterval(timer);
  }, [counter]);
 if(counter === 0){
     props.redirect()
     console.log("called")
 }
  return (
    <div className={classes.backdrop}>
      <div className={classes.container}>
        <div className={classes.cont}>
          <img src={set} className={classes.image} />
        </div>
        <h2 className={classes.msg}>Successfully Saved !</h2>
        <button onClick={props.clickedHandler} className={classes.btn}>
          Redirecting({counter})
        </button>
      </div>
    </div>
  );
};

export default Success;
