import classes from "./Header.module.css";
import Nav from "../nav/Nav";
import BurgerNavi from "../nav/BurgerNavi";
import logo from "../../Assets/logo.png";

import { useState } from "react";

import axios from 'axios'

const Header = () => {
  const [niro , setNiro] = useState("Click")
  const clickH = () => {
    axios.get("http://localhost:5000/logina").then((res)=>{
         console.log(res.data)
         setNiro(res.data.niro)
    })
 
  };
  return (
    <main className={classes.header__background}>
      <BurgerNavi />
      <Nav />

      <dic className={classes.header_divition}></dic>
      <div className={classes.header_title}>
        <img alt="logo" src={logo} className={classes.logo}></img>
      </div>
      {/* <button onClick={clickH}>{niro}</button> */}
    </main>
  );
};

export default Header;
