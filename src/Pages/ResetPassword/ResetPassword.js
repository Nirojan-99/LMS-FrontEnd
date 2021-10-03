import classes from "./ResetPassword.module.css";
import { useState } from "react";
import otp from "../../Assets/otp.png";
import axios from "axios";
import { useHistory } from "react-router";

const ResetPassword = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [userID, setID] = useState();
  const [Inputedotp, setOTP] = useState();
  const [unAuth, setUnAuth] = useState(false);
  const [ismailExist, setMailExist] = useState(false);
  const [errorMsg, setError] = useState("invalid Email !");

  const emailhandler = (event) => {
    setUnAuth(false);
    setEmail(event.target.value);
  };
  const otpHandler = (event) => {
    setOTP(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setUnAuth(true);
      return;
    }

    axios
      .get("http://localhost:5000/user/check_mail?email=" + email)
      .then((res) => {
        console.log(res.data);
        if (res.data.available === false) {
          setUnAuth(true);
        } else {
          setMailExist(true);
          setID(res.data.userID);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const onOTPSubmitted = (event) => {
    event.preventDefault();

    if (!Inputedotp.length === 5) {
      setUnAuth(true);
      setError("OTP should be 5 degit");
      return;
    }

    axios
      .post("http://localhost:5000/user/check_otp", {
        email: email,
        otp: Inputedotp,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.valid === false) {
          setUnAuth(true);
          setError("OTP didn't match");
        } else {
          history.replace("/index/new_password/" + userID);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login}>
        <h2 className={classes.title}>Reset Password</h2>
        {!ismailExist && (
          <form onSubmit={submitHandler} className={classes.form_container}>
            <label className={classes.labels} htmlFor={"username"}>
              Email
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
            <button className={classes.sendOTP}>Send OTP</button>
          </form>
        )}
        {ismailExist && (
          <form className={classes.form_container2} onSubmit={onOTPSubmitted}>
            <label className={classes.labels} htmlFor={"otp"}>
              OTP
            </label>
            <br />
            <input
              id="otp"
              required
              type="password"
              onChange={otpHandler}
              value={Inputedotp}
              className={classes.otp}
            />
            <br />
            <button className={classes.btn}>SUBMIT</button>
          </form>
        )}
        {unAuth && <div className={classes.errorShow}>{errorMsg}</div>}
      </div>
      <div className={classes.img_container}>
        <img className={classes.img} src={otp} />
      </div>
    </div>
  );
};

export default ResetPassword;
