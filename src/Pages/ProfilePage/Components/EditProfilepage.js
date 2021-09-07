import classes from "./EditProfilepage.module.css";
import { MdAccountCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import profile1 from "../../../Assets/profile1.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/auth";
import Deletepopup from "../../../Components/DeletePopup/DeletePopup";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";

const EditProfile = () => {
  const [name, setname] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState();
  const [oldpassword, setOldPassword] = useState();
  const [bio, setBio] = useState();
  const [dp, setDp] = useState();
  const [error, setError] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [newpassword, setNewPassword] = useState();
  const [fileName, setFile] = useState("");
  const [btn, setBtn] = useState("SAVE CHANGES");
  const [Filebtn, setFileBtn] = useState("SAVE IMAGE");

  const userID = useSelector((state) => state.loging.userID);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/get_user?ID=" + userID)
      .then((res) => {
        if (!res.data.auth) {
          setname(res.data.name);
          setAddress(res.data.address);
          setContact(res.data.contact);
          setBio(res.data.bio);
          setDp(res.data.dp);
          setOldPassword(res.data.password);
        } else {
          dispatch(logout());
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const deleteHandler = () => {
    setOnDelete(true);
  };
  const hide = () => {
    setOnDelete(false);
  };
  const onDeleteBtn = () => {
    // setError(null)
    axios
      .delete("http://localhost:5000/user/delete_user?ID", userID)
      .then((res) => {
        if (res.data.ack === true) {
          dispatch(logout());
          window.location.reload();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const clickedHandler = () => {
    setError(null);
  };
  const usernamehandler = (event) => {
    setname(event.target.value);
  };
  const addressHandler = (event) => {
    setAddress(event.target.value);
  };
  const phonenumberhandler = (event) => {
    setContact(event.target.value);
  };
  const passwordhandler = (event) => {
    setPassword(event.target.value);
  };
  const bioHandler = (event) => {
    setBio(event.target.value);
  };
  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };
  const newpasswordhandler = (event) => {
    setNewPassword(event.target.value);
  };
  const editHandler = (event) => {
    event.preventDefault();

    if (!name.trim() || name.length < 5) {
      setError("invalid Name");
      return;
    } else if (!contact.trim() || contact.length !== 10) {
      setError("Invalid Contact Number");
      return;
    } else if (password || newpassword) {
      password && password.trim();
      newpassword && newpassword.trim();
      if (password !== newpassword) {
        setError("passwords does not match");
        return;
        return;
      } else if (password.length < 6) {
        setError("password length is not enough");
        return;
      }
    }
    setBtn("SAVING..");
    const data = {
      _id: userID,
      name: name.trim(),
      address: address ? address.trim() : null,
      contact: contact,
      password: password ? password : oldpassword,
      bio: bio ? bio.trim() : null,
    };

    axios
      .post("http://localhost:5000/user/edit_user", data)
      .then((res) => {
        if (!res.data.ack) {
          setBtn("SAVE CHANGES");
          window.location.reload();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const dpHandler = (event) => {
    event.preventDefault();

    const dp = new FormData();
    dp.append("dp", fileName);
    dp.append("_id", userID);

    setFileBtn("SAVING...");
    axios
      .post("http://localhost:5000/user/add_dp", dp)
      .then((res) => {
        setFileBtn("SAVE IMAGE");
        window.location.reload();
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className={classes.container}>
      {error && <ErrorPopup error={error} clickedHandler={clickedHandler} />}
      {onDelete && <Deletepopup hide={hide} onDelete={onDeleteBtn} />}
      <form className={classes.form_container} onSubmit={editHandler}>
        <label htmlFor="username" className={classes.labels}>
          User Name
        </label>
        <br />
        <input
          required
          value={name}
          onChange={usernamehandler}
          className={classes.inputs}
          id="username"
          name="username"
          type="text"
        ></input>

        <label htmlFor="address" className={classes.labels}>
          Address
        </label>
        <br />
        <input
          value={address}
          onChange={addressHandler}
          className={classes.inputs}
          id="address"
          name="address"
          type="text"
        ></input>

        <label htmlFor="phonenumber" className={classes.labels}>
          Contact Number
        </label>
        <br />
        <input
          required
          value={`${contact}`}
          onChange={phonenumberhandler}
          className={classes.inputs}
          name="phonenumber"
          id="phonenumber"
          type="tel"
          pattern="+94[7-9]{2}-[0-9]{3}-[0-9]{4}"
        ></input>

        <label htmlFor="aboutme" className={classes.labels}>
          About Me
        </label>
        <br />
        <textarea
          row="10"
          className={classes.textA}
          id="aboutme"
          name="aboutme"
          type="textarea"
          value={bio}
          onChange={bioHandler}
        ></textarea>
        <label htmlFor="password" className={classes.labels}>
          Password
        </label>
        <br />
        <input
          value={password}
          onChange={passwordhandler}
          className={classes.inputs}
          name="password"
          id="password"
          type="password"
        ></input>
        <br />
        <label htmlFor="Npassword" className={classes.labels}>
          New Password
        </label>
        <br />
        <input
          value={newpassword}
          onChange={newpasswordhandler}
          className={classes.inputs}
          name="password"
          id="Npassword"
          type="password"
        ></input>
        <br />

        <button type="submit" className={classes.submit}>
          {btn}
        </button>
      </form>

      <form enctype="multipart/form-data" onSubmit={dpHandler}>
        <hr className={classes.line}></hr>
        <div>
          <img className={classes.dp} src={dp ? dp : profile1} />
          <br></br>
          <div className={classes.change}>
            <label htmlFor="img">Change Photo</label>
          </div>
        </div>

        <label htmlFor="img">
          <div className={classes.drop}>
            <div className={classes.dash}>Drag And Drop</div>
            <input
              onChange={fileHandler}
              required
              className={classes.dashinput}
              id="img"
              type="file"
            />
          </div>
        </label>

        <br />
        <button type="submit" className={classes.submit}>
          {Filebtn}
        </button>
      </form>
      <hr className={classes.line}></hr>
      <button onClick={deleteHandler} type="submit" className={classes.delete}>
        Delete Account
      </button>
    </div>
  );
};
export default EditProfile;
