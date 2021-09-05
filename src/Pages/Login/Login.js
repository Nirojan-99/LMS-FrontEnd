import classes from "./Login.module.css";
import std from "../../Assets/std.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../../Store/auth";
import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState();
  const [passward, setPassword] = useState();
  const [unAuth, setUnAuth] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setUnAuth(true);
      return;
    } else if (passward.length < 6) {
      setUnAuth(true);
      return;
    }
    axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: passward,
      })
      .then((res) => {
        if (res.data.auth === true) {
          dispatch(login({ email: email, type: res.data.details.type }));
        } else {
          setUnAuth(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });

    // axios
    //   .post("http://localhost:5000/user/add_user", {
    //     email: "lava@gmail.com",
    //     passward: "lava1234",
    //     type:"student"
    //   })
    //   .then((res) => {
    //     if (res.data.auth == "true") {
    //       // dispatch(login());
    //       // history.replace("/index/reset_password/" + res.data.email);
    //     } else {
    //       // setUnAuth(true);
    //     }
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });
  };
  const emailhandler = (event) => {
    setUnAuth(false);
    setEmail(event.target.value);
  };
  const passwordGHandler = (event) => {
    setUnAuth(false);
    setPassword(event.target.value);
  };
  return (
    <div className={classes.login_container}>
      <div className={classes.login}>
        <h2 className={classes.title}>Log In</h2>
        <form onSubmit={submitHandler} className={classes.form_container}>
          <label className={classes.labels} htmlFor={"username"}>
            UserName
          </label>
          <br />
          <input
            value={email}
            onChange={emailhandler}
            type="text"
            required
            id="username"
            className={classes.inputs}
          />
          <br />
          <label className={classes.labels} htmlFor={"password"}>
            Password
          </label>
          <br />
          <input
            value={passward}
            onChange={passwordGHandler}
            type="password"
            required
            id="password"
            className={classes.inputs}
          />
          <br />
          <a href={"/index/reset_password"} className={classes.forgot}>
            Forgot Password?
          </a>
          <button className={classes.btn}>LOG IN</button>
          {unAuth && <div className={classes.errorShow}>Invalid Details !</div>}
        </form>
      </div>
      <div className={classes.img_container}>
        <img className={classes.img} src={std} />
      </div>
    </div>
  );
};

export default Login;
