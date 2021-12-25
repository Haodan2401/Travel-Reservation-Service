import currentDate from "./data";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProcessDate() {
  const [cdate, setCdate] = useState("");
  const updateDate = () => {
    currentDate.date = cdate;
    console.log(cdate);
    Axios.post("http://localhost:4000/process-date", {
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };
  return (
    <div>
      <h1>Admin Process Date</h1>
      <form>
        Set current system date:
        <input
          type="text"
          name="cdate"
          onChange={(event) => {
            setCdate(event.target.value);
          }}
        />
      </form>
      <button>
        <Link to="/admin-home">Cancel</Link>
      </button>
      <button onClick={updateDate}>Confirm</button>
    </div>
  );
}

export default ProcessDate;
