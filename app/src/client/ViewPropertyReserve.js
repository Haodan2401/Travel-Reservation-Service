import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

function ViewPropertyReserve() {
  const [propertyReserveList, setPropertyReserveList] = useState([]);
  const [oemail, setOemail] = useState("");
  const [pname, setPname] = useState("");

  const getPropertyReserveList = () => {
    Axios.get("http://localhost:4000/selectPropertyReserve").then((res) => {
      setPropertyReserveList(res.data);
      console.log(res.data);
    });
  };

  const filter = () => {
    var temp = [];
    propertyReserveList.forEach((val) => {
      if (val.Owner_Email === oemail && val.Property_Name === pname) {
        temp.push(val);
      }
    });
    setPropertyReserveList(temp);
    render();
  };

  const increase = () => {
    var temp2 = [];
    propertyReserveList.forEach((val) => {
      temp2.push(val);
    });
    temp2.sort(function (x, y) {
      if (x.Cost < y.Cost) {
        return -1;
      }
      if (x.Cost > y.Cost) {
        return 1;
      }
      return 0;
    });
    console.log(temp2);
    setPropertyReserveList(temp2);
    render();
  };

  const decrease = () => {
    var temp2 = [];
    propertyReserveList.forEach((val) => {
      temp2.push(val);
    });
    temp2.sort(function (x, y) {
      if (x.Cost < y.Cost) {
        return 1;
      }
      if (x.Cost > y.Cost) {
        return -1;
      }
      return 0;
    });
    console.log(temp2);
    setPropertyReserveList(temp2);
    render();
  };

  return (
    <div>
      <center>
        <h1>View Property Reservation</h1>
        <button onClick={getPropertyReserveList}>Property</button>
        <br />
        set owner email
        <input
          type="text"
          name="oemail"
          onChange={(event) => {
            setOemail(event.target.value);
          }}
        />
        set property name
        <input
          type="text"
          name="pname"
          onChange={(event) => {
            setPname(event.target.value);
          }}
        />
        <button onClick={filter}>filter</button>
        <br />
        <button onClick={increase}>ascending sort</button>
        <button onClick={decrease}>descending sort</button>
        <table>
          <tr>
            <th>Property Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Customer</th>
            <th>Owner Email</th>
            <th>Cost</th>
            <th>Review</th>
            <th>Rating</th>
          </tr>

          {propertyReserveList.map((val, key) => {
            return (
              <tr>
                <td>{val.Property_Name}</td>
                <td>{val.Start_Date}</td>
                <td>{val.End_Date}</td>
                <td>{val.Customer}</td>
                <td>{val.Owner_Email}</td>
                <td>{val.Cost}</td>
                <td>{val.Content}</td>
                <td>{val.Score}</td>
              </tr>
            );
          })}
        </table>
        <hr />
        <button>
          <Link to="/customer-home">Back</Link>
        </button>{" "}
      </center>
    </div>
  );
}

export default ViewPropertyReserve;
