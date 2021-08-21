import classes from "./AddLink.module.css";
import { useRef } from "react";
import { useState } from "react";

const AddLink = (props) => {
  const week = props.match.params.week;
  const module = props.match.params.module;

  const linkRef = useRef()
  const titleRef = useRef()
  const [visibleRef,setVisibility] = useState("visible")

  const onRadioClicked = (event)=>{
     const valueq =  event.target.value
    setVisibility(valueq)
  }

  const onSubmitted=(e)=>{
    e.preventDefault()
    linkRef.current.value.trim()
    titleRef.current.value.trim()

    console.log(linkRef.current.value)
    console.log(titleRef.current.value)
    console.log(visibleRef)
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>LINK</h2>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label className={classes.labels} for="link">Link</label><br/>
        <input ref={linkRef} className={classes.inputs} type="text" id="link" required/>

        <label className={classes.labels} for="title">Title</label><br/>
        <input ref={titleRef} className={classes.inputs} id="title" type="text" required/>
        
        <label className={classes.labels} for="title">Visibility</label><br/>

        <input onChange={onRadioClicked}   value="visible" className={classes.radios} id="visible" type="radio" name="visibility" required/>
        <label className={classes.labels_radio} for="visible">Visible</label><br/>

        <input onChange={onRadioClicked}  value="invisible" className={classes.radios} id="invisible" type="radio" name="visibility" required/>
        <label className={classes.labels_radio} for="invisible">Invisible</label><br/>

        <button type="submit" className={classes.submit} >SAVE</button>
      </form>
    </div>
  );
};

export default AddLink;
