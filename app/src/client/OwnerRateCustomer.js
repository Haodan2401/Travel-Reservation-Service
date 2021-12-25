import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";


function OwnerRateCustomer() {
  const [ownerRateCustomerList, setOwnerRateCustomerList] = useState([]);
  const [oemail, setOemail] = useState("");
  const [cemail, setCemail] = useState("");
  const [rate, setRate] = useState(0);
  const [cdate, setCdate] = useState("");


  const getOwnerRateCustomerList = () => {
    Axios.get("http://localhost:4000/selectOwnerRateCustomer").then((res) => {
      setOwnerRateCustomerList(res.data);
      //console.log(res);
    });

  };

  const ownerRateCustomer = () => {
    Axios.post("http://localhost:4000/owner-rate-customer", {
      oemail: oemail,
      cemail: cemail,
      rate: rate,
      cdate: cdate,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
    <center>
      <h1>Owner Rate Customer</h1>
        <button onClick={getOwnerRateCustomerList}>OwnerRateCustomer</button>
            <table>
              <tr>
                <th>Owner Email</th>
                <th>Customer Email</th>
                <th>Reservation Date</th>
                <th>Property Name</th>
                <th>Address</th>
              </tr>

              {ownerRateCustomerList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.Owner_Email}</td>
                    <td>{val.Customer}</td>
                    <td>{val.Start_Date}</td>
                    <td>{val.Property_Name}</td>
                    <td>{val.address}</td>
                  </tr>
                );
              })}
            </table>
            <hr/>


            <form>
              Owner Email:
              <input
                type="text"
                name="oemail"
                onChange={(event) => {
                  setOemail(event.target.value);
                }}
              />
              <br />

              Customer Email:
              <input
                type="text"
                name="cemail"
                onChange={(event) => {
                  setCemail(event.target.value);
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
                <Link to="/admin-home">Back</Link>
            </button>
            {" "}
            <button onClick={ownerRateCustomer}>Submit</button>
    </center>
    </div>
  );
}

export default OwnerRateCustomer;
