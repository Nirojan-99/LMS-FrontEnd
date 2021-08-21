import classes from "./Submit.module.css";
import upload from "../../Assets/upload.svg";
import { useState } from "react";

const Submit = () => {

    const [selectedFile, setSelectedFile] = useState();

    const onFileSubmit=()=>{

        const formData = new FormData();
        formData.append("File", selectedFile);
        //   axios.post("../../../",{
    //     method: 'POST',
    //     body: formData,
    // })
    }

    const onFileChanged = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files);
      };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>SUBMISSION</h2>
      <hr className={classes.line}></hr>
      <div className={classes.box}>
        <label htmlFor="file" className={classes.inputs}>
         
          <img src={upload} /><br/>
    
        </label>
        <input required onChange={onFileChanged} className={classes.inputsA} type="file" id="file" name="file" />
      </div>
      <div  className={classes.details}>
      <span>Due date : {}</span><br/>
      <span>Max Size : {}</span><br/>
      <span>status : {}</span>
      </div>
      <button onClick={onFileSubmit} className={classes.btn}>SUBMIT</button>
    </div>
  );
};

export default Submit;
