import classes from "./UserReport.module.css";
import UserTable from "./UserTable";
import UserDeatils from "./UserDetails";
import UserReportSearchBar from "./UserReportSearchBar";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Loader from "../../../Components/Loader/Loader";
import { logout } from "../../../Store/auth";


import { useSelector,useDispatch} from "react-redux";
import ErrorPopup from "../../../Components/ErrorPopup/ErrorPopup";



const UserReport = () => {
  const history=useHistory();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [updatedList, setList] = useState(users);
  const [isEmptyList, setEmpty] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const userType = useSelector((state) => state.loging.type);


  const token = useSelector((state) => state.loging.token);
  const [isUploaded, setIsUploaded] = useState(true);
const [error, setError] = useState(null);

const clickedHandler = (event) => {
  setIsUploaded(true);
};


  useEffect(() => {
    axios
      .get("http://localhost:5000/userManagement/get_users",{
        headers: { Authorization: "lmsvalidation " + token },
      })
      .then((res) => {
        if (res.data.auth === false) {
          setError("You Are not Authorized !");
          setIsUploaded(false);
              setTimeout(() => {
            dispatch(logout());
          }, 500);
        }
        else if(res.data.noData===true){
          setError("No data Availabe");
        }
        else if(res.data.dbError===true){
          setIsUploaded(false);
          setError("Cann't connect with database");
        }
        else{
          setUsers(res.data);
        setList(res.data);
        setLoaded(true);
        setIsUploaded(true);
        }
        
      })
      .catch((er) => {
        setError("Cann't connect with database");
        setIsUploaded(false);
      });
  }, []);

  const getSearchValue = (value) => {
    if (!value.trim()) {
      setEmpty(false);
      setList(users);
      return;
    }

    
    const updated = users.filter(
      (user) =>
        user.ID.toUpperCase().includes(value.toUpperCase()) ||
        user.name.toUpperCase().includes(value.toUpperCase()) ||
        user.type.toUpperCase().includes(value.toUpperCase()) ||
        user.faculty.toUpperCase().includes(value.toUpperCase())
    );

    setList(updated);
    if (updated.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const AddUserHandler=()=>{
    history.replace("/add-user");

  }

  return (
    <>
      {userType === "admin" && (
  
    <div className={classes.container}>
       {!isUploaded && (<ErrorPopup error={error} clickedHandler={clickedHandler}/>)}
      <h2 className={classes.title}>USER REPORT</h2>
      <hr className={classes.line}></hr>
      <UserTable allUsers={users}/>

      <UserReportSearchBar onSearch={getSearchValue} />     
      <div className={classes.report_container}>
        <span>User ID</span>
        <span>Name</span>
        <span>UserRole</span>
        <span>Faculty</span>
        <span>Edit/Delete</span>
      </div>

      {!loaded && (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
      {updatedList.map((row) => {
        return <UserDeatils data={row} key={row._id} />;
      })}
      {isEmptyList && <div className={classes.message}>No Users Found !!!</div>}
     
      <button className={classes.add} onClick={AddUserHandler}>
          ADD USER
        </button>
    </div>)}

    </>
  );
};

export default UserReport;
