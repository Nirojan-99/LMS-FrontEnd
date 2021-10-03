import classes from "./Header.module.css";
import Nav from "../nav/Nav";
import BurgerNavi from "../nav/BurgerNavi";
import logo from "../../Assets/logo.png";


const Header = () => {
  return (
    <main className={classes.header__background}>
      <BurgerNavi />
      <Nav />

      <dic className={classes.header_divition}></dic>
      <div className={classes.header_title}>
        <img alt="logo" src={logo} className={classes.logo}></img>
      </div>
    </main>
  );
};

export default Header;
