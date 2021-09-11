import classes from "./ContactUs.module.css";
import pin from "../../Assets/pin.svg";
import call from "../../Assets/call.svg";
import mail from "../../Assets/mail.svg";
import world from "../../Assets/world.svg";

const ContactUs = () => {
  return (
    <div className={classes.conatiner}>
      <div className={classes.side}>
        <h2 className={classes.title}>Get In Touch</h2>
        <div className={classes.row}>
          <img className={classes.image} src={pin} />
          <div className={classes.details}>location details</div>
        </div>
        <div className={classes.row}>
          <img className={classes.image} src={call} />
          <div className={classes.details}>(+94) 77 8862 172</div>
        </div>
        <div className={classes.row}>
          <img className={classes.image} src={mail} />
          <div className={classes.details}>example@gamil.com</div>
        </div>
        <div className={classes.row}>
          <img className={classes.image} src={world} />
          <div className={classes.details}>lms.lk</div>
        </div>
      </div>
      <div className={classes.form_Container}>
        <form>
          <label className={classes.labels}>Name</label>
          <input
            //   value={}
            // onChange={}
            type="text"
            className={classes.inputs}
            placeHolder="Your Name"
          />
          <label className={classes.labels}>Email</label>
          <input
            //   value={}
            // onChange={}
            type="text"
            className={classes.inputs}
            placeHolder="Your Mail"
          />
          <label className={classes.labels}>Message</label>
          <textarea
            //   value={}
            // onChange={}
            type="text"
            className={classes.inputsText}
            placeHolder="Your Message"
          />
          <button className={classes.submit}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
