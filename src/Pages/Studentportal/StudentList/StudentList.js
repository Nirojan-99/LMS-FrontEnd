import classes from "./StudentList.module.css";
import Details from "./Details";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";

const StudenList = () => {
  const [studentList, setStudents] = useState([]);
  const [updatedList, setStusetUpdatedents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [count, setCount] = useState(0);
  const token = useSelector((state) => state.loging.token);

  //useEffect call
  useEffect(() => {
    axios.get("http://localhost:5000/userManagement/get_users" ,{
      headers: { Authorization: "lmsvalidation " + token },
    }).then((res) => {
      if (!res.data.error) {
        console.log(res.data)
        setStudents(res.data);
        setStusetUpdatedents(res.data)
        setLoaded(true)
        setCount(res.data.length)
      } else {
        setEmpty(true);
        setLoaded(true)
      }
    }).catch(()=>{
        setEmpty(true);
        setLoaded(true)
    });
  }, []);

  const onSearch = (value) => {
    if (!value.trim()) {
        setEmpty(false);
        setStusetUpdatedents(studentList);
        setCount(studentList.length)
        return;
      }
  
      const updated = studentList.filter((student) =>
        student.ID.toUpperCase().includes(value.toUpperCase())
      );
      setStusetUpdatedents(updated);
      setCount(updated.length)
      if (updated.length === 0) {
        setEmpty(true);
      }
  };
  return (
    <div className={classes.container}>
      <SearchBar onSearch={onSearch} />
      <hr className={classes.line1} />
      {!loaded && <div className={classes.loader}><Loader /></div>}
      {!empty && loaded && <div className={classes.counting}>( {count} results found )</div>}
      {empty && <div className={classes.nothing}>No data available!</div>}
      {loaded && updatedList.map((row)=>{
          return(<Details row={row}/>)
      }) }
    </div>
  );
};

export default StudenList;
