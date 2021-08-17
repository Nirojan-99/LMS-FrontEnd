import classes from "./Footer.module.css";
import facebook from '../../Assets/facebook.png'
import insta from '../../Assets/instagram.png'
import linkedIn from '../../Assets/linkedin.png'
import youtube from '../../Assets/youtube (1).png'
import twitter from '../../Assets/twitter.png'

const Section3 = () => {
  return <div className={classes.box3}>
      <ul className={classes.social_media}>
          <li><a href="https://www.facebook.com"><img alt="logo" src={facebook}></img></a></li>
          <li><a href="https://www.instagram.com"><img alt="logo" src={insta}></img></a></li>
          <li><a href="https://www.twitter.com"><img alt="logo" src={twitter}></img></a></li>
          <li><a href="https://www.youtube.com"><img alt="logo" src={youtube}></img></a></li>
          <li><a href="https://www.linkedin.com"><img alt="logo" src={linkedIn}></img></a></li>
      </ul>
  </div>;
};
export default Section3;
