import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function CustomerRateOwner() {
  const [customerRateOwnerList, setCustomerRateOwnerList] = useState([]);
  const [oemail, setOemail] = useState("");
  const [cemail, setCemail] = useState("");
  const [rate, setRate] = useState(0);
  const [cdate, setCdate] = useState("");

  const getCustomerRateOwnerList = () => {
    Axios.get("http://localhost:4000/selectCustomerRateOwner").then((res) => {
      setCustomerRateOwnerList(res.data);
      //console.log(res);
    });
  };

  const customerRateOwner = () => {
    Axios.post("http://localhost:4000/customer-rate-owner", {
      cemail: cemail,
      oemail: oemail,
      rate: rate,
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
    <center>
      <h1>Customer Rate Owner</h1>
        <button onClick={getCustomerRateOwnerList}>CustomerRateOwner</button>
            <table>
              <tr>
                <th>Customer Email</th>
                <th>Owner Email</th>
                <th>Reservation Date</th>
                <th>Property Name</th>
                <th>Address</th>
              </tr>

              {customerRateOwnerList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.Customer}</td>
                    <td>{val.Owner_Email}</td>
                    <td>{val.Start_Date}</td>
                    <td>{val.Property_Name}</td>
                    <td>{val.address}</td>
                  </tr>
                );
              })}
            </table>
            <hr/>

            <form>
            Customer Email:
              <input
                type="text"
                name="cemail"
                onChange={(event) => {
                  setCemail(event.target.value);
                }}
              />
              <br />

              Owner Email:
              <input
                type="text"
                name="oemail"
                onChange={(event) => {
                  setOemail(event.target.value);
                }}
              />
              <br />

              Rate Score:
              <input
                type="text"
                name="score"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
              <br />

              Current Date:
              <input
                type="text"
                name="cdate"
                onChange={(event) => {
                  setCdate(event.target.value);
                }}
              />
              <br />

            </form>

            <button>
                <Link to="/customer-home">Back</Link>
            </button>
            {" "}
            <button onClick={customerRateOwner}>Submit</button>
    </center>
    </div>
  );
}

export default CustomerRateOwner;
