import classes from "./Footer.module.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Bottom from "./Bottom";

const Footer = () => {
  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.box0}></div>
        <Section1 />
        <Section2 />
        <Section3 />
        <div className={classes.box0}></div>
      </footer>
      <Bottom />
      
    </>
  );
};

export default Footer;
