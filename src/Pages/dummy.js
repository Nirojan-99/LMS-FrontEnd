import axios from "axios";
import { useHistory } from "react-router-dom";
import { useRef } from "react";


const Dummy = () => {
    const click = useRef()
    let history = useHistory();
  const generate = () => {
    axios.get("http://localhost:5000/report/get_report").then((res) => {
      console.log(res.data);
        click.click()
    });
  };
  return (
    <a ref={click} href={"http://localhost:5000/Reports/Attandance/insightsomeID.pdf"}>
      <button onClick={generate}>get data</button>
    </a>
  );
};
export default Dummy;
