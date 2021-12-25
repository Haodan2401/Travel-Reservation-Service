import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function CustomerCancelProperty() {
  const [propertyReserveList, setPropertyReserveList] = useState([]);
  const [oemail, setOemail] = useState("");
  const [cdate, setCdate] = useState("");
  const [cemail, setCemail] = useState("");
  const [propertyName, setPropertyName] = useState("");

  const getPropertyReserveList = () => {
    Axios.get("http://localhost:4000/cancel-property-reservation").then((res) => {
      setPropertyReserveList(res.data);
      //console.log(res);
    });
  };

  const cancelPropertyReservation = () => {
    Axios.post("http://localhost:4000/cancelPropertyReservation", {
      propertyName: propertyName,
      oemail: oemail,
      cemail: cemail,
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
        <center>
          <h1>Cancel Property Reservation</h1>
            <button onClick={getPropertyReserveList}>Property</button>
            <table>
              <tr>
                <th>Customer Email</th>
                <th>Owner Email</th>
                <th>Reservation Date</th>
                <th>Property Name</th>
                <th>Address</th>

              </tr>

              {propertyReserveList.map((val, key) => {
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

              Property Name:
              <input
                type="text"
                name="propertyName"
                onChange={(event) => {
                  setPropertyName(event.target.value);
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
            <button onClick={cancelPropertyReservation}>Cancel Property</button>




        </center>
    </div>
  );
}

export default CustomerCancelProperty;
