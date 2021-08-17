import classes from "./Footer.module.css";

const Bottom = () => {
  return (
    <div className={classes.footer_copyR}>
      <ul>
        <li>
          <a href="">https://LMS.com</a>
        </li>
        <li>
          <a href="">example@gmail.com</a>
        </li>
        <li>Copyright 2018 © SLIIT. All Rights Reserved.</li>
      </ul>
    </div>
  );
};
export default Bottom;
