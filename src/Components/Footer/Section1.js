import logo from "../../Assets/logo.png";
import classes from "./Footer.module.css";

const Section1 = () => {
  return (
    <div className={classes.box1}>
      <img alt="logo" src={logo} className={classes.footer_logo}></img>

      <div>
        <div className={classes.link_head}>Quick Links</div>
        <ul className={classes.footer_links}>
          <li><a href="/index">Log In</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
          <li><a href="/feedback">Send Feedback</a></li>
        </ul>
      </div>
    </div>
  );
};
 export default Section1;