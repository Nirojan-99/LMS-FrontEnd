import classes from "./AddLink.module.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddLink = (props) => {
  const week = props.match.params.weekID;
  const history = useHistory()


  const [visibleRef,setVisibility] = useState("visible")
  const [link,setLink] = useState()
  const [title,setTitle] = useState()
  const [loaded,setLoaded] = useState("SAVE")

  const onRadioClicked = (event)=>{
     const valueq =  event.target.value
    setVisibility(valueq)
  }

  const linkHandler=(event)=>{
    setLink(event.target.value)
  }

  const titleHandler=(event)=>{
    setTitle(event.target.value)
  }

  const onSubmitted=(event)=>{

    setLoaded("SAVING...")

    const currentdate = new Date();
    const date = currentdate.getDate() + "-" + currentdate.getMonth();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    event.preventDefault();
    const material = {
      type: "link",
      week: week,
      title: title,
      link:link,
      visibility: visibleRef,
      date_time: date + "/" + time,
    };

    axios
      .post("http://localhost:5000/admin/add_material", material)
      .then((resp) => {
        // console.log(resp.data);

        axios
          .get("http://localhost:5000/admin/get_module?week=" + week)
          .then((res) => {
            history.replace("/my-courses/" + res.data[0].module);
          });
      })
      .catch((er) => {
        console.log(er);
      });
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>LINK</h2>
      <hr className={classes.line}></hr>
      <form className={classes.form_container} onSubmit={onSubmitted}>
        <label className={classes.labels} for="link">Link</label><br/>
      <input value={link} onChange={linkHandler} className={classes.inputs} type="text" id="link" required/>

        <label className={classes.labels} for="title">Title</label><br/>
        <input value={title} onChange={titleHandler} className={classes.inputs} id="title" type="text" required/>
        
        <label className={classes.labels} for="title">Visibility</label><br/>

        <input onChange={onRadioClicked}   value="visible" className={classes.radios} id="visible" type="radio" name="visibility" required/>
        <label className={classes.labels_radio} for="visible">Visible</label><br/>

        <input onChange={onRadioClicked}  value="invisible" className={classes.radios} id="invisible" type="radio" name="visibility" required/>
        <label className={classes.labels_radio} for="invisible">Invisible</label><br/>

        <button type="submit" className={classes.submit} >{loaded}</button>
      </form>
    </div>
  );
};

export default AddLink;
